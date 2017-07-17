/**
 * @param {Int} start The range start
 * @param {Int} end The range end
 * @param {Int} step The range step
 */

function range(start, end, step = 1) {
	const arr = []
	if (step > 0) {
		// to positive steps
		for (let i = start; i <= end; i += step) {
			arr.push(i)
		}
	} else {
		//  to negative steps
		for (let i = start; i >= end; i += step) {
			arr.push(i)
		}
	}
	return arr
}

/**
 * @param {Array} arr The numbers array to sum
 * @returns {Int} The sum result
 */

function sum(arr) {
	return arr.reduce((previous, next) => previous + next)
}

console.log(`range(1, 10)\n-> ${range(1, 10)}\n`)

console.log(`range(1, 10, 2)\n-> ${range(1, 10, 2)}\n`)

console.log(`range(5, 2, -1)\n-> ${range(5, 2, -1)}\n`)

console.log(`sum(range(1, 10))\n-> ${sum(range(1,10))}`)
