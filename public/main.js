'use strict';

const socket = io()



// Putting underscores to DOM with spacing
// const arrayOutput = (scoredArray) => {
//   const space = " "
//   $('.theWord').text('')
//   for (var score in scoredArray) {
//     $('.theWord').append(scoredArray[score])
//     $('.theWord').append(space)
//   }
// }

const arrayOutput = (game) => {
  const space = " "
  $('.theWord').text('')
  for (var score in game.currentBoard) {
    $('.theWord').append(game.currentBoard[score])
    $('.theWord').append(space)
  }
}



$('#spin').on('click', () => {
  console.log("urmom");
})

// let guesses = []
$('#enterLetter').on('click', () => {
  //need Regex check here
  // console.log("guesses", guesses)
  let letter = $('#letter').val().toLowerCase()
  // let check = guesses.filter((x) => {
  //   if (x === letter) {
  //     return letter
      socket.emit('player move', letter)
    // }
  })
  console.log("check", check)
  if (check.length > 0) {
    $('#choiceResponse').html(`This letter has already been picked, Bloodbag!`)
    //console.log("Letter already picked")
  } else {
    console.log("letter", letter);
    $('#choiceResponse').html(`Good choice!`)
    // guesses.push(letter)
    letterCheck(letter)
  }
})

// Return the array position of the guessed letter
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




socket.on('connect', () => console.log(`Socket connected: ${socket.id}`))
socket.on('disconnect', () => console.log(`Socket disconnected`))
socket.on('error', console.error)
socket.on('new game', arrayOutput)
socket.on('move made', arrayOutput)