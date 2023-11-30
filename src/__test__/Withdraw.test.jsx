import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Withdraw from '../Components/Withdraw';
import { TransactionService } from '../urls';

jest.mock('../urls', () => ({
  TransactionService: {
    getAccountDetails: jest.fn(),
    withdraw: jest.fn(),
  },
}));

describe('Withdraw Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('handles withdraw successfully', async () => {
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
    TransactionService.withdraw.mockResolvedValue(mockDepositResponse);

    render(
      <MemoryRouter>
        <Withdraw />
      </MemoryRouter>
    );

    const amountInput = screen.getByPlaceholderText(/Enter amount to withdraw/i);
    fireEvent.change(amountInput, { target: { value: '100' } });

    const submitButton = screen.getByText(/Submit/i);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Amount withdrawn successfully/i)).toBeInTheDocument();
    });
  });

  test('handles withdrawn failure with invalid amount', async () => {
    const setAmountError = 'Invalid amount. Please enter a positive number.';
    TransactionService.withdraw.mockRejectedValue({
      response: {
        data: {
          error: setAmountError,
        },
      },
    });

    render(
      <MemoryRouter>
        <Withdraw />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId('submitButton');
    fireEvent.click(submitButton);

    const errorMessageElement = await screen.findByText(new RegExp(setAmountError, 'i'));

    expect(errorMessageElement).toBeInTheDocument();
  });

  test('handles withdraw failure with closed account', async () => {
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

    const errorMessage = 'Cannot withdraw. Your Account is closed.';
    TransactionService.withdraw.mockRejectedValue({ message: errorMessage });

    render(
      <MemoryRouter>
        <Withdraw />
      </MemoryRouter>
    );

    const amountInput = screen.getByPlaceholderText(/Enter amount to withdraw/i);
    fireEvent.change(amountInput, { target: { value: '100' } });

    const submitButton = screen.getByTestId('submitButton');
    fireEvent.click(submitButton);

    const errorMessageElement = await screen.findByText(new RegExp(errorMessage, 'i'));

    expect(errorMessageElement).toBeInTheDocument();
  });
});
test('displays error for invalid amount format', async () => {
  render(
    <MemoryRouter>
      <Withdraw />
    </MemoryRouter>
  );

  const amountInput = screen.getByPlaceholderText(/Enter amount to withdraw/i);
  fireEvent.change(amountInput, { target: { value: 'invalid' } });

  const submitButton = screen.getByTestId('submitButton');
  fireEvent.click(submitButton);

 
});



test('displays error when user is not logged in', async () => {
  render(
    <MemoryRouter>
      <Withdraw />
    </MemoryRouter>
  );

  const submitButton = screen.getByTestId('submitButton');
  fireEvent.click(submitButton);

  
});

