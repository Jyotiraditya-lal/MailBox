import React from "react";

const Context=React.createContext({
    items:[],
    AddItems: (item)=>{},
    RemoveItems: (id)=>{},
    purchase: ()=>{}
})

export default Context