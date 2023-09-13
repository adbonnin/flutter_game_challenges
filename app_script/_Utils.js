/**
 * @template T
 * @param {T[]} array
 * @returns {T | null}
 */
function _first(array) {
  return (array && array.length) ? array[0] : undefined
}

/**
 * @template T
 * @param {T[]} array
 * @param {string} keyProperty
 * @returns {Map<Object, T>}
 */
function _keyBy(array, keyProperty) {
  return new Map(array.map((object) => [object[keyProperty], object]))
}

/**
 * @template T
 * @param {T[]} array
 * @param {string} keyProperty
 * @returns {Map<Object, T[]>}
 */
function _groupBy(array, keyProperty) {

  function reduceFct(previousValue, currentValue) {
    const key = currentValue[keyProperty]

    const previousValues = previousValue.get(key) || []
    const newValues = [...previousValues, currentValue]

    previousValue.set(key, newValues)
    return previousValue
  }

  return array.reduce(reduceFct, new Map())
}

/**
 * @template T
 * @param {T[]} array
 * @param {string} property
 * @returns {Object[]}
 */
function _uniqueValues(array, property) {

  function reduceFct(previousValue, currentValue) {
    const value = currentValue[property]

    if (Array.isArray(value)) {
      value.forEach(previousValue.add, previousValue)
    } else {
      previousValue.add(value);
    }

    return previousValue;
  }

  const result = array.reduce(reduceFct, new Set());
  return Array.from(result);
}

/**
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
function _filterNotNil(array) {
  return array && array.filter((v) => v != null)
}

class Repository {  
  /**
   * @param {SpreadsheetApp.Spreadsheet} ss
   * @param {string} name
   * @param {number} firstContentIndex
   */
  constructor(ss, name, firstContentIndex) {
    this.ss = ss
    this.name = name
    this.firstContentIndex = firstContentIndex || 1
  }

  /**
   * @returns {SpreadsheetApp.Sheet} sheet
   */
  getSheet() {
    return this.ss.getSheetByName(this.name)
  }

  /**
   * @param {(value: Object[], index: number, array: readonly Object[][]) => value is Object[]} predicate
   * @returns {Object[][]}
   */
  findAll(predicate) {
    function filterFct(value, index, array) {
      return index >= this.firstContentIndex &&
        (!predicate || predicate(value, index, array))
    }

    const sheet = this.getSheet()
    const values = sheet.getDataRange().getValues()
    return values.filter(filterFct, this).map(this.fromRow, this)
  }

  /**
   *
   * @param {Object[]} row
   * @returns {Object}
   * @private
   */
  fromRow(row) {
    throw "You must implement this function"
  }

  /**
   * @param {Object} value
   * @returns {Date}
   */
  toDateOrNull(value) {
    const type = typeof value

    if (value == null) {
      return null
    }

    if (value.toJSON) {
      return value
    }

    if (type == "string" || type == "number") {
      return Date(value)
    }

    return null
  }
}

class VoBuilder {
  /**
   * @param {Object} values
   * @returns {Object}
   */
  buildVo(value) {
    return value && _first(this.buildVos([value]))
  }

  /**
   * @param {Object[]} values
   * @returns {Object[]}
   */
  buildVos(values) {
    throw "You must implement this function"
  }
}
