'use strict'

const Vector = require('../06-the-secret-life-of-objects/a-vector-type')

/**
 * Grid constructor ...
 * @param {Number} width
 * @param {Number} height
 */

function Grid(width, height) {
  this.space = new Array(width * height)
  this.width = width
  this.height = height
}

Grid.prototype.isInside = function (vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height
}

Grid.prototype.get = function (vector) {
  return this.space[vector.x + this.width * vector.y]
}

Grid.prototype.set = function (vector, value) {
  this.space[vector.x + this.width * vector.y] = value
}

Grid.prototype.forEach = function (fn, context) {
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var value = this.space[x + y * this.width]
			if (value !== null)
				fn.call(context, value, new Vector(x, y))
		}
	}
}

/**
 * BouncingCritter constructor ...
 * @param {Array} arr
 */

var directions = {
	'n': new Vector(0, -1),
	'ne': new Vector(1, -1),
	'e': new Vector(1, 0),
	'se': new Vector(1, 1),
	's': new Vector(0, 1),
	'sw': new Vector(-1, 1),
	'w': new Vector(-1, 0),
	'nw': new Vector(-1, -1)
}

var directionNames = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']

function randomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function BouncingCritter() {
	this._direction = randomElement(directionNames)
}

BouncingCritter.prototype.act = function(view) {
	if (view.look(this._direction) !== ' ')
		this._direction = view.find(' ') || 's'
	return {
		type: 'move',
		direction: this._direction
	}
}

function dirPlus(dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

function WallFollower() {
  this.dir = 's';
}

WallFollower.prototype.act = function(view) {
  var start = this.dir;
  if (view.look(dirPlus(this.dir, -3)) != ' ')
    start = this.dir = dirPlus(this.dir, -2);
  while (view.look(this.dir) != ' ') {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir == start) break;
  }
  return {type: 'move', direction: this.dir};
};

/**
 * Wall constructor
 */

function Wall() {}

/**
 * World constructor
 */

function elementFromChar(legend, ch) {
	if (ch === ' ')
		return null
	var element = new legend[ch]()
	element.originChar = ch
	return element
}

function charFromElement(element) {
	if (element === null)
		return ' '
	return element.originChar
}

function View(world, vector) {
	this._world = world
	this._vector = vector
}

View.prototype.look = function (dir) {
	var target = this._vector.plus(directions[dir])
	return this._world._grid.isInside(target) ?
		charFromElement(this._world._grid.get(target)) : '#'
}

View.prototype.findAll = function (ch) {
	var found = []
	for (var dir in directions)
		if (this.look(dir) === ch)
			found.push(dir)
	return found
}

View.prototype.find = function (ch) {
	var found = this.findAll(ch)
	return found.length === 0 ? null : randomElement(found)
}

function World(map, legend) {
	this._grid = new Grid(map[0].length, map.length)
	this._legend = legend

	map.forEach(function (line, y) {
		for (var x = 0; x < line.length; x++)
			this._grid.set(new Vector(x, y), elementFromChar(this._legend, line[x]))
	}, this)
}

World.prototype.toString = function () {
	var output = ''
	for (var y = 0; y < this._grid.height; y++) {
		for (var x = 0; x < this._grid.width; x++) {
			var element = this._grid.get(new Vector(x, y))
			output += charFromElement(element)
		}
		output += '\n'
	}
	return output
}

World.prototype.turn = function () {
	var acted = []
	this._grid.forEach(function (critter, vector) {
		if (critter.act && acted.indexOf(critter) === -1) {
			acted.push(critter)
			this.letAct(critter, vector)
		}
	}, this)
	return this
}

World.prototype.letAct = function (critter, vector) {
	var action = critter.act(new View(this, vector))
	if (action && action.type === 'move') {
		var dest = this._checkDestination(action, vector)
		if (dest && this._grid.get(dest) === null) {
			this._grid.set(vector, null)
			this._grid.set(dest, critter)
		}
	}
}

World.prototype._checkDestination = function (action, vector) {
	if (directions.hasOwnProperty(action.direction)) {
		var dest = vector.plus(directions[action.direction])
		if (this._grid.isInside(dest))
			return dest
	}
}

function LifeLikeWorld(map, legend) {
	World.call(this, map, legend)
}

LifeLikeWorld.prototype = Object.create(World.prototype)

var actionTypes = Object.create(null)
actionTypes.grow = function (critter) {
	critter.energy += 0.5
	return true
}

actionTypes.move = function (critter, vector, action) {
	var dest = this._checkDestination(action, vector)
	if (dest === null || critter.energy <= 1 || this._grid.get(dest) !== null)
		return false
	critter.energy -= 1
	this._grid.set(vector, null)
	this._grid.set(dest, critter)
	return true
}

actionTypes.eat = function (critter, vector, action) {
	var dest = this._checkDestination(action, vector)
	var atDest = dest !== null && this._grid.get(dest)
	if (!atDest || atDest.energy == null)
		return false
	critter.energy = atDest.energy
	this._grid.set(dest, null)
	return true
}

actionTypes.reproduce = function (critter, vector, action) {
	var baby = elementFromChar(this._legend, critter.originChar)
	var dest = this._checkDestination(action, vector)
	if (dest === null || critter.energy <= 2 * baby.energy || this._grid.get(dest) !== null)
		return false
	critter.energy -= 2 * baby.energy
	this._grid.set(dest, baby)
	if (baby.originChar === '@') {
		console.log('baby --> ', baby)
	}
	return true
}

function Plant() {
	this.energy = 3 + Math.random() * 4
}

Plant.prototype.act = function (view) {
	if (this.energy > 15) {
		var space = view.find(' ')
		if (space)
			return { type: 'reproduce', direction: space }
	}

	if (this.energy < 20) {
		return { type: 'grow' }
	}
}

function PlantEater() {
	this.energy = 30
}

PlantEater.prototype.act = function (view) {
	var space = view.find(' ')
	if (this.energy > 90)
		return { type: 'reproduce', direction: space }

	var plant = view.find('*')
	if (plant)
		return { type: 'eat', direction: plant }

	if (space)
		return { type: 'move', direction: space }
}

function SmartPlantEater() {
	this.energy = 130
	this.direction = 'e'
}

SmartPlantEater.prototype.act = function (view) {
  var space = view.find(' ')
  if (this.energy > 130 && space)
    return { type: 'reproduce', direction: space }

  var plants = view.findAll('*')
  if (plants.length > 1)
    return { type: 'eat', direction: randomElement(plants) }

  if (view.look(this.direction) != ' ' && space)
    this.direction = space;
  return { type: 'move', direction: this.direction }
}

function PlantEaterEater() {
	this.energy = 160
	this.direction = 'e'
	this.eat = 0
}

PlantEaterEater.prototype.act = function (view) {
	var space = view.find(' ')
	if (this.energy > 160 && space)
		return { type: 'reproduce', direction: space }

	var plantEater = view.find('O')
	if (plantEater && this.eat < 1) {
		this.eat++
		return { type: 'eat', direction: plantEater }
	}

	var plant = view.find('*')
	if (plant)
		return { type: 'eat', direction: plant }

	if (view.look(this.direction) !== ' ' && space)
		this.direction = space
	return { type: 'move', direction: this.direction }
}

LifeLikeWorld.prototype.letAct = function (critter, vector) {
	var action = critter.act(new View(this, vector))
	var handled = action && action.type in actionTypes &&
		actionTypes[action.type].call(this, critter, vector, action)

	if (!handled) {
		critter.energy -= 0.2
		if (critter.energy <= 0)
			this._grid.set(vector, null)
	}
}

var plan = [
	'############################',
	'#      #    #      o      ##',
	'#                          #',
	'#          #####    ~   ~  #',
	'##         #   #    ##     #',
	'###           ##     #     #',
	'#           ###      #     #',
	'#   ####                   #',
	'#   ##       o             #',
	'# o  #         o       ### #',
	'#    #                     #',
	'############################'
]

var world = new World(plan, {
	'#': Wall,
	'~': WallFollower,
	'o': BouncingCritter
})

var valley = new LifeLikeWorld([
	'####################################################',
	'#                 ####         ****              ###',
	'#   *  @  ##                 ########       OO    ##',
	'#   *    ##        O O                 ****       *#',
	'#       ##*                        ##########     *#',
	'#      ##***  *         ****                     **#',
	'#* **  #  *  ***      #########                  **#',
	'#* **  #      *               #   *              **#',
	'#     ##              #   O   #  ***          ######',
	'#*            @       #       #   *        O  #    #',
	'#*                    #  ######                 ** #',
	'###          ****          ***                  ** #',
	'#       O                        @         O       #',
	'#   *     ##  ##  ##  ##               ###      *  #',
	'#   **         #              *       #####  O     #',
	'##  **  O   O  #  #    ***  ***        ###      ** #',
	'###               #   *****                    ****#',
	'####################################################'
], {
	'#': Wall,
	'O': SmartPlantEater,
	'@': PlantEaterEater,
	'*': Plant
})

let timeout = 0
function requestAnimationFrame(cb) {
	timeout += 1000 / 10
	return setTimeout(cb, timeout)
}

console.reset = function () {
  return process.stdout.write('\x1B[2J\x1B[0f')
}

for (var i = 0; i < 1000; i++) {
	requestAnimationFrame(() => {
		console.reset()
		console.log(valley.turn().toString())
	})
}
