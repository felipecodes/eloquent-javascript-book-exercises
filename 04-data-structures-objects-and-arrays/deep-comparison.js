/**
 * Compare the equality of two values, including objects
 * @param {Any} a The value to compare
 * @param {Any} b the value to compare
 * @returns {Boolean} The result from comparison
 */

function deepEqual(a, b) {
	if (a !== null && typeof a === 'object' &&
		b !== null && typeof b === 'object') {
		if (a === b) {
			return true
		}

		const keysA = Object.keys(a)
		const keysB = Object.keys(b)

		if (keysA.length !== keysB.length) {
			return false
		}

		for (let i = 0; i < keysA.length; i++) {
			const key = keysA[i]

			if (!key in b) {
				return false
			}

			if (!deepEqual(a[key], b[key])) {
				return false
			}
		}

		return true
	}

	return a === b
}

/**
 * Returns a object with no prototype. Perfect to map
 * @param {Object} obj The base to map
 * @return {Object} The object param mapped
 */

function map(obj) {
	const map = Object.create(null)
	const keys = Object.keys(obj)

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		map[key] = obj[key]
	}

	return map
}

// equals
const a = map({
	a: 'b',
	c: 'd'
})

const b = map({
	a: 'b',
	c: 'd'
})

const c = map({
	h: 'h'
})

const d = map({
	h: 'h'
})

const e = map({
	k: '64',
	j: '124',
	t: '256',
	o: '512',
	p: '1024'
})

const f = e

// differents

const g = map({
	a: 'z',
	c: 'y'
})

const h = map({
	h: 'i',
	j: 'k'
})

console.log(`\ndeepEqual(a, b)\n-> ${deepEqual(a, b)}`)
// -> true

console.log(`\ndeepEqual(c, d)\n-> ${deepEqual(c, d)}`)
// -> true

console.log(`\ndeepEqual(e, f)\n-> ${deepEqual(e, f)}`)
// -> true

console.log(`\ndeepEqual(g, h)\n-> ${deepEqual(g, h)}`)
// -> false

console.log(`\ndeepEqual(a, g)\n-> ${deepEqual(a, g)}`)
// -> false

console.log(`\ndeepEqual(false, false)\n-> ${deepEqual(false, false)}`)
// -> true

console.log(`\ndeepEqual(false, true)\n-> ${deepEqual(false, true)}`)
// -> false

console.log(`\ndeepEqual('felipe', 'felipe')\n-> ${deepEqual('felipe', 'felipe')}`)
// -> true
