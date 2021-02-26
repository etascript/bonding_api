/*/********************************
    Controller: Roles_bonding 
    Autor: Sebastián Cortés
/*//******************************/
var dbConn = require('../../db');
var store = require('./store');

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConn.query(store.showAll, (error, bondings) => {
            if (error) reject(error);
            resolve(bondings[0]);
        })
    })
}

const getOne = (req) => {
    return new Promise((resolve, reject) => {
        dbConn.query(store.showOne, [req.params.id], (error, bonding) => {
            if (error) reject(error);
            resolve(bonding[0]);
        })
    })
}

const insert = (req) => {
    let bdg = {
        nombre: req.body.nombre,
        activo: req.body.activo
    }
    return new Promise((resolve, reject) => {
        dbConn.query(store.insert, [bdg.nombre, bdg.activo], (error, dicSexos) => {
            if (error) reject(error);
            resolve({ message: "Registro Agregado!", data: bdg });
        })
    })
}

const update = (req) => {
    let bdg = {
        sid_dic_contextura: req.params.id,
        nombre: req.body.nombre,
        activo: req.body.activo
    }
    return new Promise((resolve, reject) => {
        dbConn.query(store.showOne, [req.params.id], (error, bonding) => {
            if (error) reject(error);
            if (bonding[0].length > 0) {
                dbConn.query(store.updateData, [bdg.sid_dic_contextura, bdg.nombre, bdg.activo], (error, dicSexos) => {
                    if (error) reject(error);
                    resolve({ message: "Registro Actualizado!", data: bdg });
                })
            } else {
                resolve({ message: "Id no corresponde a ningún registro" })
            }
        })
    })
}

const deleteObj = (req) => {
    let sid_dic_contextura = req.params.id;
    return new Promise((resolve, reject) => {
        dbConn.query(store.showOne, [req.params.id], (error, bonding) => {
            if (error) reject(error);
            if (bonding[0].length > 0) {
                dbConn.query(store.deleteData, [sid_dic_contextura], (error, registro) => {
                    if (error) reject(error);
                    resolve({ message: "Registro Eliminado!" });
                })
            } else {
                resolve({ message: "Id no corresponde a ningún registro" })
            }
        })
    })
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    insert: insert,
    update: update,
    delete: deleteObj,
}