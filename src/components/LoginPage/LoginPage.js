import React from 'react';
import axios from 'axios';
import { hookContext } from '../../App';
export const LoginPage = () => {
  const { setSession } = React.useContext(hookContext);
  const handleUserChange = (evt) => {
    setUsername(evt.target.value);
  }
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  }
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }
  const handleLogin = async () => {
    if (username && password) {
      try {
        const payload = {
          username: username,
          password: password
        };
        const { data } = await axios.post("https://localnewstv-todo.onrender.com/api/login", payload);
        console.log(data);
        if (data.token) {
          setSession(data.token);
          setPassword("");
          setUsername("");
          setEmail("");
          setBadCredentials(false);
        }
      } catch (ex) {
        console.log(ex);
        setSession("");
        setBadCredentials(true);
      }
    }
  }
  const handleSignUp = async (evt) => {
    if (username && password && email) {
      const payload = {
        username: username,
        password: password,
        email: email
      }
      const response = await axios.post("https://localnewstv-todo.onrender.com/api/signup", payload)
      console.log(response.data);
    }
  }

  const [signUp, setSignUp] = React.useState(false);
  const [badCredentials, setBadCredentials] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false)
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  return <div className={"loginFormCont"}>
    <form className={"formFlex"}>
      <h2>{signUp ? "Sign Up" : "Sign In"} </h2>
      <div className={"formJust"}>
        <FormLabel id={"username"} text={"Username or Email"} />
        <FormInput
          id={"username"}
          type={"text"}
          value={username}
          handler={handleUserChange}
        />
      </div>
      <div className={"formJust"}>
        <FormLabel id={"password"} text={"Password:"} />
        <FormInput
          id={"password"}
          value={password}
          type={showPass ? "text" : "password"}
          handler={handlePasswordChange}
        />
      </div>

      {signUp
        ? <div className={"formJust"}>
          <FormLabel text={"Email:"} id={"email"} />
          <FormInput
            value={email}
            id={"email"}
            type={"email"}
            handler={handleEmailChange}
          />
        </div>
        : <></>
      }
      {!signUp
        ? <FormButton text={"Login"} handler={handleLogin} />
        : <FormButton text={"Sign Up"} handler={handleSignUp} />
      }
      {badCredentials && <p>Bad Username or Password Entered</p>}
      </form>
      <p onClick={setSignUp.bind(this, !signUp)} className={"signInSignUp"}>
        {signUp ? "Have an account? Sign in here" : "Need an account? Sign up"}
      </p>
  </div>
}
const FormInput = ({ handler, value, type, id }) => (
  <input
    type={type}
    className={"formInput loginForm"}
    value={value}
    id={id}
    onChange={handler}
  />
)
const FormButton = ({ handler, text }) => (
  <input
    type={"button"}
    className={"formButton loginForm"}
    value={text}
    onClick={handler}
  />
)
const FormLabel = ({ text, id }) => {
  return (
    <label htmlFor={id} className={"loginLabel"}>{text}</label>
  )
}