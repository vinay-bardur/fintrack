import { useState } from "react";

const ActiveDialog = ({
  isCreate,
  item,
  handleClose,
  handleSubmit,
  handleDelete,
}) => {
  const [dialogItem, setDialogItem] = useState(item);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDialogItem((prevItem) => ({ ...prevItem, [name]: value }));
  };
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white text-black fixed top-0 bottom-0 left-0 right-0 overflow-scroll">
        <div className="m-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(dialogItem);
            }}
          >
            <div className="flex flex-row justify-between">
              <div className="text-xl font-semibold py-2">
                {isCreate ? "Create" : "Edit"} Active Subscription Item
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col py-2">
              <span className="text-gray-700 my-1">App Name</span>
              <input
                type="text"
                className="border-gray-300 rounded-md"
                placeholder="Fill in the application name"
                name="name"
                value={dialogItem.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-between space-x-5">
              <div className="flex flex-col py-2 w-full">
                <span className="text-gray-700 my-1">Type</span>
                <select
                  className="border-gray-300 rounded-md"
                  value={dialogItem.type}
                  onChange={handleChange}
                  name="type"
                  required
                >
                  <option disabled value="">
                    -- select an option --
                  </option>
                  <option value="Y">Yearly</option>
                  <option value="M">Monthly</option>
                  <option value="W">Weekly</option>
                  <option value="D">Daily</option>
                </select>
              </div>

              <div className="flex flex-col py-2 w-full">
                <span className="text-gray-700 my-1">Price (RM)</span>
                <input
                  type="number"
                  className="border-gray-300 rounded-md"
                  placeholder="Fill in the subscription price"
                  name="price"
                  value={dialogItem.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between space-x-5">
              <div className="flex flex-col py-2 w-full">
                <span className="text-gray-700 my-1">Next Payment Date</span>
                <input
                  type="date"
                  className="border-gray-300 rounded-md"
                  name="nextDate"
                  value={dialogItem.nextDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col py-2 w-full">
                <span className="text-gray-700 my-1">End Date</span>
                <input
                  type="date"
                  className="border-gray-300 rounded-md"
                  name="endDate"
                  value={dialogItem.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row py-8 space-x-5">
              {!isCreate && (
                <button
                  className="bg-red-500 text-white w-full rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(dialogItem._id);
                  }}
                >
                  <div className="p-2">Delete</div>
                </button>
              )}
              <button
                type="submit"
                className="bg-black text-white w-full rounded-md"
              >
                <div className="p-2">Save</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActiveDialog;
