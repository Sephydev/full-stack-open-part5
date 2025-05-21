import Notification from './Notification'

const LoginForm = ({ handleLogin, credentials, setCredentials, message }) => {
  return (
    <div>
      <Notification message={message} />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} data-testid='login-form'>
        <div>
          username
          <input
            type='text'
            value={credentials.username}
            name='Username'
            onChange={({ target }) => setCredentials({ ...credentials, username: target.value })}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={credentials.password}
            name='Password'
            onChange={({ target }) => setCredentials({ ...credentials, password: target.value })}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm