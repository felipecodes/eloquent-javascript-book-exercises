'use strict'

function LockedException() {
	this.message = 'box locked!'
	this.stack = (new Error()).stack
}

LockedException.prototype = Object.create(Error.prototype)
LockedException.prototype.name = 'LockedException'

const box = {
	_locked: true,
	_content: [],
	unlock() {
		this._locked = false
	},
	lock() {
		this._locked = true
	},
	get content() {
		if (this._locked) {
			throw new LockedException()
		}
		return this._content
	}
}

function withBoxUnlocked(cb) {
	let keepUnlocked = false
	try {
		if (box._locked) {
			box.unlock()
		} else {
			keepUnlocked = true
		}
		cb()
	} catch (err) {
		if (err instanceof LockedException) {
			console.log(err)
		}
		throw err
	} finally {
		if (!keepUnlocked) {
			box.lock()
		}
	}
}

withBoxUnlocked(() => box._content.push('gold piece'))

withBoxUnlocked(() => console.log(`\nbox.content -> ${box.content}\n`))

console.log(`box._locked -> ${box._locked}\n`)

withBoxUnlocked(() => {
	throw new Error('Pirates on the horizon! Abort!')
})
