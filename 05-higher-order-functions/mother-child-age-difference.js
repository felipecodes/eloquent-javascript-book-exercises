const ancestry = require('./ancestry')

/**
 * @param {Array} arr
 * @returns {Number}
 */

const average = arr => arr.reduce((a, b) => a + b) / arr.length

/**
 * Create a persons map
 */

const map = Object.create(null)
ancestry.forEach(person => {
	map[person.name] = person
})


/**
 * Filter person by mother
 */

const persons = ancestry.filter(person =>  map[person.mother] != null)

/**
 * Get the ages differences
 */

const ages = persons.map(person => {
	const mother = map[person.mother]
	return person.born - mother.born
})

console.log(average(ages))
