
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your AidConnect account"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
