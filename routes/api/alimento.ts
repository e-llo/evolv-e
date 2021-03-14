import express = require("express");
import wrap = require("express-async-error-wrapper");
import Alimento = require("../../models/alimento");

const router = express.Router();

router.post("/criar", wrap(async(req: express.Request, res: express.Response)=>{
    let erro: string = null;

	let alimento = req.body as Alimento;

	erro = await Alimento.criar(alimento);

	if (erro) {
		res.status(400).json(erro);
	} else {
		res.json(true);
	}
}));