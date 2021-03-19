const express = require('express');
const dotenv = require('dotenv').config();
const server = express();

server.use(express.json());

let personas = [
    { id: 1, nombre: 'Carlos', email: 'carlos@nada.com' },
    { id: 2, nombre: 'Hugo', email: 'hugo@nada.com' }, 
    { id: 3, nombre: 'Juan', email: 'juan@nada.com' },
    { id: 4, nombre: 'Juli', email: 'juli@nada.com' }
]

validarIdPersona = (req, res, next) => {
    const id = parseInt(req.params.id);
    let resultado = personas.find(persona => persona.id === id);
    if (resultado) {
        req.encontrado = resultado;
        next();
    } else {
        res.status(404).send({error: 'Persona no encontrada'})
    }
}

validarNombrePersona = (req, res, next) => {
    const nombre = req.query.nombre.toLowerCase();
    let resultado = personas.find(persona => persona.nombre.toLowerCase() === nombre);
    if (resultado) {
        req.encontrado = resultado;
        next();
    } else {
        res.status(404).send({error: 'Persona no encontrada'})
    }
}

server.get('/personas/:id', validarIdPersona, (req, res) => {
    let objeto = {a: 1, b: 3}
    console.log(JSON.stringify(objeto));
    objeto.c = 4;
    console.log(JSON.stringify(objeto));
    res.status(200).send(req.encontrado);
})

server.get('/personas', validarNombrePersona, (req, res) => {
    res.status(200).send(req.encontrado);
})

server.listen(process.env.SERVER_PORT, () => {
    console.log('All ready...')
})
    
