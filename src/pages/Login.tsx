import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setEmailError('メールアドレスが不正です')
    } else {
      setEmailError('')
    }
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 8) {
      setPasswordError('パスワードは8文字以上で入力してください')
    } else {
      setPasswordError('')
    }
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email, password)
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-4">Login</h1>

      <div className="flex flex-col items-center justify-center mt-4 w-full">
        <form action="#" onSubmit={handleSubmit} className="grid gap-4 w-1/2 justify-center">
          <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="email" className="text-sm font-bold">Email</label>
            <input type="text" id="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} className="p-2 rounded-md border-2 border-gray-300" />
            {emailError && <p id="emailError" className="text-red-500">{emailError}</p>}
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="email" className="text-sm font-bold">パスワード</label>
            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="p-2 rounded-md border-2 border-gray-300" />
            {passwordError && <p id="passwordError" className="text-red-500">{passwordError}</p>}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
