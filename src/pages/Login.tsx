import { login } from '@/api/user';
import { handleApiError } from '@/handler/apiError';
import { ApiError } from '@/types/error';
import { LoginApiRequest } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const [error, setError] = useState<ApiError | null>(null);
  const [, setCookie] = useCookies();
  const navigate = useNavigate();

  const schema = z.object({
    email: z
      .string()
      .min(1, 'メールアドレスは必須です。')
      .email('メールアドレスが不正です'),
    password: z
      .string()
      .min(1, 'パスワードは必須です。')
      .min(8, 'パスワードは8文字以上で入力してください'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginForm) => {
    const request: LoginApiRequest = {
      email: data.email,
      password: data.password,
    };
    login(request)
      .then((res) => {
        setCookie('token', res.token);
        navigate('/');
      })
      .catch((err) => {
        setError(handleApiError(err));
      });
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-2 md:gap-4 lg:gap-8 w-full p-4 md:p-8 lg:p-16">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        {error && (
          <p className="text-red-500">
            コード：{error.errorCode}
            <br />
            メッセージ：{error.errorMessageJP}
          </p>
        )}
        <div className="flex flex-col items-center justify-center mt-8 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-8 w-4/5 md:w-3/5 lg:w-2/5 justify-center"
          >
            <div className="flex flex-col items-center justify-center w-full gap-3">
              <label htmlFor="email" className="text-2xl font-bold">
                Email
              </label>
              <input
                {...register('email')}
                type="text"
                id="email"
                placeholder="Email"
                className="p-2 rounded-md border-2 border-gray-300 w-full"
              />
              {errors.email && (
                <p id="emailError" className="text-red-500">
                  {errors.email.message as string}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-3">
              <label htmlFor="password" className="text-2xl font-bold">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register('password', { required: true })}
                className="p-2 rounded-md border-2 border-gray-300 w-full"
              />
              {errors.password && (
                <p id="passwordError" className="text-red-500">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md w-full text-2xl font-bold"
            >
              Login
            </button>
          </form>
        </div>
        <div className="mt-4">
          <Link className="text-blue-500 underline text-xl" to="/signup">
            新規登録
          </Link>
        </div>
      </main>
    </>
  );
}

export default Login;
