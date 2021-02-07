const emptyProxyObject = new Proxy({}, { get: () => "" })
const isEmpty = (val) => {
  // Stolen From: https://stackoverflow.com/a/28953167
  /*
    test results
    --------------
    [] true, empty array
    {} true, empty object
    null true
    undefined true
    "" true, empty string
    '' true, empty string
    0 false, number
    true false, boolean
    false false, boolean
    Date false
    function false
    */
  if (val === undefined) return true;
  if (val === emptyProxyObject) return true;

  if (
    typeof val == "function" ||
    typeof val == "number" ||
    typeof val == "boolean" ||
    Object.prototype.toString.call(val) === "[object Date]"
  )
    return false;

  if (val == null || val.length === 0)
    // null or 0 length array
    return true;

  if (typeof val == "object") if (Object.keys(val).length === 0) return true;

  return false;
};

const getNameInitial = (text) => {
  const name = (text === "" || text === null) ? "NA" : text.split(" ")
  const [firstName, lastName] = name
  if (firstName && lastName) {
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
  } else {
    return `${firstName[0].toUpperCase()}`
  }
}

export { isEmpty, emptyProxyObject, getNameInitial };