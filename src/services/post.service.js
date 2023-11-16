const { ref, getDownloadURL } = require('firebase/storage');
const PostImg = require('../models/postImg.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const storage = require('../utils/firebase');

class PostService {
  async findPost(id) {
    //code..
    // buscar un post dado un id, incluir UserId, status
    //adjuntar el modelo de User,, con la info de id, name, profileImgUrl, description,
    // adjuntar el modelo de PostImg
    try {
      const post = await Post.findOne({
        where: {
          id,
          status: 'active',
        },
        attributes: {
          exclude: ['userId', 'status'],
        },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'profileImgUrl', 'description'],
          },
          {
            model: PostImg,
          },
        ],
      });
      if (!post) {
        throw new AppError(`Post with id: ${id} not found`, 404);
      }
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  async downloadImgPost(post) {
    // resolver todas las url encontradas
    try {
      const imgRefUserProfile = ref(storage, post.user.profileImgUrl);
      const urlProfileUser = await getDownloadURL(imgRefUserProfile);
      post.user.profileImgUrl = urlProfileUser;

      const PostImgsPromises = post.postimgs.map(async (postImg) => {
        const imgRef = ref(storage, postImg.postImgUrl);
        const url = await getDownloadURL(imgRef);
        postImg.postImgUrl = url;
        return postImg;
      });

      await Promise.all(PostImgsPromises);
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = PostService;
