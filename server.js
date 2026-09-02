const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();

// Crear la carpeta donde se guardarán las cosas si no existe
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

// Configurar cómo se guardan los archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage: storage });

// Decirle a la app que muestre lo que haya en la carpeta "public"
app.use(express.static('public'));

// Configurar el botón de subir
app.post('/subir', upload.single('archivo'), (req, res) => {
    res.send(`¡Archivo subido con éxito a tu nube! <br><br> <a href="/">Volver a subir otro</a>`);
});

// Encender el servidor
app.listen(3000, () => console.log('¡Servidor encendido! Listo en el puerto 3000'));