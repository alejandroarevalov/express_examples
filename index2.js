const express = require ('express');
const compression = require ('compression');
const server = express();
let contactos = [];
server.use(express.json());
server.use(compression());
function log(req, res, next) {
    const {method, path, query, body } = res;
    console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
    next();
}
server.use(log);
function validarContacto (req, res, next) {
    const { nombre, apellido, email } = req.body;
    if (!nombre || !apellido || !email) {
        return res.status(400)
        .send({status: 'Error', mensaje: 'Datode del contacto invalido'});
    }
    return next();
}
function validarSiExiste (req, res, next) {
    const { email } = req.body;
    const i = contactos.findIndex(c => c.email == email);
    if ( i >= 0 ) {
        return res.status(409)
        .send({status: 'Error', mensaje: 'el contacto ya existe'});
    }
    return next();
}
server.post('/contacto', validarContacto, validarSiExiste, (req, res) => {
    contactos.push(req.body);
    res.status(201).json({status: "OK", mensaje: "Contacto Agregado"});
});
server.listen(3000, () => {
    console.log ('Servidor iniciado....');
});