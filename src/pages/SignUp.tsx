import { iconUpload, signUp } from '@/api/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ApiError } from '@/types/error';
import { useState } from 'react';
import { IconUploadApiRequest } from '@/types/user';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { compressImage } from '@/util/compressor';
import { handleApiError } from '@/handler/apiError';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  icon: File;
}

function SignUp() {
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [icon, setIcon] = useState<File | null>(null);
  const [iconError, setIconError] = useState<string | null>(null);
  const [, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const schema = z
    .object({
      name: z
        .string()
        .min(1, 'ユーザー名は必須です。')
        .max(20, 'ユーザー名は20文字以内で入力してください'),
      email: z
        .string()
        .min(1, 'メールアドレスは必須です。')
        .email('メールアドレスが不正です'),
      password: z
        .string()
        .min(1, 'パスワードは必須です。')
        .min(8, 'パスワードは8文字以上で入力してください'),
      passwordConfirm: z
        .string()
        .min(1, 'パスワード確認は必須です。')
        .min(8, 'パスワード確認は8文字以上で入力してください'),
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
      if (password !== passwordConfirm) {
        ctx.addIssue({
          path: ['passwordConfirm'],
          code: 'custom',
          message: 'パスワードが一致しません',
        });
      }
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(schema),
  });

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setIconError('アイコンは5MB以下である必要があります。');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setIconError('アイコンはJPEGまたはPNG形式である必要があります。');
        return;
      }
      setIcon(file);
      setIconError(null); // エラーをクリア
    }
  };

  const onSubmit = async (data: SignUpForm) => {
    if (!icon) {
      setIconError('アイコンは必須です。');
      return;
    }

    try {
      // ユーザー登録
      const signUpResponse = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setSuccess(true);
      setCookie('token', signUpResponse.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      // アイコンのアップロード
      const compressedIcon = await compressImage(icon);
      const iconUploadRequest: IconUploadApiRequest = {
        icon: compressedIcon as File,
      };

      await iconUpload(iconUploadRequest, signUpResponse.token);
      navigate('/');
    } catch (err) {
      setSuccess(false);
      setError(handleApiError(err));
    }
  };

  return (
    <main className="flex flex-col items-center justify-center gap-2 md:gap-4 lg:gap-8 w-full p-4 md:p-8 lg:p-16">
      <h1 className="text-4xl font-bold text-center">新規登録</h1>

      {error && (
        <p className="text-red-500">
          コード：{error.errorCode}
          <br />
          メッセージ：{error.errorMessageJP}
        </p>
      )}
      {success && (
        <p className="text-green-500">
          新規登録が完了しました。アイコンのアップロードを開始します。
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-8 w-4/5 md:w-3/5 lg:w-2/5 justify-center"
      >
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <label htmlFor="name" className="text-2xl font-bold">
            ユーザー名
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder="ユーザー名"
            className="p-2 rounded-md border-2 border-gray-300 w-full"
          />
          {errors.name && (
            <p id="nameError" className="text-red-500">
              {errors.name.message as string}
            </p>
          )}
        </div>

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
            {...register('password')}
            type="password"
            id="password"
            placeholder="Password"
            className="p-2 rounded-md border-2 border-gray-300 w-full"
          />
          {errors.password && (
            <p id="passwordError" className="text-red-500">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-3">
          <label htmlFor="passwordConfirm" className="text-2xl font-bold">
            パスワード確認
          </label>
          <input
            {...register('passwordConfirm')}
            type="password"
            id="passwordConfirm"
            placeholder="Password"
            className="p-2 rounded-md border-2 border-gray-300 w-full"
          />
          {errors.passwordConfirm && (
            <p id="passwordConfirmError" className="text-red-500">
              {errors.passwordConfirm.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-3">
          <label htmlFor="icon" className="text-2xl font-bold">
            アイコン
          </label>
          <input
            type="file"
            id="icon"
            onChange={handleIconChange}
            className="p-2 rounded-md border-2 border-gray-300 w-full"
          />
          {iconError && (
            <p id="iconError" className="text-red-500">
              {iconError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full text-2xl font-bold"
        >
          新規登録
        </button>
      </form>

      <Link className="text-blue-500 underline text-xl" to="/login">
        ログイン
      </Link>
    </main>
  );
}

export default SignUp;
