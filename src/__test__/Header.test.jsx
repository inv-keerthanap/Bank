import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Components/Header';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(() => jest.fn()),
  };
});

describe('Header Component', () => {
  it('renders the header with "Logout" button', async () => {
    render(
      <MemoryRouter>
        <Header userName="TestUser" />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      console.log(screen.debug());
      const logoutButton = screen.getByTestId('logout');
      expect(logoutButton).toBeInTheDocument();
    });
  });
  

  it('handles logout when "Logout" button is clicked', async () => {
    render(
      <MemoryRouter>
        <Header userName="TestUser" />
      </MemoryRouter>
    );

    await waitFor(() => {
      const logoutButton = screen.getByTestId('logout');
      fireEvent.click(logoutButton);
      expect(require('react-router-dom').useNavigate()).toHaveBeenCalledTimes(1);
    });
  });

  it('navigates to Profile when "Profile" link is clicked', async () => {
    render(
      <MemoryRouter>
        <Header userName="TestUser" />
      </MemoryRouter>
    );

    await waitFor(() => {
      const profileLink = screen.getByTestId('profile');
      fireEvent.click(profileLink);
      expect(require('react-router-dom').useNavigate()).toHaveBeenCalledWith('/Profile');
    });
  });

  it('navigates to ChangePassword when "Change Password" link is clicked', async () => {
    render(
      <MemoryRouter>
        <Header userName="TestUser" />
      </MemoryRouter>
    );

    await waitFor(() => {
      const changePasswordLink = screen.getByTestId('change');
      fireEvent.click(changePasswordLink);
      expect(require('react-router-dom').useNavigate()).toHaveBeenCalledWith('/ChangePassword');
    });
  });
});
