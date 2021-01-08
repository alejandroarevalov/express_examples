const express = require('express');
require('dotenv').config();
const server = express();

server.use(express.json());

server.use((req, res, next) => {
    const { method, path, body, query } = req;
    console.log(`Path: ${path} - Method: ${method} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`);
    next();
})

let contactos = [
    { id:1, nombre: "Pepe", email: "pepe@nada.com" },
    { id:2, nombre: "Hugo", email: "hugo@nada.com" },
    { id:3, nombre: "Juan", email: "juan@nada.com" }
];

const validarParametros = (req, res, next) => {
    let {id, nombre} = req.query;

    if (!id && !nombre) {
        const respuesta = {error: 'Parametro de búsqueda no definido'}
        res.status(400).send(respuesta);
    }

    return next();
}

server.get('/contactos/:id', validarParametros, (req, res) => {
    let {id, nombre} = req.params;
    let respuesta = {};
    let status = 200;

    if (id) {
        respuesta = buscarPorId(id);
    } else if (nombre) {
        respuesta = buscarPorNombre(nombre);
    }
    
    if (!respuesta) {
        respuesta = {error: 'Contacto no encontrado'}
        status = 404;
    }
    res.status(status).send(respuesta);
})

const buscarPorId = (id) => {
    return contactos.find(contacto => contacto.id === Number(id));
}

const buscarPorNombre = (nombre) => {
    return contactos.find(contacto => contacto.nombre === nombre);
}

server.listen(process.env.SERVER_PORT, () => {
    console.log("Servidor en ejecución...");
})

server.use((err, req, res, next) => {
    if (!err) {
        return next();
    }

    console.log(JSON.stringify(err));

    return res.status(500)
        .json("Se ha producido un error inesperado.");
});