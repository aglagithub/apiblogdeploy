const catchAsync = require('../utils/catchAsync');
const { Post, postStatus } = require('../models/post.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');

exports.findAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.findAll({
    where: {
      status: postStatus.active,
    },
    attributes: {
      exclude: ['status'],
    },
    include: [
      {
        model: User,
      },
      {
        model: Comment,
        include: [
          {
            model: User,
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
