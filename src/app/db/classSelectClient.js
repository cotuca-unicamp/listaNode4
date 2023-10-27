const mssql = require('mssql');
const getPool = require("../../config/database");

class classSelectClient {

    constructor(pool) {
        this._db = pool;
    }

    static async init() {
        const pool = await getPool();
        return new classSelectClient(pool);
    }

    date(dateString) {
        const date = new Date(dateString);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    

    showTab() {
        return new Promise((resolve, reject) => {
            const sql = 'select * from node.clients order by id';

            const request = new mssql.Request(this._db);
            request.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(`Erro, não foi possível ver a lista. Erro: ${err}`);
                }

                for (let client of result.recordset) {
                    client.dataNasc = this.date(client.dataNasc);
                }

                resolve(result.recordset);
            });
        });
    }

    add(prenome, sobrenome, dataNasc, email, cpf) {
        return new Promise((resolve, reject) => {
            const sql = `Insert into node.clients (prenome, sobrenome, dataNasc, email, cpf)
                         values (@prenome, @sobrenome, Convert(date, @dataNasc, 103), @email, @cpf)`;

            const request = new mssql.Request(this._db);
            request.input('prenome', mssql.NVarChar, prenome);
            request.input('sobrenome', mssql.NVarChar, sobrenome);
            request.input('dataNasc', mssql.Date, dataNasc);
            request.input('email', mssql.NVarChar, email);
            request.input('cpf', mssql.NVarChar, cpf);

            request.query(sql, (err, result) => {
                if (err) {
                    console.log("Erro durante a execução da query:", err);
                    return reject(err);
                }

                resolve(result);
            });
        });
    }

    getClientById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM node.clients WHERE id = @id';
    
            const request = new mssql.Request(this._db);
            request.input('id', mssql.Int, id);
    
            request.query(sql, (err, result) => {
                if (err) {
                    console.log("Erro ao buscar cliente por ID:", err);
                    return reject(err);
                }
    
                if(result.recordset.length > 0) {
                    const client = result.recordset[0];
                    client.dataNasc = this.date(client.dataNasc);
                    resolve(client);
                } else {
                    reject(new Error('Cliente não encontrado'));
                }
            });
        });
    }

    edit(id, prenome, sobrenome, dataNasc, email, cpf) {
        return new Promise((resolve, reject) => {
            const sql = `update node.clients set prenome = @prenome, sobrenome = @sobrenome,
                         dataNasc = convert(date, @dataNasc, 103), email = @email, cpf = @cpf
                         where id = @id`;

            const request = new mssql.Request(this._db);
            request.input('id', mssql.Int, id);
            request.input('prenome', mssql.NVarChar, prenome);
            request.input('sobrenome', mssql.NVarChar, sobrenome);
            request.input('dataNasc', mssql.Date, dataNasc);
            request.input('email', mssql.NVarChar, email);
            request.input('cpf', mssql.NVarChar, cpf);

            request.query(sql, (err) => {
                if (err) {
                    console.log("Erro durante a edição:", err);
                    return reject(err);
                }
                resolve();
            });
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            const sql = 'Delete from node.clients where id = @id';

            const request = new mssql.Request(this._db);
            request.input('id', mssql.Int, id);

            request.query(sql, (err) => {
                if (err) {
                    console.log("Erro durante a remoção:", err);
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = classSelectClient;