import React, { useState, useEffect, useReducer } from "react";
import { Card } from "react-bootstrap";
import classes from './AddExpenseForm.module.css'
import ExpenseDetails from "./ExpenseDetails";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseActions } from "../Store/Redux";

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

const AddExpenseForm = () => {

  const [des, setDes] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Entertainment');
  const [themeState, themeDispatch] = useReducer(themeReducer, { darkMode: false });
  const [expenses, setExpenses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const dispatch=useDispatch()
  const activatePremium=useSelector((state)=>state.Expense.activatePremium)
  const userId=useSelector((state)=>state.Auth.UID)
  console.log(userId)

  useEffect(() => {
    fetchExpenses();
  }, []);

  const toggleDarkMode = () => {
    themeDispatch({ type: "TOGGLE_DARK_MODE" });
  };

  const DesChangeHandler = (event) => {
    setDes(event.target.value);
    dispatch(ExpenseActions.description(event.target.value))
  }

  const PriceChangeHandler = (event) => {
    setPrice(event.target.value);
    dispatch(ExpenseActions.price(event.target.value))
  }

  const CategoryChangeHandler = (event) => {
    setCategory(event.target.value);
    dispatch(ExpenseActions.category(event.target.value))
  }

  const updateExpense = async (expenseId) => {
    try {
      const response = await fetch(`https://react-http-333ab-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses/${userId}/${expenseId}.json`, {
        method: 'PUT',
        body: JSON.stringify({
          description: des,
          price: price,
          category: category
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        alert('Expense has been updated');
        
        fetchExpenses();
      } else {
        throw new Error('Could not update the expense');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const handleEditExpense = (expenseId) => {
    
    const editedExpense = expenses.find(expense => expense.id === expenseId);
    if (editedExpense) {

      setDes(editedExpense.description);
      dispatch(ExpenseActions.description(editedExpense.description))
      setPrice(editedExpense.price);
      dispatch(ExpenseActions.price(editedExpense.price))
      setCategory(editedExpense.category);
      dispatch(ExpenseActions.category(editedExpense.category))
      setIsEditing(true);
      setEditingExpenseId(expenseId);
    }
  }

  const DeleteHandler= async (id)=>{

    try{

        const response= await fetch(`https://react-http-333ab-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses/${userId}/${id}.json`,{
        method: 'DELETE'
        })

        if(!response.ok){
            throw new Error('Couldnt dete from database')
        }
        else{
          alert('Expense has been deleted')
          dispatch(ExpenseActions.description(''))
          dispatch(ExpenseActions.category(''))
          dispatch(ExpenseActions.price(0))
          fetchExpenses()
        }
    }catch (err){
        alert(err.message)
    }
}

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`https://react-http-333ab-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses/${userId}.json`);
      if (response.ok) {
        const data = await response.json();
        
        const loadedExpenses = [];
        for (const key in data) {
          
          console.log(key)
          
            loadedExpenses.push({
              id: key,
              description: data[key].description,
              price: data[key].price,
              category: data[key].category
            });
         
        }
        setExpenses(loadedExpenses);
      } else {
        throw new Error('Failed to fetch expenses');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const SubmitNewExpense=async ()=>{
    try {
      const response = await fetch(`https://react-http-333ab-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses/${userId}.json`, {
        method: 'POST',
        body: JSON.stringify({
          description: des,
          price: price,
          category: category,
          userId: userId
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        alert('Expense has been updated');
        
        fetchExpenses();
      } else {
        throw new Error('Could not store the expense');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const SubmitHandler = async (event) => {
    event.preventDefault();

    if (des.trim() === '' || price.trim() === '' || category.trim() === '') {
      alert('Please enter all fields to add a new expense.');
      return;
    }
  
    if (isEditing) {
      
      updateExpense(editingExpenseId);
    } else {
     
      SubmitNewExpense();
    }

    setPrice('');
    setCategory('Entertainment');
    setDes('');
  }

  const downloadExpensesAsCSV = () => {
    
    const convertToCSV = (expenses) => {
      const csvRows = [];
      const headers = Object.keys(expenses[0]);
      csvRows.push(headers.join(","));
      for (const expense of expenses) {
        const values = headers.map((header) => expense[header]);
        csvRows.push(values.join(","));
      }
      return csvRows.join("\n");
    };

   
    const csvContent = convertToCSV(expenses);

    
    const blob = new Blob([csvContent], { type: "text/csv" });

    
    const url = URL.createObjectURL(blob);

   
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "expenses.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  };

  return (
    <Card className={classes.input}>
      <Card.Title style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '25px' }}>Add Daily Expense</Card.Title>
      <Card.Body>
        <form onSubmit={SubmitHandler}>
          <div>
            <label htmlFor="name">Description:</label>
            <input id="name" type="text" value={des} onChange={DesChangeHandler} />
          </div>
          <div>
            <label htmlFor="number">Money Spent (in Rs):</label>
            <input id="number" type="number" value={price} onChange={PriceChangeHandler} />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select name="category" id="category" onChange={CategoryChangeHandler}>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
            </select>
          </div>
          <br />
          <div>
            <button className={classes.button} type="submit">Add Expense</button>
          </div>
        </form>
      </Card.Body>
      <br />
      <div>
      {/*activatePremium && <button className={classes.button} type="button" onClick={toggleDarkMode}>
          {themeState.darkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
        </button>}
      {activatePremium && <button className={classes.button} type="button" onClick={downloadExpensesAsCSV}>
          Download Expenses as CSV
        </button>*/
}
      </div>
      <ul>
        {expenses.map((expense) => (
          <ExpenseDetails
            key={expense.id}
            id={expense.id}
            description={expense.description}
            price={expense.price}
            category={expense.category}
            onEdit={handleEditExpense.bind(null,expense.id)}
            onDelete={DeleteHandler.bind(null,expense.id)}
          />
        ))}
      </ul>
    </Card>
  )
}

export default AddExpenseForm;
