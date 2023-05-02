import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../util/AuthProvider';
import './LoginPage.css';
import { Form, Button } from 'react-bootstrap';
import axios from '../util/axios';
import AdminPanel from './AdminPanel';

export default function LoginPage() {

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/login', {
        username: username,
        password: password
      })

      console.log(response);
      const accessToken = response?.headers?.authorization;
      setAuth({ username, password, accessToken });
      console.log(accessToken)
      setUsername('');
      setPassword('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Login Failed');
      }
    }


  }


  return (
    <>
    {success ? (
      <AdminPanel />
    ) : (
      <div className="login-container">
        <Form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
              type="username" 
              placeholder="Username" 
              required 
              onChange={(event) => setUsername(event.target.value)} 
              value={username}
              ref={userRef}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              required 
              onChange={(event) => setPassword(event.target.value)} 
              value={password}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
        </Form>

        {/* <Form className="login-form" onSubmit={handleTest}>
          <h2>test</h2>
          <Button variant="secondary" type="submit">
            Test
          </Button>
        </Form> */}
      </div>
    )}
    </>
  )
}
