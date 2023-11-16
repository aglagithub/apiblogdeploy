const PostService = require('../services/post.service');
class Sockets {
  constructor(io) {
    this.io = io;
    this.postService = new PostService();

    this.socketEvents();
    //console.log('Instancia de Sockets Creada')
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      //console.log('socket connected..');
      socket.on('new-post', async ({ id }) => {
        
        try {
          //1- Buscar el post
          const post = await this.postService.findPost(id);
          const newPost = await this.postService.downloadImgPost(post);
          //2- Emitir el Post creado
          socket.broadcast.emit('render-new-post', newPost);
        } catch (error) {
          throw new Error(error);
        }
      });
    });
  }
}

module.exports = Sockets;
