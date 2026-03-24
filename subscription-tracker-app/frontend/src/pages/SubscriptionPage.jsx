import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { formatDate } from "../utils/utils";
import ActiveDialog from "../components/ActiveDialog";
import {
  createActiveSubscriptionViaApi,
  deleteActiveSubscriptionViaApi,
  getActiveSubscriptionsViaApi,
  updateActiveSubscriptionViaApi,
} from "../services/services";

const SubscriptionPage = () => {
  const [activeItems, setActiveItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // for create action
  const [createActive, setCreateActive] = useState(false);
  const [createActiveItem, setCreateActiveItem] = useState(null);

  const openCreateActiveDialog = (e) => {
    e.preventDefault();
    setCreateActiveItem({
      name: "",
      type: "",
      price: 0,
      nextDate: "",
      endDate: "",
    });
    setCreateActive(true);
  };

  // for update action
  const [editActive, setEditActive] = useState(false);
  const [editActiveItem, setEditActiveItem] = useState(null);

  useEffect(() => {
    listActiveSubscriptions();
  }, []);

  const listActiveSubscriptions = async () => {
    try {
      const response = await getActiveSubscriptionsViaApi();
      const items = response.data.map((item) => {
        return {
          ...item,
          price: item.price.$numberDecimal,
          nextDate: formatDate(item.nextDate),
          endDate: formatDate(item.endDate),
        };
      });
      setActiveItems(items);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const createActiveSubscription = (item) => {
    createActiveSubscriptionViaApi(item)
      .then((res) => {
        alert(`Create active subscription for ${res.data.name} successfully`);
      })
      .catch((error) => {
        alert(`Error creating active subscription: ${error.message}`);
      })
      .finally(() => {
        setCreateActive(false);
        listActiveSubscriptions();
      });
  };

  const updateActiveSubscription = (item) => {
    updateActiveSubscriptionViaApi(item._id, item)
      .then((res) => {
        alert(`Update active subscription for ${res.data.name} successfully`);
      })
      .catch((error) => {
        alert(`Error updating active subscription: ${error.message}`);
      })
      .finally(() => {
        setEditActive(false);
        listActiveSubscriptions();
      });
  };

  const deleteActiveSubscription = (id) => {
    deleteActiveSubscriptionViaApi(id)
      .then(() => {
        alert(`Delete active subscription successfully`);
      })
      .catch((error) => {
        alert(`Error updating active subscription: ${error.message}`);
      })
      .finally(() => {
        setEditActive(false);
        listActiveSubscriptions();
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <div>
        <Sidebar />
        <div className="absolute md:ml-52 ml-14">
          <div className="m-12">
            <div className="text-3xl font-medium mt-4 mb-8">
              Manage your subscriptions
            </div>
            {/* First section */}
            <div className="text-2xl my-4">Active Subscriptions</div>
            <div className="flex my-2">
              <button
                onClick={openCreateActiveDialog}
                className="flex flex-row text-base text-gray-500 hover:font-bold hover:text-black stroke-[1.5] hover:stroke-[2.5]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="auto"
                  stroke="currentColor"
                  className="size-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Add a new subscription
              </button>
            </div>
            {activeItems.length > 0 ? (
              <table className="table-auto sm:table-fixed border border-gray-300 text-left text-sm w-full">
                <thead className="bg-gray-100">
                  <tr className="border-b border-gray-300">
                    <th className="p-4">App Name</th>
                    <th className="px-4">Type</th>
                    <th className="px-4">Price</th>
                    <th className="px-4 hidden sm:table-cell">
                      Next Payment Date
                    </th>
                    <th className="px-4 hidden sm:table-cell">End Date</th>
                    <th className="px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeItems.map((item) => {
                    return (
                      <tr key={item._id} className="border-b border-gray-300">
                        <td className="p-4 ">{item.name}</td>
                        <td className="px-4">
                          {item.type === "Y"
                            ? "Yearly"
                            : item.type === "M"
                            ? "Monthly"
                            : item.type === "W"
                            ? "Weekly"
                            : "Daily"}
                        </td>
                        <td className="px-4">RM {item.price}</td>
                        <td className="px-4 hidden sm:table-cell">
                          {item.nextDate}
                        </td>
                        <td className="px-4 hidden sm:table-cell">
                          {item.endDate}
                        </td>
                        <td className="px-4">
                          <button
                            className="stroke-[1.5] hover:stroke-[2.5]"
                            onClick={(e) => {
                              e.preventDefault();
                              setEditActive(true);
                              setEditActiveItem(item);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="auto"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-sm text-gray-700 py-2">
                No records found. Begin your tracking by creating a new entry
                now!
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="z-50">
        {createActive && (
          <ActiveDialog
            isCreate={true}
            item={createActiveItem}
            handleClose={() => {
              setCreateActive(false);
            }}
            handleSubmit={(item) => {
              createActiveSubscription(item);
            }}
          />
        )}
        {editActive && (
          <ActiveDialog
            isCreate={false}
            item={editActiveItem}
            handleClose={() => {
              setEditActive(false);
            }}
            handleSubmit={(item) => {
              updateActiveSubscription(item);
            }}
            handleDelete={(id) => {
              deleteActiveSubscription(id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
