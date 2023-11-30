import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../Components/Register';
import { customerService } from '../urls';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

jest.mock("../urls", () => ({
  customerService: {
    RegisterView: jest.fn().mockResolvedValue({}),
  },
}));

describe('Register Component', () => {
  it('renders the registration form', () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    expect(screen.getByTestId('firstName')).toBeInTheDocument();
    expect(screen.getByTestId('lastName')).toBeInTheDocument();
  });
});

describe('Handles successful registration', () => {
  it('handles successful registration with validations', async () => {
    render(
      <Router>
        <ToastContainer />
        <Register />
      </Router>
    );
    fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'abcd@gmail.com' } });
    fireEvent.change(screen.getByTestId('contact'), { target: { value: '9293232344' } });
    fireEvent.change(screen.getByTestId('address'), { target: { value: 'sdfsdfsdf' } });
    fireEvent.change(screen.getByTestId('username'), { target: { value: 'dsfsdf' } });
    fireEvent.change(screen.getByTestId('pincode'), { target: { value: '682002' } });
    fireEvent.change(screen.getByTestId('dob'), { target: { value: '2022-09-02' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'dsfjbdhfbgjkdngkl' } });
    fireEvent.change(screen.getByTestId('confirmpassword-input'), { target: { value: 'dsfjbdhfbgjkdngkl' } });

    fireEvent.click(screen.getByTestId('register-btn'));

    await waitFor(() => {
      expect(customerService.RegisterView).toHaveBeenCalledTimes(0);
    });
  });
});

describe('Validations', () => {
  it('displays email validation error', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'abcdgmail.com' } });

    await waitFor(() => {
      expect(screen.getByText(/Enter a valid email address/)).toBeInTheDocument();
    });
  });

  it('displays date of birth validation error', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const dobInput = screen.getByTestId('dob');
    fireEvent.change(dobInput, { target: { value: 'invalid-date' } });

    await waitFor(() => {
      expect(dobInput).toHaveClass('normal-input'); 
    });
  });
});
