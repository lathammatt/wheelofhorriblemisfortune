'use strict';

const express = require('express')
const { Server } = require('http')
const mongoose = require('mongoose')
const socketio = require('socket.io')

const app = express()
const server = Server(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/wheelofmisfortune'

app.set('view engine', 'pug')

app.use(express.static('public'))




//routes----------
app.get('/', (req, res) => {
  Game.find()
    .or([{ player1: { $exists: false } }, { player2: { $exists: false } }])
    .exists('result', false)
    .then(games => res.render('home', { games }))
})

// app.get('/game', (req, res) => {
//   Game.find()
//     .then(games => res.render('index', { games }))
// })
app.get('/game/create', (req, res) => {
  Game.create({

    })
    .then(game => wordSelect(game))
    .then(g => g.save())
    .then(game => {
      console.log("game2", game)
      res.redirect(`/index/${game._id}`)
    })
})
app.get('/index/:id', (req, res) => {
  res.render('index')
})





//model----------
const Game = mongoose.model('game', {
  answer: Array,
  split: Array,
  currentBoard: Array,
  guesses: Array,
  player1: String,
  player2: String,
  toMove: String,
  result: String,
})

//assigning players to schema
const attemptToJoinGameAsPlayer = (game, socket) => {
  if (hasTwoPlayers(game)) {
    return game
  }

  const playerNumber = randomPlayerNumber()

  if (hasZeroPlayers(game)) {
    game[`player${playerNumber}`] = socket.id
  } else if (game.player1 && !game.player2) {
    // player1 already connected and player2 is available
    game.player2 = socket.id
  } else if (!game.player1 && game.player2) {
    // player2 already connected and player1 is available
    game.player1 = socket.id
  }

  if (playerNumber === 1) {
    game.toMove = socket.id
  }

  return game
}

const randomPlayerNumber = () => Math.round(Math.random()) + 1
const hasZeroPlayers = game => !game.player1 && !game.player2
const hasTwoPlayers = game => !!(game.player1 && game.player2)

const isPlayersTurn = (game, socket) => game.toMove === socket.id
const isFinished = game => !!game.result

//selecting a word for puzzle, making blank array for dom population and split array of word letters for matching
const wordSelect = (game) => {
  console.log("game1", game)
  let selectedWord = []
  const spookyWords = [
    "afraid", "apparition", "bloodcurdling", "bloody", "bonechilling", "bones", "broomstick", "cackle", "cadaver", "carve", "casket", "cauldron", "cemetery", "chilling", "cobweb", "coffin", "costume", "crawly", "creature", "creepy", "dark", "decapitate", "dew", "disembowel", "dreadful", "exsanguinate", "fangtastic", "frightening", "ghostly", "ghoulish", "goblin", "gory", "grave", "gruesome", "haunted", "hellhound", "howl", "lovecraftian", "macabre", "mausoleum", "moonlit", "morbid", "mummy", "ominous", "party", "phantom", "poltergeist", "potion", "pumpkin", "scary", "scott", "scream", "shadow", "skeleton", "skull", "socketio", "specter", "spell", "spider", "spirits", "spooky", "supernatural", "superstition", "terrifying", "tests", "tombstone", "treat", "trick", "undead", "unearthly", "unnerving", "vampire", "warlock", "werewolf", "witch", "wizard", "wraith", "zombie"
  ]
  const random = Math.floor(Math.random() * (spookyWords.length - 1)) + 1
  selectedWord = spookyWords[random]
  game.answer = selectedWord
  console.log("word", selectedWord)
    let splitArray = []
    splitArray = selectedWord.split('')
  game.split = splitArray
  let scoredArray = []
  scoredArray = selectedWord.replace(/./g, '__.').split('.')
  scoredArray.pop()
  game.currentBoard = scoredArray
  return game
}


mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () => {
  server.listen(PORT, () => console.log(`Server listening on ${PORT}`))
})

io.on('connect', socket => {
  const id = socket.handshake.headers.referer.split('/').slice(-1)[0]

  Game.findById(id)
    .then(g => {
      socket.join(g._id)
      socket.gameID = g._id
      socket.emit('new game', g)
    })
    .catch(err => {
      socket.emit('error', err)
      console.error(err)
    })

  socket.on('player move', move => playerTurn(move, socket))
  console.log(`Socket connected: ${socket.id}`)
  socket.on('disconnect', () => console.log(`Socket disconnected`))
})



const setMove = (game, move) => {
  // game.currentBoard update
}

const toggleNextMove = game => {
  game.toMove = game.toMove === game.player1 ? game.player2 : game.player1
  return game
}

//checks to see if currentBoard is completely answered or not
const setResult = (game, socket) => {
  game.currentBoard.filter(item, () => {
    if (item !== "_") { //if everything in array does not equal "_''
      if (socket.id === game.player1) {
        game.result = game.player1
        game.toMove = undefined
      } else {
        game.result = game.player2
        game.toMove = undefined
      }
    }
    return game
  })
}

//whole process of player turn
const playerTurn = (move, socket) => {
  Game.findById(socket.gameID)
    .then(game => {
      if (isFinished(game)) {
        return
      }
      return game
    })
    .then(g => setMove(g, move))
    .then(toggleNextMove)
    .then(setResult)
    .then(g => g.save())
    .then(g => io.to(g._id).emit('move made', g))
    .catch(console.error)
}