import "./orderHistory.css";
import NavBar from "../../components/navbar/NavBar";
import axios from "axios";
import useSWR from "swr";
import { BASE_API_URL } from "../../utils/constants";
import { useHistory, Link } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import ErrorPopover from "../../components/errorPopover/ErrorPopover";
import OrderCard from "../../components/order/OrderCard";

const orderFetcher = (url, token) =>
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data.data);

const OrderHistory = () => {
  const history = useHistory();
  const token = localStorage.getItem("accessToken");

  if (!token) {
    history.push("/login");
  }

  const { data, error } = useSWR(
    [`${BASE_API_URL}/api/v1/orders`, token],
    orderFetcher
  );

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className="bg-netflix-black w-full min-h-screen h-full pt-24 text-white">
      <NavBar />
      <div className="h-full w-full m-0 px-12 pb-8">
        {error && <ErrorPopover error={error} />}
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-white text-3xl font-semibold my-6">
              Order History
            </h1>
            {data.orders.length === 0 ? (
              <>
                <h2 className="text-gray-100 text-base mt-6">
                  You haven't placed any orders yet.
                </h2>
                <button className="bg-red-600 rounded-md py-2 px-4 mt-6">
                  <Link to="/cart">Checkout now</Link>
                </button>
              </>
            ) : (
              <h2 className="text-gray-100 text-base my-6">
                {" "}
                Recent orders that have been placed.
              </h2>
            )}
          </div>

          {data.orders.map((order) => (
            <OrderCard key={order._id} order={order}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
