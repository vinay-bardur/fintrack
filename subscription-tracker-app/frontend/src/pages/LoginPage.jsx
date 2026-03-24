import { useState } from "react";
import Header from "../components/Header";
import { login } from "../services/auth";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    login(formData)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("email", res.data.email);
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid credentials. Please try again");
      });
  };

  return (
    <div>
      <div className="flex flex-col h-screen justify-center items-center p-8">
        <Header />
        <div className="flex flex-row text-2xl font-medium text-center">
          Hi there!
        </div>
        <div className="flex flex-row text-base font-normal text-gray-500 text-center my-4">
          Login to track your subscriptions now
        </div>
        <form className="flex flex-col w-full md:w-1/3" onSubmit={handleSubmit}>
          <div className="my-2">
            <input
              type="email"
              className="block w-full border-gray-300 rounded-md"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <input
              type="password"
              className="block w-full border-gray-300 rounded-md"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="my-4">
            <button
              type="submit"
              className="block w-full bg-black text-white rounded-md p-2"
            >
              Login
            </button>
          </div>
          <div className="my-4">
            <div className="block w-full text-gray-500 text-base text-center">
              Don&apos;t have an account?{" "}
              <span className="underline">
                <a href="/register">Register</a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
