import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { formatDate, roundTwoDecimalPlaces } from "../utils/utils";

const DashboardPage = () => {
  const [monthlyEst, setMonthlyEst] = useState(0);
  const [yearlyEst, setYearlyEst] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upcomingPaymentItems, setUpcomingPaymentItems] = useState([]);
  const [endingFreeTrialItems, setEndingFreeTrialItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          yearlyEstRes,
          monthlyEstRes,
          upcomingPaymentRes,
          endingFreeTrialRes,
        ] = await Promise.all([
          api.get("/api/subscription/active/yearly-estimated-cost"),
          api.get("/api/subscription/active/monthly-estimated-cost"),
          api.get("/api/subscription/active/next-payment"),
          api.get("/api/subscription/freetrial/next-ending"),
        ]);
        setYearlyEst(
          roundTwoDecimalPlaces(yearlyEstRes.data[0].totalCost.$numberDecimal)
        );
        setMonthlyEst(
          roundTwoDecimalPlaces(monthlyEstRes.data[0].totalCost.$numberDecimal)
        );
        setUpcomingPaymentItems(upcomingPaymentRes.data);
        setEndingFreeTrialItems(endingFreeTrialRes.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Sidebar />
      <div className="absolute md:ml-52 ml-14">
        <div className="m-12">
          <div className="text-3xl font-medium mt-4 mb-8">
            Monitor your subscriptions and free trials
          </div>
          {/* First section */}
          <div className="text-2xl my-4">Total Estimated Cost</div>
          <div className="flex flex-wrap">
            <div className="my-4 mr-4 p-4 border-2 border-gray-200 shadow-md w-80">
              <div className="text-sm font-normal my-2">Yearly Est.</div>
              <div className="text-2xl font-bold my-2">RM {yearlyEst}</div>
              <div className="text-gray-500 text-sm my-2">
                Including all active subscriptions in a year
              </div>
            </div>
            <div className="my-4 mr-4 p-4 border-2 border-gray-200 shadow-md w-80">
              <div className="text-sm font-normal my-2">Monthly Est.</div>
              <div className="text-2xl font-bold my-2">RM {monthlyEst}</div>
              <div className="text-gray-500 text-sm my-2">
                Including all active subscriptions in a month
              </div>
            </div>
          </div>
          <div className="py-4"></div>
          {/* Second section */}
          <div className="text-2xl my-4">Upcoming Payment</div>
          {upcomingPaymentItems.length > 0 ? (
            <div className="flex flex-wrap">
              {upcomingPaymentItems.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="my-4 mr-4 p-4 border-2 border-gray-200 shadow-md w-80"
                  >
                    <div className="text-2xl font-bold my-2">{item.name}</div>
                    <div className="text-gray-500 text-sm my-2">
                      RM {item.price.$numberDecimal}
                    </div>
                    <div className="text-sm font-normal my-2">
                      Due: {formatDate(item.nextDate)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-700">
              No upcoming payment for active subscriptions.
            </div>
          )}

          <div className="py-4"></div>
          {/* Third section */}
          <div className="text-2xl my-4">Ending Free Trial</div>
          {endingFreeTrialItems.length > 0 ? (
            <div className="flex flex-wrap">
              {endingFreeTrialItems.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="my-4 mr-4 p-4 border-2 border-gray-200 shadow-md w-80"
                  >
                    <div className="text-2xl font-bold my-2">{item.name}</div>
                    <div className="text-sm font-normal my-2">
                      Due: {formatDate(item.endDate)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-700">
              No upcoming due free trial items.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
