 "use client"
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '../../_components/Layout';
import AuthForm from '../../_components/AuthForm';
import * as yup from 'yup';
import axios from 'axios';

const resetPasswordSchema = yup.object().shape({
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  const handleResetPassword = async data => {
    try {
      if (!token) {
        alert('No reset token found.');
        return;
      }
      await axios.post('/api/reset-password', { token, password: data.password });
      alert('Your password has been reset successfully!');
      router.push('/');
    } catch (error) {
      console.error('Reset password error:', error.response?.data?.error || error.message);
      alert(error.response?.data?.error || 'Failed to reset password.');
    }
  };

  if (!token) {
    return (
      <Layout>
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Invalid or missing reset token.</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Reset Password</h2>
      <AuthForm schema={resetPasswordSchema} onSubmit={handleResetPassword} submitText="Reset Password">
        {({ register, errors }) => (
          <>
            <div>
              <label className="block font-semibold">New Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full mt-1 p-2 border rounded-lg"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <div>
              <label className="block font-semibold">Confirm New Password</label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="w-full mt-1 p-2 border rounded-lg"
              />
              <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
            </div>
          </>
        )}
      </AuthForm>
    </Layout>
  );
}
