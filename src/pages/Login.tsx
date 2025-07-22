import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [idNumber, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (idNumber && password) {
      try {
        const res = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idNumber, password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("idNumber", data.idNumber);
          localStorage.setItem("userName", data.name);
          localStorage.setItem("role", data.role);
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        } else {
          alert(data.message || "Invalid ID number or password.");
        }
      } catch (error) {
        alert("An error occurred during login. Please try again.");
      }
    } else {
      alert("Please enter your Patient ID and Password.");
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg w-full max-w-md rounded-xl p-8 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center">Patient Login</h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="patient-id">Patient ID</Label>
          <Input
            id="patient-id"
            placeholder="Enter your Patient ID"
            value={idNumber}
            onChange={e => setId(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">Login</Button>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-700 hover:underline">
            Register
          </a>
        </p>
      </form>
    </main>
  );
};

export default Login;