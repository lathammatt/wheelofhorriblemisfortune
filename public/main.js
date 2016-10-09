'use strict';

const socket = io()




const arrayOutput = (game) => {
  const space = " "
  $('.theWord').text('')
  for (var score in game.currentBoard) {
    $('.theWord').append(game.currentBoard[score])
    $('.theWord').append(space)
  }
}


const responseOutput = game => {
  if (game.result) {
    $(#choiceResponse).html(`${game.result} won!`)
  } else {
    $(#choiceResponse).html(`${game.result}'s turn'`)
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


$('#guessWord').on('click', () => {
  console.log("fired")
  let wordGuess = $('#word').val().toLowerCase()
  let answer = selectedWord.toString()
  console.log(answer, wordGuess)
  if (answer === wordGuess) {
    arrayOutput(splitArray)
    $('#choiceResponse').html(`Hazaa!  Correct!`)
  } else {
    $('#choiceResponse').html(`You have guessed wrong and we'll have to take a finger!`)
      //console.log("Wrong!")
  }
  console.log(wordGuess)
})

const render = game => {
  arrayOutput(game)
  responseOutput(game)
}



socket.on('connect', () => console.log(`Socket connected: ${socket.id}`))
socket.on('disconnect', () => console.log(`Socket disconnected`))
socket.on('error', console.error)
socket.on('new game', render)
socket.on('move made', render)