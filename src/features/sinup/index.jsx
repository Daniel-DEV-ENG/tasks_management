// SignupPage.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupPage = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values) => {
    // Implement signup logic here
    console.log('Form values:', values);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  });

  return (
    <Container maxWidth="sm" sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh', flexDirection: 'column'}}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <Form>
          <Field
            component={TextField}
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Field
            component={TextField}
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Field
            component={TextField}
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Field
            component={TextField}
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '1rem',padding:'0.5rem' }}
          >
            Sign Up
          </Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default SignupPage;
