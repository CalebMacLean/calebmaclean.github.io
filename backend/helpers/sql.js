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


// Exports
module.exports = { sqlForPartialUpdate };