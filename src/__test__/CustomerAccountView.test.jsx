import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CustomerAccountView from '../Components/CustomerAccountView';
import { accountService } from '../urls';

jest.mock('../urls', () => ({
    accountService: {
        AccountView: jest.fn(),
        CloseAccount: jest.fn(),
    },
}));
jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'user') {
      return JSON.stringify({ id: { customerId: 1 } });
    }
    return null;
  });
  

describe('Account Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the component and displays account data', async () => {
        const mockData = {
            id: 1,
            accountNumber: '123456789',
            ifscCode: 'xyz900',
            accountType: 'savings',
            date: '2023-11-10',
            balance: '0',
            accountStatus: 'active',
        };

        accountService.AccountView.mockResolvedValue({ data: mockData });

        render(
            <MemoryRouter>
                <CustomerAccountView />
            </MemoryRouter>
        );

        await waitFor(() => {
            const table = screen.getByRole('table');
            expect(table).toBeInTheDocument();
        });

        expect(screen.getByTestId('td-accountnumber')).toBeInTheDocument();
        expect(screen.getByTestId('td-ifsccode')).toBeInTheDocument();
        expect(screen.getByTestId('td-accounttype')).toBeInTheDocument();
        expect(screen.getByTestId('td-date')).toBeInTheDocument();
        expect(screen.getByTestId('td-balance')).toBeInTheDocument();
        expect(screen.getByTestId('td-accountstatus')).toBeInTheDocument();
    });

    it('closes the account successfully and displays success toast', async () => {

        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ accountId: 123 }));
        accountService.CloseAccount.mockResolvedValueOnce({ data: 'Account closed successfully' });
        render(
          <MemoryRouter>
            <CustomerAccountView />
          </MemoryRouter>
        );
    
        await waitFor(() => {
          const closeAccountButton = screen.getByTestId('close');
          fireEvent.click(closeAccountButton);
        });
        expect(accountService.CloseAccount).toHaveBeenCalledWith(123, {});
      
      });
});    
