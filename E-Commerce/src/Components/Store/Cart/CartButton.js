import React,{useContext} from "react";
import { Button } from "react-bootstrap";
import Context from "../Context/context";

const CartButton=(props)=>{

    const Cartctx=useContext(Context)

    let number=0;
    for(let i=0;i<Cartctx.items.length;i++){
        number+=Number(Cartctx.items[i].amount)
    }

    return(
        <Button variant="dark" onClick={props.onShow} style={{borderColor: "blue"}}>Cart({number})</Button>
    )
}

export default CartButton