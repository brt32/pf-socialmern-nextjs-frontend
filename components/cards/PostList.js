import React, { useContext } from "react";
import { useRouter } from "next/router";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { imageSource } from "../../functions";

const PostList = ({ posts, handleDelete, handleLike, handleUnlike }) => {
  const [state] = useContext(UserContext);

  const router = useRouter();

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-5">
            <div className="card-header">
              {/* <Avatar size={40}>{post.postedBy.name[0]}</Avatar> */}
              <Avatar size={40} src={imageSource(post.postedBy)} />

              <span style={{ marginLeft: "0.5rem" }}>{post.postedBy.name}</span>
              <span style={{ marginLeft: "0.5rem" }}>
                ({moment(post.createdAt).fromNow()})
              </span>
            </div>
            <div className="card-body">{renderHTML(post.content)}</div>
            <div className="card-footer">
              {post.image && <PostImage url={post.image.url} />}
              <div className="d-flex pt-2">
                {post.likes.includes(state.user._id) ? (
                  <HeartFilled
                    onClick={() => handleUnlike(post._id)}
                    className="text-danger pt-2 h5"
                  />
                ) : (
                  <HeartOutlined
                    onClick={() => handleLike(post._id)}
                    className="text-danger pt-2 h5"
                  />
                )}

                <div className="pt-2 pl-3 p-1" style={{ marginRight: "1rem" }}>
                  {post.likes.length} likes
                </div>
                <CommentOutlined className="text-danger pt-2 h5 pl-5" />
                <div className="pt-2 pl-3 p-1"> 2 comments</div>

                {state && state.user && state.user._id === post.postedBy._id && (
                  <>
                    <EditOutlined
                      onClick={() => router.push(`/user/post/${post._id}`)}
                      className="text-danger pt-2 h5 pl-5 mx-auto"
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(post)}
                      className="text-danger pt-2 h5 pl-5"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
