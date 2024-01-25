const database = require('../database/connection')

class Usuario {

    // obter usuario todos os usuarios model
    async obterTodosUsuariosModel(id_logado) {
        try {

            const query = await database.select(['id_usuario', 'nome', 'sobrenome', 'email'])
                .table('usuarios').orderBy('nome', 'asc')

            return query

        } catch (err) {
            console.log('ERRO AO OBTER TODOS USUARIOS-MODEL: ' + err)
        }
    }

    // obter usuario por email
    async obterUsuarioPorEmailModel(email) {
        try {

            const query = await database.select().table('usuarios').where({ email })
            return query

        } catch (err) {
            console.log('ERRO AO OBTER USUARIO POR EMAIL-MODEL: ' + err)
        }
    }

    // criar usuario model
    async criarUsuarioModel(usuario) {
        try {
            await database.insert(usuario).table('usuarios')
            return true
        } catch (err) {
            console.log('ERRO AO CRIAR USUARIO-MODEL: ' + err)
        }
    }
}

module.exports = new Usuario()