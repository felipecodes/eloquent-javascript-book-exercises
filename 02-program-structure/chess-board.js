const SIZE = 20
let chessboard = ''

for (let i = 0; i < SIZE; i++) {
	for (let j = 0; j < SIZE; j++) {
		if (i % 2 === 0) {
			chessboard += j % 2 === 0 ? ' ' : '#'
		} else {
			chessboard += j % 2 === 0 ? '#' : ' '
		}
	}
	chessboard += '\n'
}

console.log(chessboard)
