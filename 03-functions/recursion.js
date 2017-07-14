function isEven(n) {
	if (n === 1 || n < 0) {
		return false
	}

	return n === 0 ? true : isEven(n - 2)
}

for (let i = 0; i < 100; i++)
	console.log(`isEven(${i}) -> ${isEven(i)}`)
