/**
 * @param {Any} value The list value
 * @param {Object} rest The next list item
 * @returns A item list
 */

function prepend(value, rest) {
	rest = rest || null
	return {
		value,
		rest
	}
}

/**
 * Convert from array to list
 * @param {Array} arr The values array
 * @return {Object} list A list object
 */

function arrayToList(arr, list) {
	if (!Array.isArray(arr)) {
		console.error('arr parameter is not a Array')
	} else if (arr.length === 0) {
		return list || {}
	}

	return list ? arrayToList(arr, prepend(arr.pop(), list)) :
	arrayToList(arr, prepend(arr.pop()))
}

/**
 * @param {Object} list The list object
 * @return {Array} arr The values array
 */

function listToArray(list, arr = []) {
	if (list === null) {
		return arr
	}

	arr.push(list.value)
	return listToArray(list.rest, arr)
}

/**
 * Find a value in the list
 * @param {Object} list The list object
 * @param value The list value to find
 * @returns {Object} The list item with the value
 */

function nth(list, value) {
	if (list === null) {
		return {}
	}

	if (list.value === value) {
		return list
	}

	return nth(list.rest, value)
}

console.log('\narrayToList([10, 20, 30, 40, 50])\n-> ', JSON.stringify(arrayToList([10, 20, 30, 40, 50])))

console.log('\narrayToList([])\n-> ', JSON.stringify(arrayToList([])))

const list = arrayToList([10, 20, 30, 40, 50])
console.log('\nlistToArray(arrayToList([10, 20, 30, 40, 50]))\n-> ', listToArray(list))

console.log('\nnth(list, 50)\n-> ', JSON.stringify(nth(list, 50)))
