const database = require('../database/connection')

class Comentario {

    // criar novo comentario model
    async criarNovoComentarioModel(comentario) {
        await database.insert(comentario).table('comentarios')
        return true
    }

    // obter comentarios por id
    async obterComentariosPorIdModel(id_postagem) {
        const query = await database.select(['com.id_comentario', 'com.comentario', 'com.id_usuario', 'com.id_postagem', 'us.nome', 'us.sobrenome'])
            .table('comentarios as com')
            .innerJoin('usuarios as us', 'com.id_usuario', 'us.id_usuario')
            .where({ id_postagem: id_postagem })

        return query
    }
}


module.exports = new Comentario()