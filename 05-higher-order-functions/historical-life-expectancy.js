const ancestry = require('./ancestry')

/**
 * @param {Array} arr
 * @returns {Number}
 */

const average = arr => arr.reduce((a, b) => a + b) / arr.length

/**
 * Create a persons map by the century
 */

const personByCentury = Object.create(null)

ancestry.forEach(person => {
	const century = Math.ceil(person.died / 100)
	if (!personByCentury[century]) {
		personByCentury[century] = [person]
	} else {
		personByCentury[century].push(person)
	}
})

/**
 * Create a ages map by the century
 */

const ageByCentury = Object.create(null)

for (const century in personByCentury) {
	const persons = personByCentury[century]
	const ages = persons.map(person => person.died - person.born)
	ageByCentury[century] = average(ages)
}

console.log(ageByCentury)
