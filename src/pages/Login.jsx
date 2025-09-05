import React, { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useLogin } from "../hooks/useLogin";
import { useResetPassword } from "../hooks/useResetPassword";
import { formError } from "../components/Errorld";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Login() {
  const { _login, error: _error, isPending } = useLogin();
  const user = useActionData();
  const [error, setError] = useState(null);
  const { resetPassword } = useResetPassword();

  const [forgetPassword, setForgetPassword] = useState(false);

  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user.email, user.password);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }

    if (user?.emailRecover) {
      resetPassword(user.emailRecover);
      setError(false);
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
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          {!forgetPassword && (
            <Form method="post" className="space-y-7 mb-7">
              <div>
                <FormInput
                  type="email"
                  label="Email address"
                  name="email"
                  lefIcon={<MdEmail />}
                />
              </div>
              <FormInput
                className="mb-2"
                type="password"
                label="Password"
                name="password"
                lefIcon={<RiLockPasswordLine />}
              />
              <div className="flex justify-between  ">
                {" "}
                <div className="flex items-center">
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
                    Remember me
                  </label>
                </div>
                <div>
                  {" "}
                  <button
                    onClick={() => setForgetPassword(!forgetPassword)}
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium transition duration-200"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              {!isPending && (
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm 
                         text-sm font-medium text-white 
                         bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-700 hover:to-purple-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         transform hover:scale-105 transition duration-200 ease-in-out"
                >
                  Login
                </button>
              )}
              {isPending && (
                <button
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm 
                         text-sm font-medium text-white 
                         bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-700 hover:to-purple-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         transform hover:scale-105 transition duration-200 ease-in-out"
                >
                  Loading...
                </button>
              )}
            </Form>
          )}
          <div className="mb-7">
            {forgetPassword && (
              <Form method="post" className="space-y-7 mb-7">
                <div>
                  <FormInput
                    type="email"
                    label="Email address"
                    name="emailRecover"
                    lefIcon={<MdEmail />}
                  />
                </div>
                <button
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm 
                         text-sm font-medium text-white 
                         bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-700 hover:to-purple-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         transform hover:scale-105 transition duration-200 ease-in-out"
                >
                  Send
                </button>
              </Form>
            )}{" "}
          </div>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500 transition duration-200"
            >
              Create one now
            </Link>
          </p>

          <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
          <div>{_error && <p style={{ color: "red" }}>{_error}</p>}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
