import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../Components/Profile';
import { customerService } from '../urls';

jest.mock('../urls', () => ({
  customerService: {
    Profile: jest.fn(),
  },
}));

describe('Profile Component', () => {
  it('renders profile information', async () => {
    const mockData = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        dob: '1990-01-01',
        phoneNumber: '1234567890',
        address: '123 Main St',
      },
    ];

    customerService.Profile.mockResolvedValue({ data: mockData });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Profile Information')).toBeInTheDocument();

      // Adjust the query to match the structure of your component
      const fullNameElements = screen.getAllByText(/John Doe/i);
      expect(fullNameElements.length).toBeGreaterThan(0);

      expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
      // Add more assertions as needed for other user details
    });
  });
});
