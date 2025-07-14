require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const url = require('url');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Almacenamiento en memoria para URLs (índice como short_url)
const urlDatabase = [];

// Ruta POST para crear una URL corta
app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

  // Validar formato básico de la URL (middleaware)
  const urlRegex = /^https?:\/\/([\w-]+\.)*[\w-]+\.[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
  if (!urlRegex.test(originalUrl)) {
    console.log('Invalid URL format:', originalUrl);
    return res.json({ error: 'invalid url' });
  }

  // Extraer hostname para validar con dns.lookup
  let parsedUrl;
  try {
    parsedUrl = new URL(originalUrl);
  } catch (err) {
    console.log('Error parsing URL:', originalUrl, err);
    return res.json({ error: 'invalid url' });
  }
  const hostname = parsedUrl.hostname;

  dns.lookup(hostname, (err) => {
    if (err) {
      return res.json({ error: 'invalid url' });
    }

    // Si la URL ya existe, devolver su short_url
    const existingIndex = urlDatabase.indexOf(originalUrl);
    if (existingIndex !== -1) {
      return res.json({
        original_url: originalUrl,
        short_url: existingIndex + 1
      });
    }

    // Agregar nueva URL y devolver short_url
    urlDatabase.push(originalUrl);
    res.json({
      original_url: originalUrl,
      short_url: urlDatabase.length
    });
  });
});

// Ruta GET para redirigir a la URL original
app.get('/api/shorturl/:short_url', (req, res) => {
  const shortUrl = parseInt(req.params.short_url);
  const originalUrl = urlDatabase[shortUrl - 1];

  if (!originalUrl) {
    return res.json({ error: 'invalid url' });
  }

  res.redirect(originalUrl);
});


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
