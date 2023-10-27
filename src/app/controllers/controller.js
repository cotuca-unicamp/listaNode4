const selectClient = require("../db/classSelectClient.js");

class control_clients {
    showTab() {
        return async function(req, res) {
            const clienter = await selectClient.init();
            try {
                const resultados = await clienter.showTab();
                console.log(resultados);
                res.render('../views/clients', {clientes: resultados});
            } catch (erro) {
                console.log(erro);
                res.status(500).send("Ocorreu um erro ao mostrar a tabela: " + erro.message);
            }
        };
    };

    add() {
        return async function(req, res) {
            const { prenome, sobrenome, dataNasc, email, cpf } = req.body;
            const clienter = await selectClient.init();
            try {
                await clienter.add(prenome, sobrenome, dataNasc, email, cpf);
                const updatedClients = await clienter.showTab();
                res.render('../views/clients', { clientes: updatedClients });
            } catch (error) {
                console.error("Erro ao adicionar cliente:", error);
                res.status(500).send("Ocorreu um erro ao adicionar: " + error.message);
            }
        };
    };

    showEdit() {
        return async function(req, res) {
            const clientId = req.params.id;
            const clienter = await selectClient.init();
            try {
                const client = await clienter.getClientById(clientId);
                res.render('../views/edit', { client: client });
            } catch (error) {
                console.error("Ocorreu um erro ao buscar os detalhes do cliente:", error);
                res.status(500).send("Ocorreu um erro ao buscar os detalhes do cliente: " + error.message);
            }
        };
    };

    update() {
        return async function(req, res) {
            const clientId = req.params.id;
            const { prenome, sobrenome, dataNasc, email, cpf } = req.body;
            const clienter = await selectClient.init();
            try {
                await clienter.edit(clientId, prenome, sobrenome, dataNasc, email, cpf);
                res.redirect('/clients');
            } catch (error) {
                console.error("Ocorreu um erro ao atualizar os detalhes do cliente:", error);
                res.status(500).send("Ocorreu um erro ao atualizar: " + error.message);
            }
        };
    };

    remove() {
        return async function(req, res) {
            let clientId = req.params.id;
            clientId = parseInt(clientId);
    
            if (isNaN(clientId)) {
                console.error("ID fornecido não é um número válido:", req.params.id);
                return res.status(400).send("ID fornecido não é válido");
            }
            const clienter = await selectClient.init();
            try {
                await clienter.remove(clientId);
                const updatedClients = await clienter.showTab();
                res.render('../views/clients', { clientes: updatedClients });
            } catch (error) {
                console.error("Erro ao remover cliente:", error);
                res.status(500).send("Ocorreu um erro ao remover: " + error.message);
            }
        };
    }
    
    
}

module.exports = control_clients;
