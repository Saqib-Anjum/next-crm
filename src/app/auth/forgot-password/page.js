'use client';
import Layout from '../../_components/Layout';
import AuthForm from '../../_components/AuthForm';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const handleForgotPassword = async data => {
    try {
      await axios.post('/api/forgot-password', data);
      alert('If an account with that email exists, a password reset link has been sent.');
      router.push('/');
    } catch (error) {
      console.error('Forgot password error:', error.response?.data?.error || error.message);
      alert(error.response?.data?.error || 'Failed to send reset email.');
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Forgot Password</h2>
      <AuthForm schema={forgotPasswordSchema} onSubmit={handleForgotPassword} submitText="Send Reset Link">
        {({ register, errors }) => (
          <>
            <div>
              <label className="block font-semibold">Email</label>
              <input {...register('email')} className="w-full mt-1 p-2 border rounded-lg" />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
          </>
        )}
      </AuthForm>
      <p className="mt-4 text-center">
        Remember your password?
        <a href="/" className="text-indigo-600 hover:underline">
          Login
        </a>
      </p>
    </Layout>
  );
}
