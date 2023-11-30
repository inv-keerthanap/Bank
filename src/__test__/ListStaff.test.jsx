import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListStaff from '../Components/ListStaff';
import { customerService } from '../urls';
import { axiosPrivate } from '../intercepter';

jest.mock('../urls', () => ({
    customerService: {
      ListStaff: jest.fn(),  
    },
  }));
  

jest.mock('../intercepter', () => ({
  axiosPrivate: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('ListStaff Component', () => {
  beforeEach(() => {

    jest.clearAllMocks();
  });

  it('renders the component and displays ListStaff data', async () => {
    const mockData = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St',
        pinCode: '12345',
        dob: '1990-01-01',
      },
    ];

    customerService.ListStaff.mockResolvedValue({ data: { results: mockData } });

    render(
      <MemoryRouter>
        <ListStaff />
      </MemoryRouter>
    );

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });
  });

  it('handles search and pagination', async () => {
    const mockData = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St',
        pinCode: '12345',
        dob: '1990-01-01',
      },
    ];

    const mockNextPageData = [
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '9876543210',
        address: '456 Second St',
        pinCode: '54321',
        dob: '1995-02-15',
      },
    ];


        customerService.ListStaff
        .mockResolvedValueOnce({ data: { results: mockData, next: 'next-page-url', previous: null } })
        .mockResolvedValueOnce({ data: { results: mockNextPageData, next: null, previous: 'previous-page-url' } });

    render(
      <MemoryRouter>
        <ListStaff />
      </MemoryRouter>
    );

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Search by First Name, Email, Phone Number/), {
      target: { value: 'John' },
    });
    await waitFor(() => {

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
    });
  });
});
describe('Pagination buttons', () => {
  it('should fetch the previous page when "Previous" button is clicked', async () => {
    const mockData = {
      results: [],
      next: '/api/next-page',
      previous: '/api/prev-page',
    };

    customerService.ListStaff.mockResolvedValue({
      data: mockData,
    });

    axiosPrivate.get.mockResolvedValue({
      data: { results: [], next: null, previous: '/api/prev-page' },
    });

    render(
      <MemoryRouter>
        <ListStaff mockData={mockData} />
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

    customerService.ListStaff.mockResolvedValue({
      data: mockData,
    });

    axiosPrivate.get.mockResolvedValue({
      data: { results: [], next: '/api/next-page', previous: '/api/prev-page' },
    });


    render(
      <MemoryRouter>
        <ListStaff mockData={mockData} />
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

