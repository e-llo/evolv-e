module.exports = app => {
    const salvar = (req, res) => {
        const organismo = {...req.body}
        if(req.params.id) organismo.id = req.params.id

        if(organismo.id){
            //::alterar
            app.db("organismo") //conectar com a tabela
                .update(organismo)
                .where({id: organismo.id})
                .then(_ => res.status(200).send()) //200: requisição bem sucedida. Só envia o status como resposta
                .catch(err => res.status(500).send(err)) //caso dê erro, envia para o client
        } else { 
            // ::criar
            app.db("organismo")
                .insert(organismo)
                .then(_ => res.status(201).send()) //201: requisição bem sucedida e recurso criado
                .catch(err => res.status(500).send(err))
        }
    }

    const listar = (req, res) => {
        app.db("organismo")
            .select("id", "raio_min", "vel_max", "forca_max","cor", "raio_deteccao_min", "energia_max", "cansaco_max","taxa_aum_cansaco", "tempo_vida_min", "tempo_vida_max","tipo")
            .then(lista => res.status(200).json(lista))
            .catch(err => res.status(500).send(err))
    }

    const contar = (req, res) => {
        // ::contar todos
        app.db("organismo").count('id').first()
        .then(resultado => res.json({n_organismos: resultado["count(`id`)"]}))
    }

    const contarPorTipo = async (req, res) => {  
        const tipo = req.params.tipo
        
        app.db("organismo").count('id').where({tipo}).first()
        .then(resultado => res.json({n_organismos: resultado["count(`id`)"], tipo}))
    }

    const remover = (req, res) => {
        app.db("organismo")
            .where({id: req.params.id})
            .del()
            .then(_ => res.status(204).send("organismo excluido com sucesso"))
            .catch(err => res.status(500).send(erro))
    }

    return {salvar, listar, contar, contarPorTipo, remover}
}