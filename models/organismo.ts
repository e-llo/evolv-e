import app = require("teem");

class Organismo{
    id: number;
    raio: number;
    vel_max: number;
    forca_max: number;
    cor: string;
    raio_deteccao: number;
    energia_max: number;
    cansaco_max: number;
    taxa_aum_cansaco: number;
    tipo: string; // C ou H

    public static async listar(): Promise<Organismo[]> {
		let organismos: Organismo[] = null;

		await app.sql.connect(async (sql) => {

			organismos = await sql.query("SELECT * from organismo");

		});

		return organismos;
	}

    public static async criar(organismo: Organismo): Promise<string> {
		let erro = null;

		if (erro) {
			return erro;
		}

		await app.sql.connect(async (sql) => {

			try {
                await sql.query("insert into organismo(raio, vel_max,forca_max,cor,raio_deteccao,energia_max, cansaco_max, taxa_aum_cansaco, tipo) VALUES (?, ?,?,?,?,?,?,?,?,?)", 
                [organismo.raio, organismo.vel_max, organismo.forca_max, organismo.cor, organismo.raio_deteccao, organismo.energia_max, organismo.cansaco_max, organismo.taxa_aum_cansaco, organismo.tipo ]);

				organismo.id = await sql.scalar("SELECT last_insert_id()");
			} catch (e) {
				throw e;
			}

		});

		return erro;
	}

}

export = Organismo;
