import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { getAllUser } from "../../api/userApi";
import { getAllOrders } from "../../api/orderApi";
import { getAllProducts } from "../../api/ProductApi";
import { getAllCategories } from "../../api/categoryApi";
import { CgHome } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    getAllUser().then((data) => setUsers(data || []));
    getAllOrders().then((data) => setOrders(data || []));
    getAllProducts().then((data) => setProducts(data || []));
    getAllCategories().then((data) => setCategories(data || []));
  }, []);

  // Products per category
  const productsByCategory = categories.map((category) => {
    const count = products.filter(
      (p) => p.category?._id === category._id
    ).length;
    return { name: category.category_name, count };
  });

  // Orders status
  const orderStatusCounts = {
    pending: orders.filter((o) => o.status === "Pending").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
  };

  //revenue calculation
  const totalRevenue = orders.reduce((total, order) => {
    return total + order.total;
  }, 0);

  // Average product price
  const avgProductPrice = (
    products.reduce((total, product) => total + product.product_price, 0) /
    (products.length || 1)
  ).toFixed(2);

  // Top category
  const bestSellingCategory = productsByCategory.reduce(
    (prev, curr) => (curr.count > prev.count ? curr : prev),
    { name: "None", count: 0 }
  );
  let navigate = useNavigate();
  console.log(orders, products);
  return (
    <div className="p-6 space-y-10 rounded bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        <button
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() => navigate("/")}
        >
          <CgHome /> Back to Home
        </button>
      </div>

      {/* Summary Stats */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={users.length}
            color="bg-indigo-600"
            icon=""
          />
          <StatCard
            title="Total Products"
            value={products.length}
            color="bg-emerald-600"
            icon=""
          />
          <StatCard
            title="Total Orders"
            value={orders.length}
            color="bg-yellow-500"
            icon=""
          />
          <StatCard
            title="Estimated Revenue"
            value={`Rs. ${totalRevenue.toLocaleString()}`}
            color="bg-pink-500"
            icon=""
          />
        </div>
      </section>

      {/* More Insights */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            title="Categories"
            value={categories.length}
            color="bg-blue-500"
            icon=""
          />
          <StatCard
            title="Delivered Orders"
            value={orderStatusCounts.delivered}
            color="bg-green-600"
            icon=""
          />
          <StatCard
            title="Pending Orders"
            value={orderStatusCounts.pending}
            color="bg-gray-700"
            icon=""
          />
          <StatCard
            title="Cancelled Orders"
            value={orderStatusCounts.cancelled}
            color="bg-red-600"
            icon=""
          />
          <StatCard
            title="Avg Product Price"
            value={`Rs. ${avgProductPrice}`}
            color="bg-purple-600"
            icon=""
          />
          <StatCard
            title="Top Category"
            value={`${bestSellingCategory.name} (${bestSellingCategory.count})`}
            color="bg-orange-500"
            icon=""
          />
        </div>
      </section>

      {/* Charts Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Visualizations
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Products by Category
            </h3>
            <Bar
              data={{
                labels: productsByCategory.map((c) => c.name),
                datasets: [
                  {
                    label: "Product Count",
                    data: productsByCategory.map((c) => c.count),
                    backgroundColor: "rgba(54, 162, 235, 0.7)",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Orders by Status
            </h3>
            <Doughnut
              data={{
                labels: ["Pending", "Cancelled", "Delivered"],
                datasets: [
                  {
                    label: "Orders",
                    data: Object.values(orderStatusCounts),
                    backgroundColor: ["#fbbf24", "#f87171", "#34d399"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Mini card component
const StatCard = ({ title, value, color, icon }) => (
  <div className={`${color} rounded-lg p-4 shadow text-white`}>
    <div className="text-sm flex items-center gap-1">
      <span className="text-lg">{icon}</span>
      <span>{title}</span>
    </div>
    <h3 className="text-2xl font-bold mt-2">{value}</h3>
  </div>
);

export default Dashboard;
