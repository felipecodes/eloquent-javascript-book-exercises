'use strict'

function MultiplicatorUnitFailure() {
	this.message = 'Multiplicator Failure'
	this.name = 'MultiplicatorUnitFailure'
	this.stack = (new Error).stack
}

MultiplicatorUnitFailure.prototype = Object.create(Error.prototype)

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
	while(true) {
		try {
			return primitiveMultiply(a, b)
  		} catch (err) {
			if (!(err instanceof MultiplicatorUnitFailure)) {
				throw err
			}
 		}
	}
}

console.log(`\nreliableMultiply(8, 8)\n-> ${reliableMultiply(8, 8)}`);
// → 64
