import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { setToken, navigate, backendUrl } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const endpoint = currentState === "Sign Up" ? "register" : "login";
      const payload =
        currentState === "Sign Up"
          ? {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            }
          : { email: formData.email, password: formData.password };
      const response = await axios.post(
        `${backendUrl}/api/user/${endpoint}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        setToken(response.data.token, response.data.userId);
        toast.success(response.data.message || `${currentState} successful`);
        navigate("/", { replace: true });
      } else {
        toast.error(response.data.message || `${currentState} failed`);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error(
          error.response?.data?.message ||
            `An error occurred during ${currentState.toLowerCase()}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" && (
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          className="w-full px-3 py-2 border focus:outline-none border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        className="w-full px-3 py-2 border focus:outline-none border-gray-800"
        placeholder="Email"
        required
      />
      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        type="password"
        className="w-full px-3 py-2 border focus:outline-none border-gray-800"
        placeholder="Password"
        required
        minLength={8}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <span className="cursor-pointer">Forgot your password?</span>
        <span
          onClick={() =>
            setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
          }
          className="cursor-pointer"
        >
          {currentState === "Login" ? "Create Account" : "Login here"}
        </span>
      </div>
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 my-4 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : currentState}
      </button>
    </form>
  );
};

export default Login;
