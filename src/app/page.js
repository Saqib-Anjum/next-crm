"use client"


// export default function Home() {

//   return (
//     <main>
//       <h1>Food App</h1>
//     </main>

//   );
// }


// export default function Home() {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <h1 className="text-4xl font-bold text-black">Hello, Tailwind in Next.js!</h1>
//     </div>
//   )
// }

'use client'; 
import Layout from './_components/Layout';
import AuthForm from './_components/AuthForm';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export default function Home() {
  const router = useRouter();
  const onSubmit = async data => {
    await axios.post('/api/auth/login', data);
    router.push('/');
  };

  return (
    <Layout>
      <AuthForm schema={loginSchema} onSubmit={onSubmit} submitText="Login">
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
            <div className="text-right">
              <a
                href="/auth/forgot-password"
                className="text-indigo-600 hover:underline text-sm"
              >
                Forgot password?
              </a>
            </div>
          </>
        )}
      </AuthForm>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <a href="/auth/signup" className="text-indigo-600 hover:underline">
          Sign Up
        </a>
      </p>
    </Layout>
  );
}

