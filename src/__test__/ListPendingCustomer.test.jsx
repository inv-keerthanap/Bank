import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListPendingCustomers from '../Components/ListPendingCustomers';
import { customerService } from '../urls';
import { axiosPrivate } from '../intercepter';

jest.mock('../urls', () => ({
  customerService: {
    ListPendingCustomers: jest.fn(),
    ApproveCustomer: jest.fn(),
    RejectCustomer: jest.fn(),
  },
}));

jest.mock('../intercepter', () => ({
  axiosPrivate: {
    get: jest.fn(),
  },
}));

describe('ListPendingCustomers Component', () => {
  it('renders pending customer details and handles approval', async () => {
    const mockData = [
      {
        id: 1,
        firstName: 'John',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St',
        pinCode: '12345',
        dob: '1990-01-01',
      },
    ];

    customerService.ListPendingCustomers.mockResolvedValue({
      data: { results: mockData, next: null, previous: null },
    });
    customerService.ApproveCustomer.mockResolvedValue({});
    jest.spyOn(axiosPrivate, 'get').mockResolvedValue({
      data: { results: [], next: '/api/next-page', previous: '/api/prev-page' },
    });



    render(
      <MemoryRouter>
        <ListPendingCustomers />
      </MemoryRouter>
    );

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
      expect(screen.getByText('1990-01-01')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('b1'))

await waitFor(() => {
  expect(customerService.ApproveCustomer).toHaveBeenCalledTimes(1);
});

  });

  it('renders pending customer details and handles reject', async () => {
    const mockData = [
      {
        id: 1,
        firstName: 'John',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St',
        pinCode: '12345',
        dob: '1990-01-01',
      },
    ];

    customerService.ListPendingCustomers.mockResolvedValue({
      data: { results: mockData, next: null, previous: null },
    });
    customerService.RejectCustomer.mockResolvedValue({});


    render(
      <MemoryRouter>
        <ListPendingCustomers />
      </MemoryRouter>
    );

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
      expect(screen.getByText('1990-01-01')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('b2'))

await waitFor(() => {
  expect(customerService.ApproveCustomer).toHaveBeenCalledTimes(1);
});

  });

  describe('Pagination buttons', () => {
    it('should fetch the previous page when "Previous" button is clicked', async () => {
      const mockData = {
        results: [],
        next: '/api/next-page',
        previous: '/api/prev-page',
      };

      customerService.ListPendingCustomers.mockResolvedValue({
        data: mockData,
      });

      axiosPrivate.get.mockResolvedValue({
        data: { results: [], next: null, previous: '/api/prev-page' },
      });

      render(
        <MemoryRouter>
          <ListPendingCustomers mockData={mockData} />
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

      customerService.ListPendingCustomers.mockResolvedValue({
        data: mockData,
      });

      axiosPrivate.get.mockResolvedValue({
        data: { results: [], next: '/api/next-page', previous: '/api/prev-page' },
      });


      render(
        <MemoryRouter>
          <ListPendingCustomers mockData={mockData} />
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
});
