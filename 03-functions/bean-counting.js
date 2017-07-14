function countBs(s) {
	let count = 0
	for (let i = 0; i < s.length; i++) {
		if (s.charAt(i) === 'B')
			count++
	}
	return count
}

console.log(`countBs('BBBbs')\n-> ${countBs('BBBbs')}`)
console.log(`countBs('bbbbs')\n-> ${countBs('bbbbs')}`)
console.log(`countBs('BCBC')\n-> ${countBs('BCBC')}`)
