// Imports
const { BadRequestError } = require("../expressError");

/** sqlForPartialUpdate helper function 
 * Helper for making selective update queries.
 * The calling functoin can use it to make the SET clause of an SQL UPDATE statement.
 * 
 * Parameters:
 * - dataToUpdate: obj - {field: newVal, field2: newVal, ...}
 * - jsToSql: obj - maps js-style data fields to database column names {camelCase: col_name, ...}
 * 
 * Returns: obj - {sqlSetCols, dataToUpdate}
*/
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
    // create keys array from dataToUpdate
    const keys = Object.keys(dataToUpdate);
    
    // throw bad request error if no data is provided
    if( keys.length === 0 ) throw new BadRequestError("No data");

    // {firstName: 'Aliya', age:32} => ['"first_name"=$1', '"age"=$2']
    const cols = keys.map((colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`);

    return {
        setCols: cols.join(", "),
        values: Object.values(dataToUpdate)
    }
}

/** sqlForPartialInsert helper function
 * Helper for making selective insert statements.
 * The calling function can use it to make the INSERT and VALUES clause.
 * 
 * Parameters:
 * dataToInsert: obj - {field: val, field2: val, ...}
 * jsToSql: obj - maps js-style data fields to database column names {camelCase: col_name, ...}
 * 
 * Returns: obj - { insertColumns, valuesIndecies }
 */
function sqlForPartialInsert(dataToInsert, jsToSql) {
    // create keys array from dataToInsert
    const keys = Object.keys(dataToInsert);

    // if no data throw BadRequestError
    if( keys.length === 0 ) throw new BadRequestError("No data");

    // create arrays to store the converted column names and there variable indexes;
    const cols = [];
    const valIdx = [];

    // iterate through keys and push values to respective arrays
    keys.forEach((colName, idx) => {
        // convert if necessary
        let properCol = jsToSql[colName] ? jsToSql[colName] : colName;
        // push values to arrays
        cols.push(properCol);
        valIdx.push(`$${idx + 1}`);
    });

    return {
        insertColumns: cols.join(', '),
        valuesIndecies: valIdx.join(', ')
    }
}


// Exports
module.exports = { sqlForPartialUpdate, sqlForPartialInsert };