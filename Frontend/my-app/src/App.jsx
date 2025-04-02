import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaPlusCircle, FaSignInAlt } from "react-icons/fa";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6 flex flex-col items-center">
        <motion.nav 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white shadow-lg p-4 rounded-2xl w-full max-w-3xl flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold text-blue-700">Lost & Found</h1>
          <div className="flex gap-4">
            {!user ? (
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                <FaSignInAlt /> Login
              </Link>
            ) : (
              <>
                <Link to="/report-lost" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                  <FaPlusCircle /> Report Lost
                </Link>
                <Link to="/report-found" className="text-green-600 hover:text-green-800 font-semibold flex items-center gap-2">
                  <FaPlusCircle /> Report Found
                </Link>
              </>
            )}
          </div>
        </motion.nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report-lost" element={user ? <ReportLost /> : <Login setUser={setUser} />} />
          <Route path="/report-found" element={user ? <ReportFound /> : <Login setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="mt-6 w-full max-w-3xl">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-gray-800">Recent Reports</h2>
        <button className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition flex items-center gap-2">
          <FaSearch className="text-blue-600" /> Search
        </button>
      </div>
      <p className="text-gray-600 mt-2">Browse lost and found items below.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        <ItemCard item={{ name: "Black Wallet", description: "Lost near the library" }} />
        <ItemCard item={{ name: "Red Water Bottle", description: "Found in the cafeteria" }} />
      </div>
    </div>
  );
}

function ItemCard({ item }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-start"
    >
      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
      <p className="text-gray-600">{item.description}</p>
      <button className="mt-2 text-sm text-blue-500 hover:underline">More Info</button>
    </motion.div>
  );
}

function ReportLost() {
  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-lg w-full max-w-3xl">
      <h2 className="text-2xl font-semibold text-gray-800">Report a Lost Item</h2>
      <input type="text" placeholder="Item Name" className="w-full border p-3 mt-2 rounded-lg" />
      <textarea placeholder="Description" className="w-full border p-3 mt-2 rounded-lg"></textarea>
      <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg w-full hover:bg-blue-800 transition">Submit</button>
    </div>
  );
}

function ReportFound() {
  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-lg w-full max-w-3xl">
      <h2 className="text-2xl font-semibold text-gray-800">Report a Found Item</h2>
      <input type="text" placeholder="Item Name" className="w-full border p-3 mt-2 rounded-lg" />
      <textarea placeholder="Description" className="w-full border p-3 mt-2 rounded-lg"></textarea>
      <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded-lg w-full hover:bg-green-800 transition">Submit</button>
    </div>
  );
}

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email.endsWith("@cmrcet.ac.in")) {
      setUser(email);
      navigate("/");
    } else {
      alert("Please use your college email (@cmrcet.ac.in) to login.");
    }
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-lg w-full max-w-3xl">
      <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
      <input
        type="email"
        placeholder="Enter college email"
        className="w-full border p-3 mt-2 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg w-full hover:bg-blue-800 transition">
        Login
      </button>
    </div>
  );
}

export default App;