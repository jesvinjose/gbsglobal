import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../BaseUrl";
function Login() {
  // State to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  
  const navigate=useNavigate();

   // Function to handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      // Make an Axios POST request to your backend API
      const response = await axios.post(`${BaseURL}/api/admin/adminlogin`, {
        email: email,
        password: password,
      });

      // Handle the response from the backend
      if (response.data.message === 'Valid Admin') {
        // You can save the token to local storage or handle it as needed
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard')
      } else {
        setErrorMessage(response.data.message); // Display error message from backend
        console.log(response.data.message)
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png"
          alt="Your Company"
        ></img>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
        <form class="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                value={email} // Bind input value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                value={password} // Bind input value to state
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
