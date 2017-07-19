/**
 * Sequence constructor define a interface that abstracts
 * iteration over a collection of values
 * @param {Array} arr The collection to abstracts iteration
 */

function Sequence(arr) {
	this._arr = arr
	this._index = 0
}

/**
 * The current property returns the current collection
 * item and increment the index (is read-only)
 */

Object.defineProperty(Sequence.prototype, 'current', {
	get: function () {
		return this._arr[this._index++]
	},
	enumerable: false
})

/**
 * The next property returns true if exist the next collection item
 * and false if dont's exists (is read-only)
 */

Object.defineProperty(Sequence.prototype, 'next', {
	get: function () {
		return this._arr[this._index] !== undefined
	},
	enumerable: false
})




/**
 * The RangeSequence constructor is a Sequence subtype
 * It takes two numbers(range) to generate a array
 */

function RangeSequence(start, end) {
	this._start = start
	this._end = end
	Sequence.call(this, this._range())
}

RangeSequence.prototype = Object.create(Sequence.prototype)

/**
 * The range method generate a range form the "start" and "end" properties
 * @returns {Array} The array generated
 */

RangeSequence.prototype._range = function () {
	const arr = []
	for (let i = this._start; i <= this._end; i++) {
		arr.push(i)
	}
	return arr
}

/**
 * Examples using the Sequece and RangeSequence classes
 */

function log(sequence) {
	while (sequence.next) {
		console.log(sequence.current)
	}
}

console.log('\nlog(new Sequence([0, 1, 2, 3]))\n')
log(new Sequence([0, 1, 2, 3]))

console.log('\nlog(new RangeSequence(1, 10))\n')
log(new RangeSequence(1, 10))
