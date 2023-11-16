const catchAsync = require('../utils/catchAsync');

const { db } = require('./../database/config');

const { Post, postStatus } = require('../models/post.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');

exports.findAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.findAll({
    where: {
      status: postStatus.active,
    },
    attributes: {
      exclude: ['status', 'userId'],
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'profileImgUrl', 'description'],
      },
      {
        model: Comment,
        attributes: {
          exclude: ['status', 'postId', 'userId'],
        },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'profileImgUrl', 'description'],
          },
        ],
      },
    ],
    order: [['createdAt', 'DESC']],
    limit: 10,
  });

  return res.status(200).json({
    status: 'success',
    results: posts.length,
    posts,
  });
});

exports.findMyPosts = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;

  const posts = await Post.findAll({
    where: {
      status: postStatus.active,
      userId: id,
    },
    include: [
      {
        model: Comment,
        attributes: {
          exclude: ['status', 'postId', 'userId'],
        },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'profileImgUrl', 'description'],
          },
        ],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    results: posts.length,
    posts,
  });
});

exports.findUserPosts = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  //TODO: esto esta mal, esto es vulverable a SQL injection, CORREGIR
  const query = `SELECT id, title, content, "createdAt", "updatedAt"  FROM posts WHERE "userId" = ${id} AND status = 'active'`;

  const [rows, fields] = await db.query(query);

  return res.status(200).json({
    status: 'success',
    results: fields.rowCount,
    posts: rows,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;
  const { id: userId } = req.sessionUser;

  const post = await Post.create({ title, content, userId });

  return res.status(201).json({
    status: 'success',
    message: 'the post has been created!',
    post,
  });
});

exports.findOnePost = catchAsync(async (req, res, next) => {
  const { post } = req;

  return res.status(200).json({
    status: 'sucess',
    post,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const { post } = req;
  const { title, content } = req.body;

  await post.update({ title, content });

  return res.status(200).json({
    status: 'success',
    message: 'the post has been updated',
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const { post } = req;

  await post.update({ status: postStatus.disabled });

  return res.status(200).json({
    status: 'success',
    message: 'the post has been deleted!',
  });
});
