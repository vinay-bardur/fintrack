import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getUserByEmailViaApi } from "../services/services";

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserDetails = async (email) => {
    try {
      const response = await getUserByEmailViaApi(email);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    getUserDetails(email);
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <div>
        <Sidebar />
        <div className="absolute md:ml-52 ml-14">
          <div className="m-12">
            <div className="text-3xl font-medium mt-4 mb-8">
              Welcome back, {user.displayName}.
            </div>
            {/* First section */}
            <div className="text-2xl my-4">View your account info</div>
            <div className="flex flex-col py-2">
              <span className="text-gray-700 my-1">Email</span>
              <input
                type="email"
                className="border-gray-300 rounded-md text-gray-500"
                name="email"
                value={user.email}
                disabled
              />
            </div>
            <div className="flex flex-row space-x-5">
              <div className="flex flex-col py-2">
                <span className="text-gray-700 my-1">First Name</span>
                <input
                  type="text"
                  className="border-gray-300 rounded-md text-gray-500"
                  name="firstName"
                  value={user.firstName}
                  disabled
                />
              </div>
              <div className="flex flex-col py-2">
                <span className="text-gray-700 my-1">Last Name</span>
                <input
                  type="text"
                  className="border-gray-300 rounded-md text-gray-500"
                  name="lastName"
                  value={user.lastName}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col py-2">
              <span className="text-gray-700 my-1">Display Name</span>
              <input
                type="text"
                className="border-gray-300 rounded-md text-gray-500"
                name="displayName"
                value={user.displayName}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
