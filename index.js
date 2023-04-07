const express = require('express');
const request = require('request');

const app = express();
const agendaUrl = 'http://www.raydelto.org/agenda.php';

app.get('/contactos', (req, res) => {
  request(agendaUrl, (error, response, body) => {
    if (error) {
      return res.status(500).send({ error: 'Error al obtener la lista de contactos' });
    }
    res.send(body);
  });
});

app.post('/contactos', (req, res) => {
  const nuevoContacto = req.body;

  
  request.post('http://www.raydelto.org/agenda.php', { form: nuevoContacto }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      
      res.json({ message: 'Contacto almacenado correctamente' });
    } else {
      
      res.status(500).json({ error: 'No se puede almacenar el contacto' });
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});