import { useNavigate } from "react-router-dom";
import "./styles/postCard.css";
import moment from "moment";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  console.log(post)
  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <article onClick={handleCardClick} className="post">
      <header className="post__header">
        <img
          className="post__image"
          src={post?.PostImgs[0]?.postImgUrl}
          alt=""
        />
      </header>
      <section className="post__body">
        <h3 className="post__title">{post.title}</h3>
        <p className="post__content">{post?.content?.slice(0, 200)} ...</p>
      </section>
      <section className="post__footer">
        <header className="post__avatar">
          <img
            className="post__avatar-img"
            src={post.user.profileImgUrl}
            alt=""
          />
        </header>
        <article className="post__footer-info">
          <h4 className="post__nameUser">{post.user.name}</h4>
          <p className="post__date">
            {moment(post.updatedAt).format("MM-DD-YYYY")} --{" "}
            {moment(post.updatedAt).startOf("hour").fromNow()}
          </p>
        </article>
        <div className="post__outstanding">
          {post?.outstanding ? (
            <i className="bx bxs-bookmark-star"></i>
          ) : (
            <i className="bx bx-bookmark"></i>
          )}
        </div>
      </section>
    </article>
  );
};

export default PostCard;
