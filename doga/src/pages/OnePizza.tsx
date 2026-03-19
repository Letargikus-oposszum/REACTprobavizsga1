import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient, { baseURL } from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Image} from "react-bootstrap";

const OnePizzaPage = () => {
    const [pizza, setPizzak] = useState<Pizza>();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        apiClient.get(`/pizzak/${id}`)
            .then(res => setPizzak(res.data))
            .catch(()=>toast.error("Sikertelen betöltés!"));
    },[]);

    return (
        <Container>
            <Card style={{width:"18rem"}}>
                <Card.Header>
                    <Image src={`${baseURL}/kepek/${pizza?.imageUrl}`} style={{width:"18rem", marginRight:"50px"}}/>
                </Card.Header>
                <Card.Body>
                    <Card.Title><strong>{pizza?.nev}</strong></Card.Title>
                    <Card.Text>{pizza?.leiras} {pizza?.ar} Ft</Card.Text>
                    <Button variant="primary" onClick={()=> navigate(`/editpizza/${pizza?.id}`)}>Szerkesztés</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default OnePizzaPage;