import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "@/lib/jwt";

const Login = () => {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idNumber || !password) {
      alert("Please enter your ID number and password.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idNumber, password }),
      });
      if (!response.ok) {
        alert("Invalid ID number or password.");
        return;
      }
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        // Decode token to get role and idNumber
        const decoded = decodeToken(data.token);
        if (decoded) {
          localStorage.setItem("role", decoded.role || "");
          localStorage.setItem("idNumber", decoded.idNumber || "");
        }
        navigate("/dashboard");
      } else {
        alert("Login failed: No token received.");
      }
    } catch (error) {
      alert("Error during login: " + error.message);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg w-full max-w-md rounded-xl p-8 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center">Patient Login</h2>
        <input
          type="text"
          placeholder="ID Number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          required
          autoFocus
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
