import ParallaxBg from "../../../components/cards/ParallaxBg";
import axios from "axios";
import PostPublic from "../../../components/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";
import { RollbackOutlined } from "@ant-design/icons";

const SinglePost = ({ post }) => {
  const head = () => (
    <Head>
      <title>SOCIAL MERN - A social network by devs for devs</title>
      <meta name="description" content={post.content} />
      <meta
        property="og:description"
        content="A social network by devs for devs"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SOCIAL MERN" />
      <meta
        property="og:url"
        content={`http://brt-app.com/post/view/${post._id}`}
      />
      <meta property="og:image:secure_url" content={imageSource(post)} />
    </Head>
  );

  const imageSource = (post) => {
    if (post.image) {
      return post.image.url;
    } else {
      return "/images/default.png";
    }
  };

  return (
    <>
      {head()}
      <ParallaxBg url="/images/default.jpg" />
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-8 offset-md-2">
            <PostPublic post={post} />
          </div>
        </div>
        <Link href="/">
          <a className="d-flex justify-content-center p-5">
            <RollbackOutlined />
          </a>
        </Link>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);

  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
