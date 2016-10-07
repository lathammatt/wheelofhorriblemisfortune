'use strict';

const socket = io()


// let splitArray = []
//   // Converting word to array of letter strings
// const wordConvert = (selectedWord) => {
//   underScore(selectedWord)
//   splitArray = selectedWord.split('')
//   console.log("split", splitArray)
//   return splitArray
// }


// Converting string letters to underscores
let scoredArray = []
const underScore = (selectedWord) => {
  scoredArray = selectedWord.replace(/./g, '__.').split('.')
  scoredArray.pop()
  console.log(typeof scoredArray)
  console.log("scoredArray", scoredArray);
  arrayOutput(scoredArray)
}


// Putting underscores to DOM with spacing
const arrayOutput = (scoredArray) => {
  const space = " "
  $('.theWord').text('')
  for (var score in scoredArray) {
    $('.theWord').append(scoredArray[score])
    $('.theWord').append(space)
  }
}




$('#spin').on('click', () => {
  console.log("urmom");
})

let guesses = []
$('#enterLetter').on('click', () => {
  //need Regex check here
  console.log("guesses", guesses)
  let letter = $('#letter').val().toLowerCase()
  let check = guesses.filter((x) => {
    if (x === letter) {    
      return letter
      // socket.emit('player move', letter)
    }
  })
  console.log("check", check)
  if (check.length > 0) {
    $('#choiceResponse').html(`This letter has already been picked, Bloodbag!`)
    //console.log("Letter already picked")
  } else {
    console.log("letter", letter);
    $('#choiceResponse').html(`Good choice!`)  
    guesses.push(letter)
    letterCheck(letter)
  }
})

// Return the array position of the guessed letter
let indices = []
const letterCheck = (letter) => {
  let result = splitArray.filter((x, index) => {
    if (x === letter) {
      indices.push(index)
    } 
  })
  console.log("index", indices)
  arraySwitch(letter)
}

const arraySwitch = (letter) => {
  console.log("scored", scoredArray)
  if (indices.length === 0) {
    $('#missLetters').append(letter)
    $('#choiceResponse').html(`Wrong letter Jackwagon!`)
    $('#letter').val('')
  } else {
    for (var i = 0; i < indices.length; i++) {
      console.log("in loop", indices[i], letter)
      scoredArray.splice(indices[i], 1, letter)
    }
    $('#letter').val('')
    console.log("new", scoredArray)
    indices = []
    arrayOutput(scoredArray)
  }
}


$('#guessWord').on('click', () => {
  console.log("fired")
  let wordGuess = $('#word').val().toLowerCase()
  let answer = selectedWord.toString()
  console.log(answer, wordGuess)
  if (answer === wordGuess){
    arrayOutput(splitArray)
    $('#choiceResponse').html(`Hazaa!  Correct!`)
  } else {
    $('#choiceResponse').html(`You have guessed wrong and we'll have to take a finger!`)
    //console.log("Wrong!")
  }
  console.log(wordGuess)
})


// let selectedWord = []
// const wordSelect = () => {
//   const spookyWords = [
//     "afraid", "apparition", "bloodcurdling", "bloody", "bonechilling", "bones", "broomstick", "cackle", "cadaver", "carve", "casket", "cauldron", "cemetery", "chilling", "cobweb", "coffin", "costume", "crawly", "creature", "creepy", "dark", "decapitate", "dew", "disembowel", "dreadful", "exsanguinate", "fangtastic", "frightening", "ghostly", "ghoulish", "goblin", "gory", "grave", "gruesome", "haunted", "hellhound", "howl", "lovecraftian", "macabre", "mausoleum", "moonlit", "morbid", "mummy", "ominous", "party", "phantom", "poltergeist", "potion", "pumpkin", "scary", "scott", "scream", "shadow", "skeleton", "skull", "socketio", "specter", "spell", "spider", "spirits", "spooky", "supernatural", "superstition", "terrifying", "tests", "tombstone", "treat", "trick", "undead", "unearthly", "unnerving", "vampire", "warlock", "werewolf", "witch", "wizard", "wraith", "zombie"
//   ]
//   const random = Math.floor(Math.random() * (spookyWords.length - 1)) + 1
//   selectedWord = spookyWords[random]
//   wordConvert(selectedWord)
//   console.log("word", selectedWord)
//   // return selectedWord
// }


wordSelect()



socket.on('connect', () => console.log(`Socket connected: ${socket.id}`))
socket.on('disconnect', () => console.log(`Socket disconnected`))
socket.on('error', console.error)
socket.on('new game', render)
socket.on('move made', render)