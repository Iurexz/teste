import mongoose from 'mongoose';

const CadastroSchema = new mongoose.Schema({
    nomeCompleto: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    senha: String,
    dataNasc: { type: Date, default: Date.now },
    telefone: { type: String },
    conta: {
        nomeacc: String,
        descricao: String,
    },
    cartao: {
        nomeCC: String,
        descricao: String,
        limite: Number,
        validade: Date,
    },
    ganhos: {
        nomeg: String,
        descricao: String,
        valor: Number,
        data: { type: Date, default: Date.now }
    },
    gastos: {
        nomegg: String,
        descricao: String,
        valor: Number,
        data: { type: Date, default: Date.now },
    },
}, {
    collection: "cadastro"
});

export default mongoose.model("InfoUsuario", CadastroSchema);
