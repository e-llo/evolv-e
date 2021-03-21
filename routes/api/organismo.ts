import app = require("teem");
import Organismo = require("../../models/organismo");


class OrganismoAPI {
	public async listar(req: app.Request, res: app.Response) {
	
		const organismos = await Organismo.listar();

		res.json(organismos);
	}

	@app.http.post()
	public async criar(req: app.Request, res: app.Response) {
		// Cria uma nova pessoa

		const organismo: Organismo = req.body;

		const erro = await Organismo.criar(organismo);

		if (erro) {
			res.status(400).json(erro);
			return;
		}

		res.json(organismo.id);
	}
	
}

export = OrganismoAPI;
