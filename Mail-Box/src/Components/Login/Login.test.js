import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login component',()=>{
    test('renders login form', () => {
        render(<Login />);
        const loginHeading = screen.getByText('Login');
        expect(loginHeading).toBeInTheDocument();
        const emailInput = screen.getByLabelText(/your email/i);
        expect(emailInput).toBeInTheDocument();
        const passwordInput = screen.getByLabelText(/your password/i);
        expect(passwordInput).toBeInTheDocument();
    });
    
    test('switches between login and signup modes', () => {
        render(<Login />);
        const toggleButton = screen.getByText('Create new account');
        expect(toggleButton).toBeInTheDocument();
        fireEvent.click(toggleButton);
        const signupHeading = screen.getByText('Sign Up');
        expect(signupHeading).toBeInTheDocument();
    });
      
    test('displays "Sending Request..." when form is submitting', async () => {
        render(<Login />);
        const submitButton = screen.getByText('Login');
        fireEvent.click(submitButton);
        const loadingMessage = await screen.findByText('Sending Request...');
        expect(loadingMessage).toBeInTheDocument();
    });

})