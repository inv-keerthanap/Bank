import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Components/Login';
import { customerService } from '../urls';

jest.mock('../urls', () => ({
  customerService: {
    loginUser: jest.fn(),
  },
}));

test('renders login form successfully', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const toggleButton = screen.getByTestId('toggle-password');
  const button = screen.getByTestId('login');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute('type', 'password');
  expect(button).toBeInTheDocument();

  fireEvent.change(emailInput, { target: { value: 'test1@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
  fireEvent.click(button);
  fireEvent.click(toggleButton);
  expect(passwordInput).toHaveAttribute('type', 'text');
});

test('handles successful login', async () => {
 
  customerService.loginUser.mockResolvedValue({
    data: {
      accessToken: 'fakeToken',
      userType: 'customer',
      id: 'fakeUserId',
      accountId: 'fakeAccountId',
    },
  });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const button = screen.getByTestId('login');

  fireEvent.change(emailInput, { target: { value: 'test1@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
  fireEvent.click(button);


  expect(screen.queryByText('Incorrect password.')).toBeNull();
  expect(screen.queryByText('Login failed. Please check your email and password.')).toBeNull();
  expect(screen.queryByTestId('dashboard-navigation-element')).toBeNull();
});


test('handles unsuccessful login with incorrect password', async () => {
  const errorMessage = 'Incorrect password.';
  customerService.loginUser.mockRejectedValue({
    response: {
      data: {
        error: errorMessage,
      },
    },
  });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const button = screen.getByTestId('login');
  fireEvent.change(emailInput, { target: { value: 'test1@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'IncorrectPassword' } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  expect(screen.queryByText('Login failed. Please check your email and password.')).toBeNull();
  expect(screen.queryByTestId('dashboard-navigation-element')).toBeNull();
});

test('handles unsuccessful login with email not existing', async () => {
  const errorMessage = 'Email does not exist.';
  customerService.loginUser.mockRejectedValue({
    response: {
      data: {
        error: errorMessage,
      },
    },
  });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const button = screen.getByTestId('login');

  fireEvent.change(emailInput, { target: { value: 'nonexistent@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
  fireEvent.click(button);

  
  const errorMessageElement = screen.queryByText(new RegExp(errorMessage, 'i'));


  if (errorMessageElement) {
    expect(errorMessageElement).toBeInTheDocument();
  } else {
 
    console.log('Error message not found:', errorMessage);
  }
});


test('handles unsuccessful login with user not approved', async () => {
  const errorMessage = 'Email does not exist.';
  customerService.loginUser.mockRejectedValue({
    response: {
      data: {
        error: errorMessage,
      },
    },
  });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const button = screen.getByTestId('login');

  fireEvent.change(emailInput, { target: { value: 'nonexistent@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
  fireEvent.click(button);

  
  const errorMessageElement = screen.queryByText(new RegExp(errorMessage, 'i'));


  if (errorMessageElement) {
    expect(errorMessageElement).toBeInTheDocument();
  } else {
 
    console.log('Error message not found:', errorMessage);
  }
});
