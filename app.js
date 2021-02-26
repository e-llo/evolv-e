import ejs from "ejs";
import path from "path";
import express from "express";
const app = express();


// Define o view engine como o ejs 
app.set("view engine", "ejs");
let __dirname = path.resolve(path.dirname(''))
app.set("views", path.join(__dirname));


//direcionamento da página
app.get("/", (req, res) => {
    res.render("index");
})


app.listen(1337, () => {
    console.log('Servidor executando na porta 1337...')
})