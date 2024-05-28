import React from 'react'
import { useCookies } from 'react-cookie';
import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';

const Login = () => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password};
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date })
      console.log(response);
      alert("Success");
      navigate("/home");
    }
    else {
      alert("Failure");
    }
  }


  return (
    <div className='login w-full h-full flex flex-col items-center'>
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width="150" />
      </div>
      <div className="inputRegion w-1/3 py-8 flex items-center justify-center flex-col">
        <div className="font-bold mb-4">To continue, log in to Spotify.</div>
        <TextInput
          label="Email address or username"
          placeholder="Email address or username"
          className="my-5"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex items-center justify-end my-8 ">
          <button className="bg-green-400 font-semibold p-3 px-10 rounded-full" onClick={(e) => {
            e.preventDefault();
            login();
          }
          }>LOG IN</button>
        </div>
        <div className='border border-solid border-gray-300 w-full'></div>

      <div className="my-6 font-semibold text-lg">
        Don't have an account?
      </div>
      <div className="border border-gray-500 py-4 text-gray-500 font-bold flex items-center justify-center w-full rounded-full">
       <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
      </div>
      </div>
    </div>
  )
}

export default Login
