import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
export default function AuthForm({ schema, onSubmit, submitText, children }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: yupResolver(schema) });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {children({ register, errors })}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        {submitText}
      </button>
    </form>
  );
}