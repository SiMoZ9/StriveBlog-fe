import React, {useEffect, useState} from "react";
import MainLayout from "../../layout/MainLayout";
import useSession from "../../hooks/useSession";
import {Container} from "react-bootstrap";

export const Me = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const session = useSession()
    console.log(session)

    const fetchMe = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_ENDPOINT_URL}/author/me`, {
                headers: {
                    "Authorization": JSON.parse(localStorage.getItem("loggedInUser"))
                }
            })
            const data = await res.json()

            setFirstName(data.author.firstName)
            setLastName(data.author.lastName)
            setEmail(data.author.email)

            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchMe()
    }, []);

    return (
        <MainLayout>
            <Container>
                <h1>Ciao {firstName} {lastName}</h1>
                <h1>Email: {email}</h1>
            </Container>
        </MainLayout>
    );
}

export default Me