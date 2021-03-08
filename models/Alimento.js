"use strict";
var _a;
const crypto_1 = require("crypto");
const Sql = require("../infra/sql");
module.exports = (_a = class Alimento {
        static validar(alimento) {
           //validacoes
            return null;
        }
        static async contar() {
            let quantidade = null;
            await Sql.conectar(async (sql) => {
                quantidade = await sql.query("select count(idAlimento) from Alimento");
            });
            return quantidade;
        }
        static async criar(alimento) {
            let erro = Cliente.validar(cliente);
            if (erro) {
                return erro;
            }
            await Sql.conectar(async (sql) => {
                await sql.query("insert into Alimento (posicaoX, posicaoY, energia_alimento) values (?,?,?)" , [alimento.posicaoX, alimento.posicaoY, alimento.energia_alimento]);
            });
            return erro;
        }
    },
    _a);
