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
  //needs function and testing

})


$('#enterLetter').on('click', () => {
  let letter = $('#letter').val().toLowerCase()
  socket.emit('player move', letter)
})


$('#guessWord').on('click', () => {
  let wordGuess = $('#word').val().toLowerCase()
  socket.emit('player guess', wordGuess)
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