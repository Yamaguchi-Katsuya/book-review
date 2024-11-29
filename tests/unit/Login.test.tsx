import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '../../src/pages/Login';

describe('Login コンポーネント', () => {
  describe('フォームのレンダリング', () => {
    it('フォームが正しくレンダリングされる', () => {
      render(<Login />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Login'
      );
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Login/i })
      ).toBeInTheDocument();
    });
  });

  describe('メールアドレスのバリデーション', () => {
    it('無効なメールアドレスの場合、エラーメッセージが表示される', () => {
      render(<Login />);
      const emailInput = screen.getByLabelText(/Email/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      expect(screen.getByText(/メールアドレスが不正です/i)).toBeInTheDocument();
    });

    it('有効なメールアドレスを入力すると、エラーメッセージが消える', () => {
      render(<Login />);
      const emailInput = screen.getByLabelText(/Email/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      expect(screen.queryByText(/メールアドレスが不正です/i)).toBeNull();
    });
  });

  describe('パスワードのバリデーション', () => {
    it('8文字未満のパスワードの場合、エラーメッセージが表示される', () => {
      render(<Login />);
      const passwordInput = screen.getByLabelText(/パスワード/i);
      fireEvent.change(passwordInput, { target: { value: 'short' } });

      expect(
        screen.getByText(/パスワードは8文字以上で入力してください/i)
      ).toBeInTheDocument();
    });

    it('有効なパスワードを入力すると、エラーメッセージが消える', () => {
      render(<Login />);
      const passwordInput = screen.getByLabelText(/パスワード/i);
      fireEvent.change(passwordInput, { target: { value: 'short' } });
      fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

      expect(
        screen.queryByText(/パスワードは8文字以上で入力してください/i)
      ).toBeNull();
    });
  });

  describe('フォーム送信', () => {
    it('正しいメールアドレスとパスワードで送信すると、submit ハンドラが呼ばれる', () => {
      const consoleLogSpy = vi
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      render(<Login />);

      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/パスワード/i);
      const loginButton = screen.getByRole('button', { name: /Login/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
      fireEvent.click(loginButton);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        'test@example.com',
        'validpassword'
      );
      consoleLogSpy.mockRestore();
    });
  });
});
