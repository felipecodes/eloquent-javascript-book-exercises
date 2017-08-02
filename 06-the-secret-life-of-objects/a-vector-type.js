/**
 * The Vector constructor that represents a vector in two-dimensional space
 * @param {Number} x The x vector number
 * @param {Number} y The y vector number
 */

function Vector(x, y) {
	this.x = x
	this.y = y
}

/**
 * @param {Vector} vector The vector to make the sum operation
 * @returns {Vector} The new vector generated from the vector passed as parameter
 */

Vector.prototype.plus = function (vector) {
	const x = this.x + vector.x
	const y = this.y + vector.y
	return new Vector(x, y)
}

/**
 * @param {Vector} vector The vector to make the minus operation
 * @returns {Vector} The new vector generated from the vector passed as parameter
 */

Vector.prototype.minus = function (vector) {
	const x = this.x - vector.x
	const y = this.y - vector.y
	return new Vector(x, y)
}

/**
 * The length property represents the distance of the point (x, y) from the origin (0, 0)
 */

Object.defineProperty(Vector.prototype, 'length', {
	get: function () {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	}
})


// console.log('\n', new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector { x: 3, y: 5 }

// console.log('\n', new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector { x: -1, y: -1 }

// console.log('\n', new Vector(3, 4).length);
// → 5

// used in 07 chapter
module.exports = Vector
