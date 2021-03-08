"use strict";
var _a;
const crypto_1 = require("crypto");
const Sql = require("../infra/sql");
module.exports = (_a = class Carnivoro {
        static validar(carnivoro) {
           //validacoes
            return null;
        }
        static async contar() {
            let quantidade = null;
            await Sql.conectar(async (sql) => {
                quantidade = await sql.query("select count(idCarnivoro) from Carnivoro");
            });
            return quantidade;
        }
       
    },
    _a);