import React from "react";
import { Card } from 'react-bootstrap'
import classes from './ExpenseDetails.module.css'

const ExpenseDetails= (props)=>{

    return(
        <Card className={classes.users}>
            <ul>
               <li key={props.id}>{props.description}-{props.category}-{props.price}
                  <button onClick={props.onEdit}  >Edit</button> 
                  <button onClick={props.onDelete}  >Delete</button> 
               </li>
            </ul>
        </Card>
    )
}

export default ExpenseDetails