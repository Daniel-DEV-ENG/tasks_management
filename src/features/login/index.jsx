// LoginPage.js
import React from 'react';
import { Container, Typography, Button, Link, Box } from '@mui/material';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useAuth } from '../../hook/useAuth';
import { hashPassword, comparePassword } from '../../utiltis/passwordUtils';
import { motion } from 'framer-motion';
const LoginPage = () => {
    const auth = useAuth();
    const initialValues = {
    email: '',
    password: '',
  };


  const handleSubmit = async(data) => {
    // Implement login logic here
    console.log('Form values:', data);
    try {
        const userData = await auth.login(data);
      } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
      }
  };

  return (
        
    <Box  sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh', flexDirection: 'column'}} >
    <motion.div
  initial={{ opacity: 0, y: -50 }} // Initial animation properties
  animate={{ opacity: 1, y: 0 }}    // Animation properties when component is mounted
  exit={{ opacity: 0, y: -50 }}     // Animation properties when component is unmounted
  transition={{ duration: 1.0 }}    // Animation duration
  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}
>
  <Typography variant="h4" align='center' sx={{ marginBottom: '2rem' }}>
    Login
  </Typography>
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    {({ isSubmitting }) => (
      <Form>
        <Field
          component={TextField}
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          as={motion.div}             
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <Field
          component={TextField}
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          as={motion.div}             
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem', padding: '0.5rem' }}
          disabled={isSubmitting}
          as={motion.button}          
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
        <Typography style={{ marginTop: '1rem' }}>Don't have an account? <Link href="/SignUp"> Register now!</Link> </Typography>
      </Form>
    )}
  </Formik>
</motion.div>
    </Box>
   

  );
};

export default LoginPage;
