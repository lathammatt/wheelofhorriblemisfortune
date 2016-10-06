'use strict';

const socket = io()

const wordSelect = () => {
const spookyWords = [
  "afraid", "apparition", "bloodcurdling", "bloody", "bonechilling", "bones", "broomstick", "cackle", "cadaver", "carve", "casket", "cauldron", "cemetery", "chilling", "cobweb", "coffin", "costume", "crawly", "creature", "creepy", "dark", "decapitate", "dew", "disembowel", "dreadful", "exsanguinate", "fangtastic", "frightening", "ghostly", "ghoulish", "goblin", "gory", "grave", "gruesome", "haunted", "hellhound", "howl", "lovecraftian", "macabre", "mausoleum", "moonlit", "morbid", "mummy", "ominous", "party", "phantom", "poltergeist", "potion", "pumpkin", "scary", "scott", "scream", "shadow", "skeleton", "skull", "socketio", "specter", "spell", "spider", "spirits", "spooky", "supernatural", "superstition", "terrifying", "tests", "tombstone", "treat", "trick", "undead", "unearthly", "unnerving", "vampire", "warlock", "werewolf", "witch", "wizard", "wraith", "zombie"
]
  const random = Math.floor(Math.random() * (spookyWords.length - 1)) + 1
  const selectedWord = spookyWords[random]
  console.log("word", selectedWord)
  return selectedWord
}
wordSelect()
let splitArray = []
// Converting word to array of letter strings
const wordConvert = (selectedWord) => {
  splitArray = selectedWord.split('')
  console.log("split", splitArray)
  return splitArray
}

// Converting string letters to underscores
const underScore = (selectedWord) => {
  const scoredArray = selectedWord.replace(/./g, '__.').split('.')
  scoredArray.pop()
  console.log(typeof scoredArray)
  console.log("scoredArray", scoredArray);
  arrayOutput(scoredArray)
}

// Putting underscores to DOM with spacing
const arrayOutput = (scoredArray) => {
	const space = " "
	const outPut = ""
	for(var score in scoredArray) {
		$('.theWord').append(scoredArray[score])
		$('.theWord').append(space)
	}
}

  // $('.theWord').html(scoredArray)
underScore('werewolf')

wordConvert("werewolf")

$('#spin').on('click', () => {
	console.log("urmom");
})

$('#enterLetter').on('click', () => {
	let letter = $('#letter').val().toLowerCase()
	console.log("letter", letter);
	letterCheck(letter)
	// Regex for value being only one letter
	// function to add or reject letter
	// socket emit result
})

// Return the array position of the guessed letter
const letterCheck = (letter) => {
	let indices = []
	let result = splitArray.filter((x, index) => {
		if (x === letter) {
			indices.push(index)
		}
		return indices
	})
}

$('#guessWord').on('click', () => {
	
})

socket.on('connect', () => console.log(`Socket connected: ${socket.id}`))
socket.on('disconnect', () => console.log(`Socket disconnected`))
socket.on('error', console.error)