import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ManagerStaffRegister from '../Components/ManagerStaffRegister'; 
import { customerService } from '../urls';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
jest.mock('../urls', () => ({
  customerService: jest.fn(),
}));

test("text renders successfully", () => {
  render(
    <MemoryRouter>
      <ManagerStaffRegister /> 
    </MemoryRouter>
  );

  const firstName = screen.getByTestId('firstName');
  const LastName = screen.getByTestId('lastName');
  const email = screen.getByTestId('email');
  const phoneNumber = screen.getByTestId('phoneNumber');
  const UserName = screen.getByTestId('username');
  const Address = screen.getByTestId('address');
  const Pincode = screen.getByTestId('pinCode');
  const dob = screen.getByTestId('dob');
  const Password = screen.getByTestId('password-input');
  const cpassword = screen.getByTestId('confirmpassword-input');
  const approvalStatusDropdown = screen.getByTestId('approvalStatus');
  const userTypeDropdown = screen.getByTestId('userType');
  const register = screen.getByTestId('register');

  expect(firstName).toBeInTheDocument();
  expect(LastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(phoneNumber).toBeInTheDocument();
  expect(UserName).toBeInTheDocument();
  expect(Address).toBeInTheDocument();
  expect(Pincode).toBeInTheDocument();
  expect(dob).toBeInTheDocument();
  expect(Password).toBeInTheDocument();
  expect(cpassword).toBeInTheDocument();
  expect(approvalStatusDropdown).toBeInTheDocument();
  expect(userTypeDropdown).toBeInTheDocument();
  expect(register).toBeInTheDocument();
  fireEvent.change(firstName, { target: { value: 'user1' } });
  fireEvent.change(LastName, { target: { value: 'PP' } });
  fireEvent.change(email, { target: { value: 'user@gmail.com' } });
  fireEvent.change(phoneNumber, { target: { value: '8590923292' } });
  fireEvent.change(UserName, { target: { value: 'user' } });
  fireEvent.change(Address, { target: { value: 'xxx' } });
  fireEvent.change(Pincode, { target: { value: '673012' } });
  fireEvent.change(dob, { target: { value: '2000-10-04' } });
  fireEvent.change(Password, { target: { value: 'User@2023' } });
  fireEvent.change(cpassword, { target: { value: '2023' } });
  fireEvent.change(approvalStatusDropdown, { target: { value: 'approved' } });
  fireEvent.change(userTypeDropdown, { target: { value: 'manager' } });

  fireEvent.click(register);
  

});
describe('Validations', () => {
  it('displays email validation error', async () => {
    render(
      <Router>
        <ManagerStaffRegister />
      </Router>
    );
    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'abcdgmail.com' } });

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address./)).toBeInTheDocument();
    });
  });

  it('displays date of birth validation error', async () => {
    render(
      <Router>
        <ManagerStaffRegister />
      </Router>
    );
    const dobInput = screen.getByTestId('dob');
    fireEvent.change(dobInput, { target: { value: 'invalid-date' } });

    await waitFor(() => {
      expect(dobInput).toHaveClass('normal-input'); 
    });
  });
});

// test('displays success toast on valid form submission', async () => {
//   render(
//     <Router>
//         <ToastContainer />
//       <ManagerStaffRegister />
//     </Router>
//   );

 
//   fireEvent.click(screen.getByTestId('register'));

//   await waitFor(() => {
//     expect(screen.getByText('Registration successful!')).toBeInTheDocument();
//   });

//   expect(customerService.RegisterView).toHaveBeenCalledWith({
//     firstName: 'user1',
//     lastName: 'PP',
//     email: 'user@gmail.com',
//     phoneNumber: '8590923292',
//     address: 'xxx',
//     username: 'user',
//     pinCode: '673012',
//     dob: '2000-10-04',
//     userType: 'manager',
//     password: 'User@2023',
//     approvalStatus: 'approved',
//   });
// });

// test('displays error toast on invalid form submission', async () => {
//   render(
//     <Router>
//       <ManagerStaffRegister />
//     </Router>
//   );

//   fireEvent.click(screen.getByTestId('register'));

//   await waitFor(() => {
//     expect(screen.getByText(/Please fill in all fields correctly/i)).toBeInTheDocument();
//   });

//   expect(customerService.RegisterView).not.toHaveBeenCalled();
// });

// test('displays error toast on API error', async () => {
//   render(
//     <Router>
//       <ManagerStaffRegister />
//     </Router>
//   );

//   customerService.RegisterView.mockRejectedValue({ response: { status: 500, data: 'Internal Server Error' } });

//   fireEvent.click(screen.getByTestId('register'));

//   await waitFor(() => {
//     expect(screen.getByText('Registration failed. Please try again later.')).toBeInTheDocument();
//   });

//   expect(customerService.RegisterView).toHaveBeenCalledWith({
//     firstName: 'user1',
//     lastName: 'PP',
//     email: 'user@gmail.com',
//     phoneNumber: '8590923292',
//     address: 'xxx',
//     username: 'user',
//     pinCode: '673012',
//     dob: '2000-10-04',
//     userType: 'manager',
//     password: 'User@2023',
//     approvalStatus: 'approved',
//   });
// });



// test('displays success toast on valid form submission', async () => {
//   render(
//     <Router>
//       <ToastContainer />
//       <ManagerStaffRegister />
//     </Router>
//   );

//   fireEvent.click(screen.getByTestId('register'));

//   await waitFor(() => {
//     expect(screen.getByText(/Registration successful/i)).toBeInTheDocument();
//   });

//   expect(customerService.RegisterView).toHaveBeenCalledWith({
//     firstName: 'user1',
//     lastName: 'PP',
//     email: 'user@gmail.com',
//     phoneNumber: '8590923292',
//     address: 'xxx',
//     username: 'user',
//     pinCode: '673012',
//     dob: '2000-10-04',
//     userType: 'manager',
//     password: 'User@2023',
//     approvalStatus: 'approved',
//   });
// });



