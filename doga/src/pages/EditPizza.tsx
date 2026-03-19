import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Button, Container} from "react-bootstrap";

const EditPizzaPage = () => {
    const [pizza, setPizza] = useState<Pizza>({
        nev:"",
        leiras:"",
        ar:0,
        imageUrl:""
    });

    const {id} = useParams();

    useEffect(()=>{
        apiClient.get(`/pizzak/${id}`)
            .then(res => setPizza(res.data))
            .catch(()=>toast.error("Sikertelen betöltés!"));
    },[]);

    const updatePizza = () => {
        const dto = {
            nev: pizza.nev,
            leiras: pizza.leiras,
            ar: pizza.ar,
            imageUrl: pizza.imageUrl
        }
        apiClient.put(`/pizzak/${id}`, dto)
            .then(res => {setPizza(res.data); toast.success("Sikeres szerkesztés!")})
            .catch(()=>toast.error("Sikertelen szerkesztés!"));
    }

    const deletePizza = () => {
        apiClient.delete(`/pizzak/${id}`)
            .then(()=>toast.success("Sikeres törlés!"))
            .catch(()=>toast.error("Sikertelen törlés!"));
    }

    return (
        <Container>
            Név: <input type="text" value={pizza.nev} onChange={(e)=> setPizza({...pizza, nev: e.target.value})}/><br/>
            Leírás: <input type="text" value={pizza.leiras} onChange={(e)=> setPizza({...pizza, leiras: e.target.value})}/><br/>
            Ár: <input type="number" value={pizza.ar} onChange={(e)=> setPizza({...pizza, ar: Number(e.target.value)})}/><br/>
            Kép: <input type="text" value={pizza.imageUrl} onChange={(e)=> setPizza({...pizza, imageUrl: e.target.value})}/><br/>
            <Button onClick={updatePizza}>Szerkesztés</Button>
            <Button onClick={deletePizza}>Törlés</Button>
        </Container>
    );
}

export default EditPizzaPage;