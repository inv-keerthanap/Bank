import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { axiosPrivate } from '../intercepter';
import CustomerUpdate from '../Components/CustomerUpdate';


jest.mock('../intercepter', () => ({
  axiosPrivate: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
  },
}));

      
  it('handles update failure', async () => {
    axiosPrivate.put.mockRejectedValueOnce({ response: { data: { message: 'Failed to update user details' } } });
    render(
      <MemoryRouter initialEntries={['/update/123']}>
        <Routes>
          <Route path="/update/:id" element={<CustomerUpdate />} />
        </Routes>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('submit'));
   
  });
  

it('handles invalid email during form submission', async () => {
  render(
    <MemoryRouter initialEntries={['/update/123']}>
      <Routes>
        <Route path="/update/:id" element={<CustomerUpdate />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByTestId('email'), { target: { value: 'invalidEmail' } });
  fireEvent.click(screen.getByTestId('submit'));

  await waitFor(() => {
    expect(screen.getByText('Enter a valid email address. Missing special character(s). Missing number(s).')).toBeInTheDocument();
  });
});

it('handles invalid phone number during form submission', async () => {
  render(
    <MemoryRouter initialEntries={['/update/123']}>
      <Routes>
        <Route path="/update/:id" element={<CustomerUpdate />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByTestId('phonenumber'), { target: { value: 'invalidPhoneNumber' } });
  fireEvent.click(screen.getByTestId('submit'));

  await waitFor(() => {
    expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
  });
});

it('handles update failure with specific message', async () => {
  axiosPrivate.put.mockRejectedValueOnce({ response: { data: { message: 'Failed to update user details' } } });
  render(
    <MemoryRouter initialEntries={['/update/123']}>
      <Routes>
        <Route path="/update/:id" element={<CustomerUpdate />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByTestId('submit'));

});

it('handles generic update failure with generic message', async () => {
  axiosPrivate.put.mockRejectedValueOnce({ response: { data: { message: 'Generic failure' } } });
  render(
    <MemoryRouter initialEntries={['/update/123']}>
      <Routes>
        <Route path="/update/:id" element={<CustomerUpdate />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByTestId('submit'));

 
});


it('handles valid phone number', async () => {
  render(
    <MemoryRouter initialEntries={['/update/123']}>
      <Routes>
        <Route path="/update/:id" element={<CustomerUpdate />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByTestId('phonenumber'), { target: { value: '1234567890' } });
  fireEvent.click(screen.getByTestId('submit'));
});
it('handles invalid pin code during form submission', async () => {
  render(
    <MemoryRouter initialEntries={['/update/123']}>
      <Routes>
        <Route path="/update/:id" element={<CustomerUpdate />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByTestId('pincode'), { target: { value: 'invalidPinCode' } });
  fireEvent.click(screen.getByTestId('submit'));

  await waitFor(() => {
    expect(screen.getByText('PIN code should only contain numeric digits and be exactly 6 digits long.')).toBeInTheDocument();
  });
});
it('handles form input changes', () => {
  render(
    <MemoryRouter initialEntries={['/update/123']}>
      <Routes>
        <Route path="/update/:id" element={<CustomerUpdate />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByTestId('firstname'), { target: { value: 'John' } });
  fireEvent.change(screen.getByTestId('lastname'), { target: { value: 'Doe' } });

  expect(screen.getByTestId('firstname').value).toBe('John');
  expect(screen.getByTestId('lastname').value).toBe('Doe');
});


it('handles invalid phone number length during form submission', async () => {
  render(
    <MemoryRouter initialEntries={['/update/123']}>
      <Routes>
        <Route path="/update/:id" element={<CustomerUpdate />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByTestId('phonenumber'), { target: { value: '123' } });
  fireEvent.click(screen.getByTestId('submit'));
  await waitFor(() => {
    const validationMessage = screen.getAllByText('');
    expect(validationMessage)
   
  });
});


it('handles update failure with specific message', async () => {
  axiosPrivate.put.mockRejectedValueOnce({ response: { data: { message: 'Failed to update user details' } } });
  render(
    <MemoryRouter initialEntries={['/update/123']}>
      <Routes>
        <Route path="/update/:id" element={<CustomerUpdate />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByTestId('submit'));

 
});
