import React,{useContext} from "react";
import CartItems from "./CartItems";
import './Cart.css'
import Context from "../Context/context";
import CartModal from "../UI/Modal";
import { Button } from "react-bootstrap";



const Cart=(props)=>{

    const Cartctx=useContext(Context)

    const RemoveHandler=(id)=>{
        Cartctx.RemoveItems(id)
    }


    let totalAmount=0
    for(let i=0;i<Cartctx.items.length;i++){
        totalAmount=totalAmount+ ((Cartctx.items[i].price)*(Cartctx.items[i].amount))
    }

    const cartitems=<ul className="cart-items">{Cartctx.items.map((product)=>
            <CartItems 
               key={product.id}
               url={product.imageUrl}
               title={product.title}
               price={product.price}
               amount={product.amount}
               onRemove={RemoveHandler.bind(null,product.id)}
            />
        )}</ul>
    return(
        <CartModal onRemove={props.onCancel}>
            <header>
                <Button variant="light" onClick={props.onCancel}>x</Button>
            </header>
            <p style={{fontFamily: "cursive", textAlign: "center"}}>Cart</p>
            {cartitems}
            <div>
                <span>Total Amount:   ${totalAmount}</span>
                <br />
                <br />
                <span>
                    <Button onClick={Cartctx.purchase}>Purchase</Button>
                </span>
            </div>
        </CartModal>
    )
}

export default Cart