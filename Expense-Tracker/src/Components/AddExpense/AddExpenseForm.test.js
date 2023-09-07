import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import AddExpenseForm from './AddExpenseForm';
import ExpenseDetails from './ExpenseDetails';


describe('AddExpenseForm Component', ()=>{
   
    test('renders fetch API', async ()=>{
        
        window.fetch = jest.fn()
        jest.fn.mockResolvedValueOnce({
            json: async()=>[{description: '', category: '', price: ''}]
        })

        render(<AddExpenseForm />)

        const buttonElement= screen.getByRole('button')
        userEvent.click(buttonElement)

        const ExpenseDetails=screen.findAllByRole(<ExpenseDetails />)
        expect(ExpenseDetails).not.toHaveLength(0) 
    })
})