// import React, { use } from "react";
import React, { useEffect } from "react";

import FormInput from "../components/FormInput";

import { useActionData } from "react-router-dom";
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRegister } from "../hooks/useRegister";
import { useState } from "react";
import { formError } from "../components/Errorld";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useGoogle } from "../hooks/useGoogle";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();
  const {
    googleProvider,
    isPending: isPendingGoogle,
    error: errorGoogle,
  } = useGoogle();
  useEffect(() => {
    if (user?.name && user?.email && user?.password) {
      register(user.name, user.email, user.password);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }
  }, [user]);
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (_error) {
      alert(_error);
    }
  }, [_error]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Create account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join us today and get started
          </p>
        </div>

        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 
                        border border-gray-100 dark:border-gray-700"
        >
          <Form method="post" className="space-y-6">
            <FormInput
              type="text"
              label="Name"
              name="name"
              lefIcon={<FaRegUser />}
            />

            <FormInput
              type="email"
              label="Email"
              name="email"
              lefIcon={<MdEmail />}
            />
            <FormInput
              type="password"
              label="Password"
              name="password"
              lefIcon={<RiLockPasswordLine />}
            />
            <FormInput
              type="password"
              label="Confirm password"
              name="confirmPassword"
              lefIcon={<RiLockPasswordLine />}
            />
            <div className="flex justify-center items-center">
              {" "}
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />{" "}
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                I agree to the{" "}
                <Link className="font-medium text-purple-600 hover:text-purple-500 transition duration-200">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link className="font-medium text-purple-600 hover:text-purple-500 transition duration-200">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {!isPending && (
              <button
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl 
                         shadow-sm text-sm font-medium text-white 
                         bg-gradient-to-r from-purple-600 to-blue-600 
                         hover:from-purple-700 hover:to-blue-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                         transform hover:scale-105 transition duration-200 ease-in-out
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Register
              </button>
            )}
            {isPending && (
              <button
                disabled
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl 
                         shadow-sm text-sm font-medium text-white 
                         bg-gradient-to-r from-purple-600 to-blue-600 
                         hover:from-purple-700 hover:to-blue-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                         transform hover:scale-105 transition duration-200 ease-in-out
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Loading...
              </button>
            )}
            {!isPendingGoogle && (
              <button
                onClick={googleProvider}
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl 
                         shadow-sm text-sm font-medium text-white 
                         bg-gradient-to-r from-purple-600 to-blue-600 
                         hover:from-purple-700 hover:to-blue-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                         transform hover:scale-105 transition duration-200 ease-in-out
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Google
              </button>
            )}

            {isPendingGoogle && (
              <button
                disabled
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl 
                         shadow-sm text-sm font-medium text-white 
                         bg-gradient-to-r from-purple-600 to-blue-600 
                         hover:from-purple-700 hover:to-blue-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                         transform hover:scale-105 transition duration-200 ease-in-out
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Loading...
              </button>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              If you have an account, please{" "}
              <Link
                to="/login"
                className="font-medium text-purple-600 hover:text-purple-500 transition duration-200"
              >
                Login
              </Link>
            </p>
          </Form>
          <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
          <div>{_error && <p style={{ color: "red" }}>{_error}</p>}</div>
          <div>
            {errorGoogle && <p style={{ color: "red" }}>{errorGoogle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
