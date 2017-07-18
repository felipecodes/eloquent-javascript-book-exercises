/**
 * This function "flatten" an array of arrays into a single array
 * @param {Array} arr The array of arrays
 * @returns {Array} The single array
 */

function flattening(arr) {
	if (!Array.isArray(arr)) {
		return [arr]
	}

	return arr.reduce((previous, next) => flattening(previous).concat(flattening(next)), [])
}

console.log('\nflattening([[1, 2], [3, 4], [[5, 6], [7, [8]]], 9])\n-> ', flattening([[1, 2], [3, 4], [[5, 6], [7, [8]]], 9]))
// -> [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log('\nflattening([[1, 2, [3, 4]]])\n-> ', flattening([[1, 2, [3, 4]]]))
// -> [1, 2, 3, 4]

console.log('\nflattening([[1, [2, 3], 4]])\n-> ', flattening([1, [2, 3], 4]))
// -> [1, 2, 3, 4]
