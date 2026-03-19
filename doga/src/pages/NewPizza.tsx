import { useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Container } from "react-bootstrap";

const NewPizzaPage = () => {
    const [pizza, setPizza] = useState<Pizza>({
        nev:"",
        leiras:"",
        ar:0,
        imageUrl:""
    });

    const addPizza = () => {
        apiClient.post("/pizzak/", pizza)
            .then(res => {setPizza(res.data); toast.success("Sikeres hozzáadás!")})
            .catch(()=>toast.error("Sikertelen hozzáadés!"));
        
    }

    return (
        <Container>
            Név: <input type="text" onChange={(e)=> setPizza({...pizza, nev: e.target.value})}/><br/>
            Leírás: <input type="text" onChange={(e)=> setPizza({...pizza, leiras: e.target.value})}/><br/>
            Ár: <input type="number" onChange={(e)=> setPizza({...pizza, ar: Number(e.target.value)})}/><br/>
            Kép: <input type="text" onChange={(e)=> setPizza({...pizza, imageUrl: e.target.value})}/><br/>
            <Button onClick={addPizza}>Szerkesztés</Button>
        </Container>
    );
}

export default NewPizzaPage;