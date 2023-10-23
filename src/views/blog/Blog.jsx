import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
import {useFetch} from "../../hooks/useFetch";
import MainLayout from "../../layout/MainLayout";
import useSession from "../../hooks/useSession";
const Blog = props => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const session = useSession()

  console.log(params)
  const fetchBlog = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_ENDPOINT_URL}/blogPost/${id}`)
      const data = await res.json()

      console.log(data)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {


    const { id } = params;

    fetchBlog(id)

    if (blog) {
      setBlog(blog);
      setLoading(false);
    } else {
      navigate("/404");
    }
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
        <MainLayout>
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div
                  style={{
                    marginTop: 20,
                  }}
                >
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            ></div>
          </Container>
        </div>
        </MainLayout>
    );
  }
};

export default Blog;
