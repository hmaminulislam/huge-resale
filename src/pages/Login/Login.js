import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
  const { userLogin, signInGoogle } = useContext(AuthContext);
  const [loginEmail, setLoginEmail] = useState(null)
  const {token} = useToken(loginEmail)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if(token) {
    navigate(from, { replace: true });
  }
  
  //login user handle
    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      userLogin(email, password)
      .then(result => {
        setLoginEmail(result.user.email)
        console.log(result.user)
        toast.success('Login sucessful')
      })
      .catch(error => {
        toast.error('Not Login successful')
        console.log(error);
      })
    };

    //google handle
    const googleHandle = () => {
      signInGoogle()
        .then((result) => {
          const userDetails = result.user;
          const name = userDetails.displayName;
          const email = userDetails.email;
          console.log(userDetails);
          const userInfo = {
            name,
            email,
            role: "buyer",
          };
          //user create or update database
          fetch("http://localhost:5000/users", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Sign in successful");
                setLoginEmail(result.user.email);
              }
            });
        })
        .catch((error) => {
          toast.error("Sign in not successful");
          console.log(error);
        });
    }
    return (
      <div>
        <h2 className="text-2xl font-semibold text-center mb-3">Login</h2>
        <div className="flex justify-center items-center bg-primary w-full sm:w-8/12 md:w-7/12 lg:w-4/12 mx-auto">
          <div className="w-full px-10 mt-10">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Type here"
                  className="input w-full"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Type here"
                  className="input w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <button className="btn btn-secondary w-full">Login</button>
              </div>
            </form>
            <p className="text-center text-white">
              Don't have an account?{" "}
              <Link className="text-secondary font-bold" to="/signup">
                Sign Up
              </Link>
            </p>
            <div className="divider">OR</div>
            <div onClick={googleHandle} className="flex justify-center items-center bg-lime-500 mb-10 py-2 text-white cursor-pointer">
              <FcGoogle className="text-3xl mr-4"></FcGoogle>
              <span>Google</span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;