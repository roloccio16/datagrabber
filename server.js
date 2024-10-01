const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware para parsear URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.get("/help", (req, res) => {
    res.send('curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "data=untexto" http://localhost:3000/grab')
})

// Ruta para manejar la solicitud a /grab
app.post('/grab', (req, res) => {
    const data = req.body.data; // Obtener el parámetro 'data'

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

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
