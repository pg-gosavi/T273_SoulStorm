
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Join AidConnect and start making a difference"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
