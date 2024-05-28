import React from 'react'
import { useCookies } from 'react-cookie';
import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';


export default function SignUp() {

  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signup = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirm email field must match.Please check again")
      return;
    }
    const data = { email, password, username, firstName, lastName };

    const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date })
      // console.log(response);
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
      <div className="inputRegion w-2/5 py-8 flex items-center justify-center flex-col">
        <div className="font-bold mb-4 text-2xl">Sign up for free to start listening.</div>
        <TextInput
          label="What's your email "
          placeholder="Enter your email "
          className="my-5"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label="Confirm your email"
          placeholder="Enter your email again"
          className="my-5"
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <TextInput
          label="Username"
          placeholder="Enter your username"
          className="my-5"
          value={username}
          setValue={setUsername}
        />
        <PasswordInput
          label="Create Password"
          placeholder="Enter a strong password"
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex justify-between items-center space-x-5">
          <TextInput
            label="First name"
            placeholder="Enter your First name"
            className="my-5 "
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            label="Last name?"
            placeholder="Enter your Last name"
            className="my-5"
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <div className="w-full flex items-center justify-center my-8 ">
          <button className="bg-green-400 font-semibold p-3 px-10 rounded-full" onClick={(e) => {
            e.preventDefault();
            signup();
          }
          }>Sign Up</button>
        </div>
        <div className='border border-solid border-gray-300 w-full'></div>

        <div className="my-6 font-semibold text-lg">
          Already have an account?
        </div>
        <div className="border border-gray-500 py-4 text-gray-500 font-bold flex items-center justify-center w-full rounded-full">
          <Link to="/login">LOG IN INSTEAD</Link>
        </div>
      </div>
    </div>
  )
}
