import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Pizza } from "../types/Pizza";
import { Button } from "react-bootstrap";

const CartPage = () => {
    const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
    const [cart, setCart] = useState<Array<number>>(
        JSON.parse(localStorage.getItem("cart") ?? "[]")
    );
    const [allPrice , setAllPrice] = useState<number>(0);

    useEffect(()=>{
        apiClient.get("/pizzak")
            .then(res => setPizzak(res.data))
            .catch(()=>toast.error("Sikertelen betöltés!"));
    },[]);

    useEffect(()=> {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const emptyCart = () => {
        setCart([]);
    }

    const removeFromCart = (pizzaId : number) => {
        setCart(cart.filter((v,i)=>i !== pizzaId));
    }
    
    return (
        <>
            <table>
                <tr>
                    <th>Név</th>
                    <th>Ár</th>
                    <th>Tevékenység</th>
                </tr>
                {cart.length > 0?(
                <>
                    {cart.map((id, index) => {
                        const pizza = pizzak.find(pizza => pizza.id == id);
                        //setAllPrice(prev =>  prev += Number(pizza?.ar)); hook-on belül hook (cart.reduce)
                        return(
                            <tr>
                                <td>{pizza?.nev}</td>
                                <td>{pizza?.ar}</td>
                                <td>
                                    <Button variant="danger"onClick={()=>removeFromCart(Number(pizza?.id))}>Törlés</Button>
                                </td>
                            </tr>       
                        )                     
                    })}
                    <tr>
                        <td>Összes</td>
                        <td></td>
                        <td>{allPrice}</td>
                    </tr>
                </>
                ):(
                <>
                    <h1>A kosár üres!</h1>
                </>
            )}
            </table>
            <Button variant="danger" onClick={emptyCart}>Ürítés</Button>
        </>
    );
}

export default CartPage;