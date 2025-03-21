var _ = require('lodash/fp')
const fs = require("fs");
const Papa = require("papaparse");

function read_csv(file) {
    const data = fs.readFileSync(file, "utf8");
    return Papa.parse(data, { header: false, dynamicTyping: true }).data;
}

function write_csv(file, data) {
    const csv = Papa.unparse(data);
    fs.writeFileSync("output.csv", csv, "utf8");
}

function modify_csv(file, func) {
    const pipeline = _.pipe(
        (file) => read_csv(file),
        func,
        (data) => write_csv(file, data)
    );

    return pipeline(file);
};

module.exports = {read_csv, write_csv, modify_csv};