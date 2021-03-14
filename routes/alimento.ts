import express = require("express");
import wrap = require("express-async-error-wrapper");
import Alimento = require("../models/alimento");

const router = express.Router();

router.get("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let opcoes = {
		alimento: null
	};
	//adiciona na lista
}));

export = router;
