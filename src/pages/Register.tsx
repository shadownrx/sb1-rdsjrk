import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  fsairlinesId: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await authRegister(data.username, data.email, data.password, data.fsairlinesId);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error (e.g., show error message)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Nombre de usuario</label>
          <input
            id="username"
            {...register('username', { required: 'Este campo es requerido' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.username && <span className="text-red-500 text-xs italic">{errors.username.message}</span>}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo electrónico</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Este campo es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Correo electrónico inválido' } })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <span className="text-red-500 text-xs italic">{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Este campo es requerido', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <span className="text-red-500 text-xs italic">{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="fsairlinesId" className="block text-gray-700 text-sm font-bold mb-2">ID de FSAirlines</label>
          <input
            id="fsairlinesId"
            {...register('fsairlinesId', { required: 'Este campo es requerido' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.fsairlinesId && <span className="text-red-500 text-xs italic">{errors.fsairlinesId.message}</span>}
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;