import { Routes, Route, Navigate, data } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
// import { useEffect } from "react";
// import { useAuth } from "./context/AuthContext";

function App() {
	// console.log(useAuth());
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;
