import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!idNumber || !password) {
      alert("Please enter your Admin ID Number and Password.");
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/admins/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idNumber, password }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          alert("Invalid ID Number or Password.");
        } else {
          alert("Failed to login admin.");
        }
        return;
      }
      const admin = await response.json();
      localStorage.setItem('adminName', admin.name);
      alert("Logged in as admin: " + idNumber);
      navigate('/adminDashboard');
    } catch (error) {
      alert("Error during login: " + error);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg w-full max-w-md rounded-xl p-8 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center">Admin Login</h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="admin-id">Admin ID Number</Label>
          <Input
            id="admin-id"
            placeholder="Enter your admin ID number"
            value={idNumber}
            onChange={e => setIdNumber(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">Login as Admin</Button>
        <p className="text-sm text-center text-gray-600">
          Not an admin?{" "}
          <a href="/login" className="text-blue-700 hover:underline">
            Patient Login
          </a>
        </p>
      </form>
    </main>
  );
};

export default AdminLogin;
