import React from 'react';
import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import App from '../App';


test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {

    render(<ContactForm />);

    const contact = screen.getByText(/contact form/i);

    expect(contact).toBeInTheDocument();
    expect(contact).toBeTruthy();
    expect(contact).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameField = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameField, "123");
    const errMsg = await screen.findAllByTestId('error');
    expect(errMsg).toHaveLength(1);


});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitBtn = screen.getByText(/submit/i);
    userEvent.click(submitBtn);
    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(3);


});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

    render(<ContactForm />)
    const firstNameField = screen.getByLabelText(/First Name*/i);
    const lastNameField = screen.getByLabelText(/Last Name*/i)
    userEvent.type(firstNameField, "12345");
    userEvent.type(lastNameField, "12345");
    const submitBtn = screen.getByText(/submit/i);
    userEvent.click(submitBtn);
    const errMsg = await screen.findAllByTestId('error');
    expect(errMsg).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered"', async () => {
    render(<ContactForm />);
    const emailField = screen.getByLabelText(/email*/i)
    userEvent.type(emailField, "lweller@gmail");

    const errMsgs = await screen.findByText(/email must be a valid email address/i);
    expect(errMsgs).toBeInTheDocument();


});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstNameField = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameField, "12345");

    const emailField = screen.getByLabelText(/email*/i)
    userEvent.type(emailField, "lweller@gmail.com");

    const submitBtn = screen.getByText(/submit/i);
    userEvent.click(submitBtn);

    const errMsgs = await screen.findByText(/lastName is a required field/i);
    expect(errMsgs).toBeInTheDocument();



});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstNameField = screen.getByLabelText(/First Name*/i);
    const lastNameField = screen.getByLabelText(/Last Name*/i)
    const emailField = screen.getByLabelText(/email*/i)

    
    userEvent.type(firstNameField, "larry");
    userEvent.type(lastNameField, "weller");
    userEvent.type(emailField, "lweller@email.com");

    const submitBtn = screen.getByRole("button")
    userEvent.click(submitBtn);

    await waitFor(() => {
        const firstnameDisplay = screen.queryByText("larry");
        const lastnameDisplay = screen.queryByText("weller");
        const emailnameDisplay = screen.queryByText("lweller@email.com");
        const messageDisplay = screen.queryByTestId("messageDisplay");

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailnameDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });

    


});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstNameField = screen.getByLabelText(/First Name*/i);
    const lastNameField = screen.getByLabelText(/Last Name*/i)
    const emailField = screen.getByLabelText(/email*/i)
    const messageField = screen.getByLabelText(/message/i)

    
    userEvent.type(firstNameField, "larry");
    userEvent.type(lastNameField, "weller");
    userEvent.type(emailField, "lweller@email.com");
    userEvent.type(messageField, "New Message");

    const submitBtn = screen.getByRole("button")
    userEvent.click(submitBtn);

    await waitFor(() => {
        const firstnameDisplay = screen.queryByText("larry");
        const lastnameDisplay = screen.queryByText("weller");
        const emailnameDisplay = screen.queryByText("lweller@email.com");
        const messageDisplay = screen.queryByTestId("messageDisplay");

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailnameDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    });
});
