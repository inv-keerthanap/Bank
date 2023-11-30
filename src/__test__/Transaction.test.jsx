import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CustomerTransaction from '../Components/CustomerTransaction';
import { TransactionService } from '../urls';

jest.mock('../urls', () => ({
  TransactionService: {
    CustomerTransaction: jest.fn(),
    CustomerTransactionDownload: jest.fn(),
  },
}));

jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
  if (key === 'user') {
    return JSON.stringify({ id: { customerId: 1 } });
  }
  return null;
});

describe('Transaction Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component and displays transaction data', async () => {
    const mockData = {
      id: 1,
      transactionType: 'deposit',
      amount: '1000',
      dateTime: '2023-11-17',
    };
    TransactionService.CustomerTransaction.mockResolvedValue({ data: [mockData] });

    render(
      <MemoryRouter>
        <CustomerTransaction />
      </MemoryRouter>
    );

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  });

  it('fetches transaction details and handles download details', async () => {
    const mockData = {
      id: 1,
      transactionType: 'deposit',
      amount: '1000',
      dateTime: '2023-11-17',
    };
    TransactionService.CustomerTransaction.mockResolvedValue({ data: [mockData] });
    TransactionService.CustomerTransactionDownload.mockResolvedValue({
      data: 'Transaction details downloaded successfully',
    });

    render(
      <MemoryRouter>
        <CustomerTransaction />
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
      expect(TransactionService.CustomerTransactionDownload).toHaveBeenCalledWith('1'); 
      expect(window.URL.createObjectURL).toHaveBeenCalled();
    });

    window.URL.createObjectURL = originalCreateObjectURL;
  });
});
