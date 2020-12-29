const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000

//Habilitar o req.body para requisições POST
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    const rows = await db.findAll()
    return res.send(rows)
})

app.post('/', async (req, res) => {
    const { name ,description } = req.body
    await db.insertData([name,description])
    const rows = await db.findAll()
    return res.send(rows)
})

app.delete('/', async (req, res) => {
    const result = await db.deleteAll()
    return res.send(result)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await db.deleteNote(id)
    return res.send(result)
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name , description } = req.body
    const result = await db.updateData({name, description,id })
    return res.send(result)
})

app.listen(port,() => {
    console.log(`Listening at localhost:${port}`)
})