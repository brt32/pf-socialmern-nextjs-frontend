import { useContext, useState, useEffect } from "react";
import { Avatar, Card } from "antd";
import { toast } from "react-toastify";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Meta } = Card;

const Username = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      fetchUser();
    }
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/logo.png";
    }
  };

  // const latestPost = async () => {
  //   try {
  //     const { posts } = await axios.get(`/user-posts`);
  //     console.log(posts);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1 className="pt-5 font-monospace text-light display-3">
            User Profile
          </h1>
        </div>
      </div>

      <div className="row col-md-6 offset-md-3 ml-3 pt-5">
        {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}

        <div className="pt-5 pb-5 d-flex ml-3">
          <Card
            hoverable
            bordered
            style={{ width: 400, position: "flex" }}
            cover={
              <img
                src={imageSource(user)}
                alt={user.name}
                style={{ width: 300 }}
              />
            }
          >
            <Meta title={user.name} description={user.about} />

            <p className="pt-2 text-muted">
              Joined {moment(user.createdAt).fromNow()}
            </p>
            <div className="d-flex justify-content-between">
              <span className="btn btn-sm">
                {user.followers && user.followers.length} Followers
              </span>
              <span className="btn btn-sm">
                {user.following && user.following.length} Following
              </span>
            </div>
          </Card>

          <Card hoverable style={{ width: 600 }}>
            <p className="h4 d-flex justify-content-center">Latest Post</p>
            <Meta />
          </Card>
        </div>
        <Link href="/user/dashboard">
          <a className="d-flex justify-content-center pt-5">
            <RollbackOutlined />
          </a>
        </Link>
      </div>
    </>
  );
};

export default Username;
