import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListTransaction from '../Components/ListTransaction';
import { TransactionService } from '../urls';
import { axiosPrivate } from '../intercepter';

const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('../urls', () => ({
  TransactionService: {
    Transactions: jest.fn(),
    TransactionDownload: jest.fn(),
  },
}));

jest.mock('../intercepter', () => ({
  axiosPrivate: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

afterAll(() => {

  errorSpy.mockRestore();
});



describe('ListTransaction Component', () => {
  it('renders transaction details and handles search', async () => {
    const mockData = [
      {
        id: 1,
        account: {
          firstName: 'John',
          accountNumber: '1234567890',
        },
        transactionType: 'Deposit',
        amount: 500,
        dateTime: '2023-01-01T12:00:00Z',
      },
    
    ];

    TransactionService.Transactions.mockResolvedValue({ data: mockData });

    render(
      <MemoryRouter>
        <ListTransaction />
      </MemoryRouter>
    );

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();
      expect(screen.getByText('Deposit')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
      expect(screen.getByText('2023-01-01T12:00:00Z')).toBeInTheDocument();
    });

    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText("Search by Transaction Type, Amount, Transaction Date"), {
        target: { value: 'deposit' },
      });
    });
    

    await waitFor(() => {
      expect(screen.getByText('Deposit')).toBeInTheDocument();
      expect(screen.queryByText('Withdrawal')).not.toBeInTheDocument();
    });
  });

  it('fetches transaction details and handles download details', async () => {
    const mockData = {
      id: 1,
      transactionType: 'deposit',
      amount: '1000',
      dateTime: '2023-11-17',
    };
    TransactionService.Transactions.mockResolvedValue({ data: [mockData] });
    TransactionService.TransactionDownload.mockResolvedValue({
      data: 'Transaction details downloaded successfully',
    });
  
    render(
      <MemoryRouter>
        <ListTransaction />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  
    const downloadButton = screen.getByTestId('download');
    expect(downloadButton).toBeInTheDocument();
    const originalCreateObjectURL = window.URL.createObjectURL;
    window.URL.createObjectURL = jest.fn(() => 'fake-url');
  
    fireEvent.click(downloadButton);
  
    await waitFor(() => {
      expect(TransactionService.TransactionDownload).toHaveBeenCalledWith(); 
      expect(window.URL.createObjectURL).toHaveBeenCalled();
    });
  
    window.URL.createObjectURL = originalCreateObjectURL;
  });
});
  