const database = require('../database/connection')
class Postagem {

    // criar nova postagem model
    async criarNovaPostagemModel(postagem) {

        try {

            await database.insert(postagem).table('postagens')
            return true

        } catch (err) {
            console.log('ERRO AO CRIAR NOVA POSTAGEM-MODEL: ' + err)
        }
    }

    // obter postagens model
    async obterPostagens() {
        try {

            const query = await database.select().table('postagens')
            return query

        } catch (err) {
            console.log('ERRO AO OBTER POSTAGENS-MODEL: ' + err)
        }
    }

    // obter postagens e seus usuarios
    async obterPostagensEUsuariosModel() {

        try {

            const query = await database.select(['post.id_postagem', 'post.postagem', 'us.id_usuario', 'us.nome', 'us.sobrenome', 'us.email'])
                .table('postagens as post')
                .innerJoin('usuarios as us', 'post.id_usuario', 'us.id_usuario')
                .orderBy('post.id_postagem', 'desc')

            return query

        } catch (err) {
            console.log('ERRO AO OBTER POSTAGENS E USUARIOS-MODEL: ' + err)
        }

    }

    // obter postagem por id
    async obterPostagemPorIdModel(id_postagem) {
        try {

            const query = await database.select(['post.id_postagem', 'post.postagem', 'us.id_usuario', 'us.nome', 'us.sobrenome', 'us.email'])
                .table('postagens as post')
                .innerJoin('usuarios as us', 'post.id_usuario', 'us.id_usuario')
                .where({ id_postagem: id_postagem })

            return query
        } catch (err) {
            console.log('ERRO AO OBTER POSTAGEM POR ID-MODEL: ' + err)
        }
    }
}

module.exports = new Postagem()