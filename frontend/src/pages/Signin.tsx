import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../backendurl";

export const Signin: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) navigate('/');
  }, []);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const req = await fetch(`${BACKEND_URL}/api/v1/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    if (!req.ok) return;
    const res = await req.json();
    localStorage.setItem('username', res.body.username);
    localStorage.setItem('token', res.body.token);
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-[#e0e0e0] text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-[#b0b0b0] mb-2">Email</label>
            <input
              type="text"
              onChange={e => setEmail(e.target.value)}
              id="username"
              className="w-full p-2 border border-[#2e2e2e] rounded bg-[#2a2a2a] text-[#e0e0e0] focus:outline-none focus:border-[#6b4eff]"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-[#b0b0b0] mb-2">Password</label>
            <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full p-2 border border-[#2e2e2e] rounded bg-[#2a2a2a] text-[#e0e0e0] focus:outline-none focus:border-[#6b4eff]"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-2 bg-[#6b4eff] text-[#e0e0e0] rounded hover:bg-[#5639e0] transition duration-200"
          >
            Login
          </button>
          <div>
            <div className="mt-2 text-center cursor-pointer underline text-blue-400" onClick={() => navigate('/signup')} >Signup</div>
          </div>

        </form>
      </div>
    </div>)
}
