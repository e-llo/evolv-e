module.exports = app => {
    app.route("/organismo")
        .post(app.api.organismo.salvar)
        .get(app.api.organismo.listar)

    app.route("/organismo/contar")
        .get(app.api.organismo.contar)

    app.route("/organismo/contar/:tipo")
        .get(app.api.organismo.contarPorTipo)

    app.route("/organismo/:id")
        .put(app.api.organismo.salvar)
        .delete(app.api.organismo.remover)
}