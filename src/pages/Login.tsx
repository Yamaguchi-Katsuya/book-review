function Login() {
  return (
    <>
      <h1>Login</h1>

      <div>
        <form action="#">
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
