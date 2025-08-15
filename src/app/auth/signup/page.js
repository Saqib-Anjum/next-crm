'use client';
import Layout from '../../_components/Layout';
import AuthForm from '../../_components/AuthForm';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const signupSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

export default function SignupPage() {
  const router = useRouter();
  const handleSignup = async data => {
    try {
      await axios.post('/api/signup', data);
      alert('Account created successfully! Please login.');
      router.push('/');
    } catch (error) {
      console.error('Signup error:', error.response?.data?.error || error.message);
      alert(error.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Sign Up</h2>
      <AuthForm schema={signupSchema} onSubmit={handleSignup} submitText="Sign Up">
        {({ register, errors }) => (
          <>
            <div>
              <label className="block font-semibold">Email</label>
              <input {...register('email')} className="w-full mt-1 p-2 border rounded-lg" />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div>
              <label className="block font-semibold">Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full mt-1 p-2 border rounded-lg"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <div>
              <label className="block font-semibold">Confirm Password</label>
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
      <p className="mt-4 text-center">
        Already have an account?
        <a href="/" className="text-indigo-600 hover:underline">
          Login
        </a>
      </p>
    </Layout>
  );
}
