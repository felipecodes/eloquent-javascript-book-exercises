function min(a, b) {
	if (isNaN(a), isNaN(b)) {
		console.log('min function acept only numbers')
		return
	}

	return a < b ? a : b
}

console.log(`min(5, 10) -> ${min(5, 10)}`)
