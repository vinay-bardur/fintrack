import { useState } from "react";
import Header from "../components/Header";
import { register } from "../services/auth";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (confirmPassword === formData.password && confirmPassword.length > 0) {
      event.target.setCustomValidity("Please fill in a matching password.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(formData)
      .then((res) => {
        alert(res.data.message);
        window.location.replace("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid user data. Please try again");
        window.location.reload();
      });
  };

  return (
    <div>
      <div className="flex flex-col h-screen justify-center items-center p-8">
        <Header />
        <div className="flex flex-row text-2xl font-medium text-center">
          Create an account
        </div>
        <div className="flex flex-row text-base font-normal text-gray-500 text-center my-4">
          Track your subscriptions with us now!
        </div>
        <form className="flex flex-col w-full md:w-1/3" onSubmit={handleSubmit}>
          <div className="my-2">
            <input
              type="text"
              className="block w-full border-gray-300 rounded-md"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-2">
            <input
              type="text"
              className="block w-full border-gray-300 rounded-md"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-2">
            <input
              type="text"
              className="block w-full border-gray-300 rounded-md"
              placeholder="Display Name"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-2">
            <input
              type="email"
              className="block w-full border-gray-300 rounded-md"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="on"
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
              required
              minLength={8}
            />
          </div>
          <div className="my-2">
            <input
              type="password"
              className="block w-full border-gray-300 rounded-md"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          <div className="my-4">
            <button className="block w-full bg-black text-white rounded-md p-2">
              Register
            </button>
          </div>
          <div className="my-4">
            <div className="block w-full text-gray-500 text-base text-center">
              Already have an account?{" "}
              <span className="underline">
                <a href="/login">Login</a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
