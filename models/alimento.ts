import Sql = require("../infra/sql");

export = class Alimento {
    public posicaoX: number;
    public posicaoY: number;
    public energia_alimento: number;

    public static async listar(): Promise<Alimento[]>{
        let alimentos: Alimento[] = null;
        await Sql.conectar(async (sql) =>{
            alimentos = await sql.query("select idAlimento, posicaoX, posicaoY, energia_alimento from Alimento");
        });
        return alimentos;
    }
    public static async contar(): Promise<Alimento[]> {
        let quantidade = null;
        await Sql.conectar(async (sql) => {
            quantidade = await sql.query("select count(idAlimento) from Alimento");
        });
        return quantidade;
    }
    public static async criar(alimento: Alimento): Promise<string>{
        let erro: string = null;

        if(erro){
            return erro;
        }
        await Sql.conectar(async(sql)=>{
            await sql.query("insert into Alimento (posicaoX, posicaoY, energia_alimento) values (?,?,?)" , [alimento.posicaoX, alimento.posicaoY, alimento.energia_alimento]);
        });

        return erro;
    }
    public static async excluir(id_alimento:number): Promise<string>{
        let erro: string = null;
       
        await Sql.conectar(async(sql)=>{
            let lista = await sql.query(" delete from alimento where idAlimento = ?",[id_alimento]);         
            if(!sql.linhasAfetadas){
                erro = 'Pedido não encontrado';
            }
        });

        return erro;

    }

}