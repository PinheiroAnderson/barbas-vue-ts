export class Service {
        id: string;
        nome: string;
        valor: string;
        descricao: string;
        descricaoCompleta: string;
        fotos?: string;
        duracao: string;

    constructor() {
        this.id = "";
        this.nome = "";
        this.valor = "";
        this.descricao = "";
        this.descricaoCompleta = "";
        this.fotos = "";
        this.duracao = "";
    }
}
