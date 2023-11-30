import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Dashboard from  '../Components/Dashboard';

describe('Dashboard Component', () => {
  it('renders the dashboard with user type admin', () => {
    localStorage.setItem('user', JSON.stringify({ userType: 'admin' }));

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    expect(screen.getByText('Register Staff and Manager')).toBeInTheDocument();
    expect(screen.getByText('Manager Details')).toBeInTheDocument();
    expect(screen.getByText('Staff Details')).toBeInTheDocument();
  });

  it('navigates to the correct dashboard when clicking on a link', () => {
    localStorage.setItem('user', JSON.stringify({ userType: 'customer' }));

    const history = createMemoryHistory();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Dashboard />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('View Account'));
    expect(history.location.pathname).toBe('/'); 
});
});