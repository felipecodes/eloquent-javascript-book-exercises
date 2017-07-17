/**
 * Function to reverse array. Returns a new array value
 * (no mutations)
 * @param {Array} arr The array to reverse
 * @returns {Array} The reversed array
 */

function reverseArray(arr) {
	const newArray = []
	for (let i = arr.length - 1; i >= 0; i--)
		newArray.push(arr[i])
	return newArray
}

/**
 * Function to reverse array. Returns the same array value
 * (with mutations)
 * @param {Array} arr The array to reverse
 * @returns {Array} The reversed array
 */

function reverseArrayMutate(arr) {
	let aux
	for (let i = arr.length - 1; i > arr.length / 2; i--) {
		aux = arr[arr.length - (i + 1)]
		arr[arr.length - (i + 1)] = arr[i]
		arr[i] = aux
	}
	return arr
}

console.log(`\nreverseArray([1, 2, 3, 4, 5])\n-> ${reverseArray([1, 2, 3, 4, 5])}\n`)

const arr = [1, 2, 3, 4, 5]
console.log(`arr\n-> ${arr}\n`)

const mutated = reverseArrayMutate(arr)
console.log(`arr\n-> ${arr}\n`)

console.log(`arr === mutated\n-> ${arr === mutated}`)
