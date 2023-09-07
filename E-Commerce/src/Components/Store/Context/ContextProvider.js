import React,{useState,useContext, useEffect} from "react";
import Context from "./context";
import LoginContext from "../../Login/Context/login-context";


const ContextProvider=  (props)=>{

    const ctx=useContext(LoginContext)
    

    const [ItemState,setItemState]=useState([])

    const uId = ctx.UID

    

    fetch(`https://react-http-333ab-default-rtdb.asia-southeast1.firebasedatabase.app/Cart/${uId}.json`).then((res)=>{ 
        
      const data= res.json();
      console.log(data) 

      const LoadedItems=[]

      for( const key in data){
        LoadedItems.push({
          Tokenid: key,
          title: data[key].title,
          amount: data[key].amount,
          price: data[key].price,
          id: data[key].id,
          imageUrl: data[key].imageUrl
        })
      }
      console.log(LoadedItems)
      if(LoadedItems.length>0){
      setItemState([...LoadedItems])}
    })
    

    const AddItemHandler= async (item)=>{

        const itemID=ItemState.map(itm=>itm.id)



        

        if(ItemState.length>0){

            if(itemID.includes(item.id)){

              for(let i=0;i<ItemState.length;i++){
                 if(ItemState[i].id===item.id){
                    ItemState[i].amount++
                    break;
                   }   
                }
            }
            else{
                setItemState([...ItemState,item])
            }
        }
        else{
            setItemState([...ItemState,item])
        }

        fetch(`https://react-http-333ab-default-rtdb.asia-southeast1.firebasedatabase.app/Cart/${uId}/${item.id}.json`,{
            method: 'POST',
            body: JSON.stringify(item)
        })

        
        
         
    }

    const RemoveItemHandler=(id)=>{
        for(let i=0;i<ItemState.length;i++){
            if(ItemState[i].id===id){
             if(ItemState[i].amount>1){
                 ItemState[i].amount--
                 setItemState([...ItemState])
             }
             else if(ItemState[i].amount===1){
                 ItemState.splice(i,1)
                 setItemState([...ItemState])
             }
            }
         }
         fetch(`https://react-http-333ab-default-rtdb.asia-southeast1.firebasedatabase.app/Cart/${uId}/${id}.json`,{
            method: 'DELETE',
        })
    }

    const PurchaseHandler=()=>{
        const message='Purchase successful'
        alert(message)
        setItemState([])
    }

    const CartContext={
        items:ItemState,
        AddItems: AddItemHandler,
        RemoveItems: RemoveItemHandler,
        purchase: PurchaseHandler
    }

    return(
        <Context.Provider value={CartContext}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider