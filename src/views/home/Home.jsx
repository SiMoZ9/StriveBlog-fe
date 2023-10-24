import React, {useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import useSession from "../../hooks/useSession";
import MainLayout from "../../layout/MainLayout";

const Home = props => {

    const session = useSession()
    console.log(session)


    const [name, setName] = useState({})

    const fetchUser = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_ENDPOINT_URL}/author/me`, {
                headers: {
                    "Authorization": JSON.parse(localStorage.getItem("loggedInUser"))
                }
            })
            const data = await res.json()

            setName({firstName: data.author.firstName, lastName: data.author.lastName})

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (session) fetchUser()
    }, []);

    console.log(name)

  return (
      <MainLayout>
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog {name.firstName} {name.lastName}!</h1>
      <BlogList />
    </Container>
      </MainLayout>
  );
};

export default Home;
