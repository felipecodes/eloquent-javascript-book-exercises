/**
 * This function retorns true only if all the elements are analyzeds as be true
 * @param {Array} arr The list to be analyzed
 * @param {Function} action The function used to analyze
 * @returns {Bollean} Returns a value with base in the action return
 */

const every = (arr, action) => {
	for (let i = 0; i < arr.length; i++) {
		if (!action(arr[i])) {
			return false
		}
	}
	return true
}

/**
 * This function retorns true if some the elements are analyzeds as be true
 * @param {Array} arr The list to be analyzed
 * @param {Function} action The function used to analyze
 * @returns {Bollean} Returns a value with base in the action return
 */

const some = (arr, action) => {
	for (let i = 0; i < arr.length; i++) {
		if (action(arr[i])) {
			return true
		}
	}
	return false
}

console.log(every([NaN, NaN, NaN], isNaN))
// → true

console.log(every([NaN, NaN, 4], isNaN))
// → false

console.log(some([NaN, 3, 4], isNaN))
// → true

console.log(some([2, 3, 4], isNaN))
// → false
