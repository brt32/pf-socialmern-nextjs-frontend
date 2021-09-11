import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import ParallaxBg from "../components/cards/ParallaxBg";
import axios from "axios";
import PostPublic from "../components/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
});

const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);

  const [newsFeed, setNewsFeed] = useState([]);

  useEffect(() => {
    socket.on("new-post", (newPost) => {
      setNewsFeed([newPost, ...posts]);
    });
  }, []);

  const head = () => (
    <Head>
      <title>SOCIAL MERN - A social network by devs for devs</title>
      <meta name="description" content="A social network by devs for devs" />
      <meta
        property="og:description"
        content="A social network by devs for devs"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SOCIAL MERN" />
      <meta property="og:url" content="http://brt-app.com" />
      <meta
        property="og:image:secure_url"
        content="http://brt-app.com/images/default.jpg"
      />
    </Head>
  );

  const collection = newsFeed.length > 0 ? newsFeed : posts;

  return (
    <>
      {head()}
      <ParallaxBg url="/images/default.jpg" />
      <div className="container">
        <div className="row pt-5">
          {collection.map((post) => (
            <div key={post._id} className="col-md-4">
              <Link href={`/post/view/${post._id}`}>
                <a>
                  <PostPublic post={post} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get("/posts");
  // console.log(data);
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;
