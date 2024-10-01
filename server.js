const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware para parsear URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Ruta para manejar la solicitud a /grab
app.post('/grab', (req, res) => {
    const data = req.body.data;

    if (data) {
        // Guardar el contenido en output.txt
        fs.appendFile('output.txt', `${data}\n`, (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
                return res.status(500).send('Error al guardar el dato.');
            }
            res.send('Datos guardados correctamente.');
        });
    } else {
        res.status(400).send('No se proporcionó ningún dato.');
    }
});

// Nueva ruta para obtener el contenido de output.txt
app.get('/get-data', (req, res) => {
    fs.readFile('output.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send('Error al leer el archivo.');
        }
        res.send(data); // Devolver el contenido del archivo
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
