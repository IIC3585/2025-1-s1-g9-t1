var _ = require('lodash/fp')
const {modify_csv} = require('./helpers.js')
const { read_csv } = require('./helpers.js');


function swap(file, n, m) {
    const func = (data) => {
        return data.map((row) => {
            [row[n], row[m]] = [row[m], row[n]];
            return row;
        });
    };
    modify_csv(file, func)
}

function rowstocolumns (file) {
    const func = (data) => {
        const transpose = data[0].map((value, col_index) => data.map(row => row[col_index])
        );
        return transpose;
    };
    modify_csv(file, func);
}

function columnstorows (file) {
    const func = (data) => {
        return data.reduce((acc, row) => {
            row.forEach((value, colIndex) => {
                if (!acc[colIndex]) acc[colIndex] = [];
                acc[colIndex].push(value);
            });
            return acc;
        }, []);
    };

    modify_csv(file, func);
}

function rowdelete (file, n) {
    // elimina la fila n
    const func = (data) => {
        return data.filter((_, index) => index != n);
    }
    modify_csv(file, func)
    
}

function columndelete (file, n) {
    // elimina la columna n
    const func = (data) => {
        return data.map((row) => row.filter((_, index) => index != n));
    }
    modify_csv(file, func)
}

function insertrow(file, n, row) {
    const func = (data) => {
        // Verificar que `data` no esté vacío
        if (data.length === 0) {
            throw new Error("El archivo CSV está vacío.");
        }

        // Obtener el número de columnas del archivo CSV
        const numColumns = data[0].length;

        // Validar que la nueva fila tenga el mismo número de columnas
        if (row.length !== numColumns) {
            throw new Error(`Error: La fila insertada tiene ${row.length} columnas, pero se esperaban ${numColumns}.`);
        }

        // Insertar la nueva fila en la posición correcta
        return [...data.slice(0, n + 1), row, ...data.slice(n + 1)];
    };
    
    modify_csv(file, func);
}


function insertcolumn(file, n, column) {
    const func = (data) => {
        // Verificar que `data` no esté vacío
        if (data.length === 0) {
            throw new Error("El archivo CSV está vacío.");
        }

        // Obtener el número de filas del archivo CSV
        const numRows = data.length;

        // Validar que la nueva columna tenga el mismo número de filas
        if (column.length !== numRows) {
            throw new Error(`Error: La columna insertada tiene ${column.length} filas, pero se esperaban ${numRows}.`);
        }

        // Insertar la nueva columna en la posición `n`
        return data.map((row, i) => [
            ...row.slice(0, n),
            column[i],
            ...row.slice(n)
        ]);
    };
    
    modify_csv(file, func);
}


function tohtmltable(file) {
    const data = read_csv(file);  // Leer el CSV

    // Crear la tabla HTML
    let html = '<table>\n';

    // Iterar sobre cada fila del CSV
    data.forEach((row) => {
        html += '    <tr>\n'; // Comienza la fila

        // Iterar sobre cada celda de la fila y agregarla al HTML
        row.forEach((cell) => {
            html += `        <td>${cell} </td>\n`;  // Cada celda se coloca dentro de <td>
        });

        html += '    </tr>\n';  // Cerrar la fila
    });

    html += '</table>\n';  // Cerrar la tabla

    return html;
}



// swap('example.csv', 0, 1);
// rowstocolumns('example.csv');
// columnstorows('example.csv');
// rowdelete('example.csv', 0);
// columndelete('example.csv', 0);
// insertrow('example.csv', 1, ['a', 'b', 'c', 'd', 'e']);
// insertcolumn('example.csv', 1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// const htmlTable = tohtmltable('example.csv');
// console.log(htmlTable);