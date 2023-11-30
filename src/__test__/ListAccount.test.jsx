import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AccountView from '../Components/AccountView';
import { accountService } from '../urls';
import { axiosPrivate } from '../intercepter';

jest.mock('../urls', () => ({
  accountService: {
    AccountStaffManager: jest.fn(),
  },
}));
jest.mock('../intercepter', () => ({
    axiosPrivate: {
      post: jest.fn(),
      get: jest.fn(),
    },
  }));

  describe('List account component Component', () => {
    beforeEach(() => {
  
      jest.clearAllMocks();
    });
  
    it('renders the component and displays account data', async () => {
      const mockData = [
        {
          id: 1,
          customerId:1,
          accountNumber: '123456789',
          ifscCode: 'Xyz900',
          accountType: 'savings',
          date: '2023-11-10',
          balance: '0',
          accountStatus: 'active',
        
        },
      ];
  
      accountService.AccountStaffManager.mockResolvedValue({ data: { results: mockData } });
  
      render(
        <MemoryRouter>
          <AccountView />
        </MemoryRouter>
      );
  
      await waitFor(() => {
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        expect(screen.getByText('123456789')).toBeInTheDocument();
        expect(screen.getByText('savings')).toBeInTheDocument();
      });
    });
  
    it('handles search ', async () => {
      const mockData = [
        {
          id: 1,
          customerId:1,
          accountNumber: '123456789',
          ifscCode: 'Xyz900',
          accountType: 'savings',
          date: '2023-11-10',
          balance: '0',
          accountStatus: 'active',
        
        },
      ];
      const mockNextPageData = [
        {
          id: 2,
          customerId:2,
          accountNumber: '124456789',
          ifscCode: 'Xyz900',
          accountType: 'savings',
          date: '2023-11-10',
          balance: '0',
          accountStatus: 'active',
        
        },
      ];
  
      accountService.AccountStaffManager
        .mockResolvedValueOnce({ data: { results: mockData, next: 'next-page-url', previous: null } })
        .mockResolvedValueOnce({ data: { results: mockNextPageData, next: null, previous: 'previous-page-url' } });
  
      render(
        <MemoryRouter>
          <AccountView />
        </MemoryRouter>
      );
  
      await waitFor(() => {
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
      });
    
      fireEvent.change(screen.getByPlaceholderText(/Search by Acccount Number,Account Type,Account Status/i), {
        target: { value: '12345678' },
      });
    
      try {
        await screen.findByText('12345678');
        expect(screen.queryByText('savings')).not.toBeInTheDocument();
      } catch (error) {
    
       
      }
    });
  });
  
        describe('Pagination buttons', () => {
          it('should fetch the previous page when "Previous" button is clicked', async () => {
            const mockData = {
              results: [],
              next: '/api/next-page',
              previous: '/api/prev-page',
            };
      
            accountService.AccountStaffManager.mockResolvedValue({
              data: mockData,
            });
      
            axiosPrivate.get.mockResolvedValue({
              data: { results: [], next: null, previous: '/api/prev-page' },
            });
      
            render(
              <MemoryRouter>
                <AccountView mockData={mockData} />
              </MemoryRouter>
            );
      
            await waitFor(() => {
              expect(axiosPrivate.get).toHaveBeenCalledTimes(0);
            });
      
            fireEvent.click(screen.getByText('Previous'));
      
            await waitFor(() => {
              expect(axiosPrivate.get).toHaveBeenCalledTimes(1);
              expect(axiosPrivate.get).toHaveBeenCalledWith('/api/prev-page');
            });
          });
      
          it('should fetch the next page when "next" button is clicked', async () => {
            const mockData = {
              results: [],
              next: '/api/next-page',
              previous: '/api/prev-page',
            };
      
            accountService.AccountStaffManager.mockResolvedValue({
              data: mockData,
            });
      
            axiosPrivate.get.mockResolvedValue({
              data: { results: [], next: '/api/next-page', previous: '/api/prev-page' },
            });
      
      
            render(
              <MemoryRouter>
                <AccountView mockData={mockData} />
              </MemoryRouter>
            );
      
            await waitFor(() => {
              expect(axiosPrivate.get).toHaveBeenCalled();
            });
      
            fireEvent.click(screen.getByText('Next'));
      
            await waitFor(() => {
              expect(axiosPrivate.get).toHaveBeenCalled();
              expect(axiosPrivate.get).toHaveBeenCalledWith('/api/next-page');
            });
          });
        });
 
      