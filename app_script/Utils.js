const FIRST_CONTENT_INDEX = 1;

/**
 * @template T
 * @param {T[]} array
 * @returns {T?}
 */
function _first(array) {
  return (array && array.length) ? array[0] : undefined;
}

/**
 * @template T
 * @param {T[]} array
 * @param {string} key
 * @returns {Map<Object, T>}
 */
function _keyBy(array, keyField) {
  return new Map(array.map((object) => [object[keyField], object]));
}

/**
 * @template T
 * @param {T[]} array
 * @param {string} key
 * @returns {Map<Object, T[]>}
 */
function _groupBy(array, keyField) {

  function reduceFct(previousValue, currentValue) {
    const key = currentValue[keyField];

    const previousValues = previousValue.get(key) || [];
    const newValues = [...previousValues, currentValue];

    previousValue.set(key, newValues);
    return previousValue;
  }

  return array.reduce(reduceFct, new Map());
}

/**
 * @template T
 * @param {T[]} array
 * @param {string} key
 * @returns {Object[]}
 */
function _uniqueValues(array, key) {

  function reduceFct(previousValue, currentValue) {
    const value = currentValue[key]

    if (Array.isArray(value)) {
      value.forEach(previousValue.add, previousValue)
    }
    else {
      previousValue.add(value);
    }

    return previousValue;
  }

  const result = array.reduce(reduceFct, new Set());
  return Array.from(result);
}

/**
 * @param {SpreadsheetApp.Sheet} sheet
 * @param {(value: Object[], index: number, array: readonly Object[][]) => value is Object[]} predicate
 * @returns {Object[][]}
 */
function _filterSheetContent(sheet, predicate) {

  function filterFct(value, index, array) {
    return index >= FIRST_CONTENT_INDEX &&
      (!predicate || predicate(value, index, array));
  }

  const values = sheet.getDataRange().getValues();
  return values.filter(filterFct);
}

/**
 * @param {string} str
 * @returns {number}
 */
function _toNumber(str) {
  return +str;
}

/**
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
function _filterNotNil(array) {
  return array && array.filter((v) => v != null) 
}