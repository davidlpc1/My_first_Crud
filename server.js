const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const port = 3000;

//Configurar arquivos estáticos na pasta public
app.use(express.static("public"));

// Configuração do Nunjucks
nunjucks.configure("templates", {
  express: app,
  noCache: true, //Retirar na produção
});

//Habilitar o req.body para requisições POST
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  console.log('> Get at route: /')
  const rows = await db.findAll();
  return res.render("index.html", { notes: rows });
});

app.post("/", async (req, res) => {
  console.log('> Post at route: /')
  const { name, description } = req.body;
  await db.insertData([name, description]);
  return res.redirect('/')
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`> Delete at route: /delete/${id}`)
  const result = await db.deleteNote(id);
  return res.send(result);
});

app.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`> Get at route: /edit/${id}`)
    const result = await db.findOne(id);
    return res.render("edit.html", {note:result[0]});
});

app.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`> Post at route: /edit/${id}`)
  const { name, description } = req.body;
  await db.updateData({ name, description, id });
  return res.redirect('/')
})

app.listen(port, () => {
  console.log(`> Listening at localhost:${port}`);
});