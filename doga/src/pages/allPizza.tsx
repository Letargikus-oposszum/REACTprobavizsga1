import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient, { baseURL } from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Row} from "react-bootstrap";

const AllPizzaPage = () => {
    const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
    const [cart, setCart] = useState<Array<number>>(
        JSON.parse(localStorage.getItem("cart") ?? "[]")
    );
    const navigate = useNavigate();

    useEffect(()=>{
        apiClient.get("/pizzak")
            .then(res => setPizzak(res.data))
            .catch(()=>toast.error("Sikertelen betöltés!"));
    },[]);

    useEffect(()=> {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (pizzaId: number) => {
        setCart([...cart, pizzaId]);
        toast.success("Sikeresen kosárba téve!");
    }
    
    const createItem = (pizza: Pizza) => {
        return (
            <Card style={{width:"18rem"}}>
                <Card.Header>
                    <Card.Img src={`${baseURL}/kepek/${pizza.imageUrl}`}/>
                </Card.Header>
                <Card.Body>
                    <Card.Title><strong>{pizza.nev}</strong></Card.Title>
                    <Card.Text>{pizza.leiras} {pizza.ar} Ft</Card.Text>
                    <Button variant="primary" onClick={()=> navigate(`/onepizza/${pizza.id}`)}>Megtekintés</Button>
                    <Button variant="success" onClick={()=> addToCart(Number(pizza.id))}>Kosárba</Button>
                </Card.Body>
            </Card>
        )
    }

    return (
        <Container>
            <Row>
                {pizzak.map(pizza => createItem(pizza))}
            </Row>
        </Container>
    );
}

export default AllPizzaPage;