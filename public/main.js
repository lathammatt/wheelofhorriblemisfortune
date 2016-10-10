'use strict';

const socket = io()




const arrayOutput = (game) => {
  const space = " "
  $('.theWord').text('')
  for (var score in game.currentBoard) {
    $('.theWord').append(game.currentBoard[score])
    $('.theWord').append(space)
  }
  $('#letter').val('')
  $('#word').val('')
}


const responseOutput = game => {
    $('#choiceResponse').html(game.message)
    $('#missLetters').html(`Wrong guesses: ${game.missedLetters}`)
}


$('#spin').on('click', () => {
  console.log("urmom");
})


$('#enterLetter').on('click', () => {
  //need Regex check here
  let letter = $('#letter').val().toLowerCase()
  socket.emit('player move', letter)
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