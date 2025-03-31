var _ = require('lodash/fp')
const fs = require("fs");
const Papa = require("papaparse");

function read_csv(file) {
    const data = fs.readFileSync(file, "utf8");
    return Papa.parse(data, { header: false, dynamicTyping: true }).data;
}

function write_csv(data, file="output.csv") {
    const csv = Papa.unparse(data);
    fs.writeFileSync(file, csv, "utf8");
}

function modify_csv(file, func) {
    const pipeline = _.pipe(
        (file) => read_csv(file),
        func,
        write_csv
    );

    return pipeline(file);
};

module.exports = {read_csv, write_csv, modify_csv};