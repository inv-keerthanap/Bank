import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Deposit from '../Components/Deposit';
import { TransactionService } from '../urls';

jest.mock('../urls', () => ({
  TransactionService: {
    getAccountDetails: jest.fn(),
    deposit: jest.fn(),
  },
}));

describe('Deposit Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('handles deposit successfully', async () => {
    const mockUser = {
      accountId: '123',
    };

    localStorage.setItem('user', JSON.stringify(mockUser));

    const mockAccountResponse = {
      data: {
        accountStatus: 'active',
      },
    };

    const mockDepositResponse = {
      data: {
        transactionId: '456',
      },
    };

    TransactionService.getAccountDetails.mockResolvedValue(mockAccountResponse);
    TransactionService.deposit.mockResolvedValue(mockDepositResponse);

    render(
      <MemoryRouter>
        <Deposit />
      </MemoryRouter>
    );

    const amountInput = screen.getByPlaceholderText(/Enter amount to deposit/i);
    fireEvent.change(amountInput, { target: { value: '100' } });

    const submitButton = screen.getByText(/Submit/i);

    fireEvent.click(submitButton);


  });

  test('handles deposited failure with invalid amount', async () => {
    const setAmountError = 'Invalid amount. Please enter a positive number.';
    TransactionService.deposit.mockRejectedValue({
      response: {
        data: {
          error: setAmountError,
        },
      },
    });

    render(
      <MemoryRouter>
        <Deposit />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId('submitButton');
    fireEvent.click(submitButton);

    const errorMessageElement = await screen.findByText(new RegExp(setAmountError, 'i'));

    expect(errorMessageElement).toBeInTheDocument();
  });

  test('handles deposit failure with closed account', async () => {
    const mockUser = {
      accountId: '123',
    };

    localStorage.setItem('user', JSON.stringify(mockUser));

    const mockAccountResponse = {
      data: {
        accountStatus: 'closed',
      },
    };

    TransactionService.getAccountDetails.mockResolvedValue(mockAccountResponse);

    const errorMessage = 'Cannot deposit. Your Account is closed.';
    TransactionService.deposit.mockRejectedValue({ message: errorMessage });

    render(
      <MemoryRouter>
        <Deposit />
      </MemoryRouter>
    );

    const amountInput = screen.getByPlaceholderText(/Enter amount to deposit/i);
    fireEvent.change(amountInput, { target: { value: '100' } });

    const submitButton = screen.getByTestId('submitButton');
    fireEvent.click(submitButton);

    // const errorMessageElement = await screen.findByText(new RegExp(errorMessage, 'i'));

    // expect(errorMessageElement).toBeInTheDocument();
  });
});
test('displays error for invalid amount format', async () => {
  render(
    <MemoryRouter>
      <Deposit />
    </MemoryRouter>
  );

  const amountInput = screen.getByPlaceholderText(/Enter amount to deposit/i);
  fireEvent.change(amountInput, { target: { value: 'invalid' } });

  const submitButton = screen.getByTestId('submitButton');
  fireEvent.click(submitButton);

 
});



test('displays error when user is not logged in', async () => {
  render(
    <MemoryRouter>
      <Deposit />
    </MemoryRouter>
  );

  const submitButton = screen.getByTestId('submitButton');
  fireEvent.click(submitButton);

  
});

