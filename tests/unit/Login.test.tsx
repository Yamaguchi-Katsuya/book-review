import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '../../src/pages/Login';
import { MemoryRouter } from 'react-router-dom';
import { login } from '@/api/user';

vi.mock('@/api/user', () => ({
  login: vi.fn().mockResolvedValue({ token: 'sampleToken' }), // モック関数
}));

describe('Login コンポーネント', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<Login />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/login']}>{children}</MemoryRouter>
      ),
    });
  });
  describe('表示確認', () => {
    it('ログインページが表示されている', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Login'
      );
    });

    it('Emailフィールドが表示されている', () => {
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    });

    it('Passwordフィールドが表示されている', () => {
      expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
    });

    it('Loginボタンが表示されている', () => {
      expect(
        screen.getByRole('button', { name: /Login/i })
      ).toBeInTheDocument();
    });
  });

  describe('フォーム送信', () => {
    it('正しいメールアドレスとパスワードで送信すると、ログインAPIが呼ばれる', async () => {
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/パスワード/i);
      const loginButton = screen.getByRole('button', { name: /Login/i });
      console.log(loginButton);

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
      fireEvent.click(loginButton);

      await screen.findByRole('heading', { name: /Login/i });

      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'validpassword',
      });
    });
  });
});
