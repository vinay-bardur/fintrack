import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { formatDate } from "../utils/utils";
import FreeTrialDialog from "../components/FreeTrialDialog";
import {
  createFreeTrialViaApi,
  deleteFreeTrialViaApi,
  getFreeTrialsViaApi,
  updateFreeTrialViaApi,
} from "../services/services";

const FreeTrialPage = () => {
  const [freeTrialItems, setFreeTrialItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // for create action
  const [createFreeTrial, setCreateFreeTrial] = useState(false);
  const [createFreeTrialItem, setCreateFreeTrialItem] = useState(null);

  const openCreateFreeTrialDialog = (e) => {
    e.preventDefault();
    setCreateFreeTrialItem({
      name: "",
      startDate: "",
      endDate: "",
    });
    setCreateFreeTrial(true);
  };

  // for update action
  const [editFreeTrial, setEditFreeTrial] = useState(false);
  const [editFreeTrialItem, setEditFreeTrialItem] = useState(null);

  useEffect(() => {
    listFreeTrials();
  }, []);

  const listFreeTrials = async () => {
    try {
      const response = await getFreeTrialsViaApi();
      const items = response.data.map((item) => {
        return {
          ...item,
          startDate: formatDate(item.startDate),
          endDate: formatDate(item.endDate),
        };
      });
      setFreeTrialItems(items);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const createNewFreeTrial = (item) => {
    createFreeTrialViaApi(item)
      .then((res) => {
        alert(`Create free trial item for ${res.data.name} successfully`);
      })
      .catch((error) => {
        alert(`Error creating free trial item: ${error.message}`);
      })
      .finally(() => {
        setCreateFreeTrial(false);
        listFreeTrials();
      });
  };

  const updateFreeTrial = (item) => {
    updateFreeTrialViaApi(item._id, item)
      .then((res) => {
        alert(`Update free trial item for ${res.data.name} successfully`);
      })
      .catch((error) => {
        alert(`Error updating free trial item: ${error.message}`);
      })
      .finally(() => {
        setEditFreeTrial(false);
        listFreeTrials();
      });
  };

  const deleteFreeTrial = (id) => {
    deleteFreeTrialViaApi(id)
      .then(() => {
        alert(`Delete free trial item successfully`);
      })
      .catch((error) => {
        alert(`Error updating free trial item: ${error.message}`);
      })
      .finally(() => {
        setEditFreeTrial(false);
        listFreeTrials();
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
              Manage your subscribed free trials
            </div>
            {/* First section */}
            <div className="text-2xl my-4">Free Trials</div>
            <div className="flex my-2">
              <button
                onClick={openCreateFreeTrialDialog}
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
                Add a new free trial item
              </button>
            </div>
            {freeTrialItems.length > 0 ? (
              <table className="table-auto sm:table-fixed border border-gray-300 text-left text-sm w-full">
                <thead className="bg-gray-100">
                  <tr className="border-b border-gray-300">
                    <th className="p-4">App Name</th>
                    <th className="px-4 hidden sm:table-cell">Start Date</th>
                    <th className="px-4">End Date</th>
                    <th className="px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {freeTrialItems.map((item) => {
                    return (
                      <tr key={item._id} className="border-b border-gray-300">
                        <td className="p-4 ">{item.name}</td>

                        <td className="px-4 hidden sm:table-cell">
                          {item.startDate}
                        </td>
                        <td className="px-4">{item.endDate}</td>
                        <td className="px-4">
                          <button
                            className="stroke-[1.5] hover:stroke-[2.5]"
                            onClick={(e) => {
                              e.preventDefault();
                              setEditFreeTrial(true);
                              setEditFreeTrialItem(item);
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
              <div>
                <table className="table-fixed border border-gray-300 text-left text-sm">
                  <thead className="bg-gray-100">
                    <tr className="border-b border-gray-300">
                      <th className="p-4">App Name</th>
                      <th className="px-4">Start Date</th>
                      <th className="px-4">End Date</th>
                    </tr>
                  </thead>
                </table>
                <div className="text-sm text-gray-700 py-2">
                  No records found. Begin your tracking by creating a new entry
                  now!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="z-50">
        {createFreeTrial && (
          <FreeTrialDialog
            isCreate={true}
            item={createFreeTrialItem}
            handleClose={() => {
              setCreateFreeTrial(false);
            }}
            handleSubmit={(item) => {
              createNewFreeTrial(item);
            }}
          />
        )}
        {editFreeTrial && (
          <FreeTrialDialog
            isCreate={false}
            item={editFreeTrialItem}
            handleClose={() => {
              setEditFreeTrial(false);
            }}
            handleSubmit={(item) => {
              updateFreeTrial(item);
            }}
            handleDelete={(id) => {
              deleteFreeTrial(id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FreeTrialPage;
