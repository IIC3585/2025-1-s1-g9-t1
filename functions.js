var _ = require('lodash/fp')
const {modify_csv} = require('./helpers.js')

function swap(file, n, m) {
    const func = (data) => {
        return data.map((row) => {
            temp = row[n];
            row[n] = row[m];
            row[m] = temp;
            return row;
        });

    };
    modify_csv(file, func)
}

function rowstocolumns (file ) {
    //transforma las filas en columnas
    return;
}

function columnstorows (file) {
    // Contraria de rowstocolumns?
    return;
}

function rowdelete (file, n) {
    // elimina la fila n
    return;
}

function columndelete (file, n) {
    // elimina la columna n
    return;
}

function insertrow(file, n, row) {
    // inserta una fila después de la n con la información dada en la lista row
    return;
}

function insertcolumn(file, n, column) {
    // inserta una columna después de la columna n con la información dada en la lista column
    return;
}

function tohtmltable (file) {
    /* formato:
                Juan, Perez
                Ana, Flores 
    se convierte en
                <table>
                <tr>
                    <td>Juan </td>
                    <td>Perez </td>
                </tr>
                <tr>
                    <td>Ana </td>
                    <td>Flores </td>
                </tr>
                </table>
    */
    return;
}