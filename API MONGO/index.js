import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/cadastro.js'; // Use o caminho com a extensão .js

const app = express();

mongoose
  .connect("mongodb+srv://egslie:minindin@mindindin.ljyzi.mongodb.net/?retryWrites=true&w=majority&appName=MindInDin")
  .then(() => console.log("Banco de Dados conectado"))
  .catch((err) => console.log("Erro de conexão com o Banco de Dados:", err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({ status: "Iniciado" });
});

app.post("/cadastro", async (req, res) => {
    const { nomeCompleto, email, dataNasc, telefone, conta, cartao, ganhos, gastos } = req.body;

    try {
        const oldUser = await User.findOne({ email: email });

        if (oldUser) {
            return res.status(400).json({ data: "Usuário já existe" });
        }

        await User.create({
            nomeCompleto,
            email,
            senha,
            dataNasc,
            telefone,
            conta,
            cartao,
            ganhos,
            gastos
        });

        res.status(201).json({ status: "ok", data: "Usuário criado com sucesso" });
    } catch (error) {
        res.status(500).json({ status: "error", data: error.message });
    }
});

app.listen(5500, () => console.log("Servidor rodando na porta 5500"));
