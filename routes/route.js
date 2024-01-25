const express = require('express')
const router = express.Router()

const adminAuth = require('../middlewares/adminAuth')

// constroladores
const UsuarioController = require('../controllers/UsuarioController')
const PostagemController = require('../controllers/PostagemController')
const ComentarioController = require('../controllers/ComentarioController')
const MensagemController = require('../controllers/MensagemController')
const SalaChatController = require('../controllers/SalaChatController')
const GrupoController = require('../controllers/GrupoController')

// views
// Usuarios
router.get('/', UsuarioController.paginaLogin)
router.get('/admin/usuario/novo', UsuarioController.paginaNovoUsuario)
router.get('/timeline', adminAuth, UsuarioController.paginaTimeline)
router.get('/admin/usuario/todos', adminAuth, UsuarioController.paginaUsuarioTodos)

// Postagens
router.get('/admin/postagem/nova', adminAuth, PostagemController.paginaNovaPostagem)
router.get('/admin/postagem/todas', adminAuth, PostagemController.paginaPostagemTodas)
router.get('/admin/postagem/postagem/:id', adminAuth, PostagemController.paginaPostagem)


// Mensagens
router.get('/admin/mensagem/mensagem/:id_logado/:id_recetor/:emissor?', adminAuth, MensagemController.paginaMensagem)
router.get('/admin/mensagem/todas', adminAuth, MensagemController.paginaMensagemTodas)

// SalaChat
router.get('/admin/chat/:id/:num_sala', adminAuth, SalaChatController.paginaChat)
router.get('/admin/sala_chat/nova', adminAuth, SalaChatController.paginaNovaSalaChat)
router.get('/admin/sala_chat/adicionar/:num_sala', adminAuth, SalaChatController.paginaNovaAdicionar)
router.get('/admin/sala_chat/todas', adminAuth, SalaChatController.paginaSalaChatTodas)
router.get('/admin/sala_chat/participantes/:num_sala', adminAuth, SalaChatController.paginaSalaChatParticipantes)

// Grupos
router.get('/admin/grupo/novo', adminAuth, GrupoController.paginaNovoGrupo)
router.get('/admin/grupo/todos', adminAuth, GrupoController.paginaGrupoTodos)
router.get('/admin/grupo/inicio/:id', adminAuth, GrupoController.paginaGrupoInicio)
router.get('/admin/grupo/postagem/nova/:numero_grupo', adminAuth, GrupoController.paginaGrupoPostagemNova)
router.get('/admin/grupo/postagem/:id', adminAuth, GrupoController.paginaGrupoPostagem)
router.get('/admin/grupo/adicionar/:num_grupo', adminAuth, GrupoController.paginaGrupoAdicionar)
router.get('/admin/grupo/participantes/:num_grupo', adminAuth, GrupoController.paginaGrupoParticipantes)

// funcionalidades
// usuarios
router.post('/admin/usuario/criar', UsuarioController.criarUsuario)
router.post('/admin/usuario/auth', UsuarioController.authUsuario)
router.get('/logout', UsuarioController.logout)

// postagens
router.post('/admin/postagem/criar', adminAuth, PostagemController.criaNovaPostagem)

// comentarios
router.post('/admin/comentario/criar', adminAuth, ComentarioController.criaNovoComentario)

// mensagens
router.post('/admin/mensagem/criar', adminAuth, MensagemController.criaNovaMensagem)

// sala_de_chat
router.post('/admin/sala_chat/criar', adminAuth, SalaChatController.criaNovaSalaChat)
router.post('/admin/sala_chat/criar_chat', adminAuth, SalaChatController.criarNovoChat)
router.post('/admin/sala_chat/adicionar', adminAuth, SalaChatController.criarNovoParticipante)

// grupo
router.post('/admin/grupo/criar', adminAuth, GrupoController.criaNovoGrupo)
router.post('/admin/grupo/postagem/criar', adminAuth, GrupoController.criaNovaPostagemGrupo)
router.post('/admin/grupo/comentario/criar', adminAuth, GrupoController.criaNovoComentarioPostagemGrupo)
router.post('/admin/grupo/participante/criar', adminAuth, GrupoController.criaNovoParticipanteGrupo)

module.exports = router