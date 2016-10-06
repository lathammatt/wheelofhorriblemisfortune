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

app.get('/', (req, res) => {
  res.render('index')
})

const spookyWords = [
  "afraid","apparition","bloodcurdling","bloody","bonechilling","bones","broomstick","cackle","cadaver","carve","casket","cauldron","cemetery","chilling","cobweb","coffin","costume","crawly","creature","creepy","dark","decapitate","dew","disembowel","dreadful","exsanguinate","fangtastic","frightening","ghostly","ghoulish","goblin","gory","grave","gruesome","haunted","hellhound","howl","lovecraftian","macabre","mausoleum","moonlit","morbid","mummy","ominous","party","phantom","poltergeist","potion","pumpkin","scary","scott","scream","shadow","skeleton","skull","socketio","specter","spell","spider","spirits","spooky","supernatural","superstition","terrifying","tests","tombstone","treat","trick","undead","unearthly","unnerving","vampire","warlock","werewolf","witch","wizard","wraith","zombie"
]




mongoose.connect(MONGODB_URL, () => {
  server.listen(PORT, () => console.log(`Server listening on ${PORT}`))
})

io.on('connect', socket => {
  console.log(`Socket connected: ${socket.id}`)
  socket.on('disconnect', () => console.log(`Socket disconnected`))
})