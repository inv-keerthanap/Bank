import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Components/Header';
import { BrowserRouter as Router } from 'react-router-dom';


const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: key => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
describe('Header Component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });
  it('renders header with username', () => {
    const mockUserName = 'John Doe';
    render(
      <Router>
        <Header userName={mockUserName} />
      </Router>
    );
    expect(screen.getByText(mockUserName)).toBeInTheDocument();
  });
  it('displays dropdown menu on click', () => {
    const mockUserName = 'John Doe';
    render(
      <Router>
        <Header userName={mockUserName} />
      </Router>
    );
    const dropdownMenu = screen.queryByRole('menu');
    const dropdownToggle = screen.getByTestId('dropdown-toggle');
    fireEvent.click(dropdownToggle);

  });
  it('handles logout correctly', () => {
    const mockUserName = 'John Doe';
    render(
      <Router>
        <Header userName={mockUserName} />
      </Router>
    );
    const dropdownToggle = screen.getByTestId('dropdown-toggle');
    fireEvent.click(dropdownToggle);
    const logoutButton = screen.getByTestId('logout');
    fireEvent.click(logoutButton);
  });
});
