import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!staffId || !password) {
      alert("Please enter your Staff ID and Password.");
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/doctors/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffId, password }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          alert("Invalid Staff ID or Password.");
        } else {
          alert("Failed to login.");
        }
        return;
      }
      const staff = await response.json();
      localStorage.setItem('staffName', staff.name);
      alert("Logged in as staff: " + staffId);
      navigate('/doctorDashboard');
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
        <h2 className="text-2xl font-bold text-blue-700 text-center">Doctor Login</h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="staff-id">Staff ID</Label>
          <Input
            id="staff-id"
            placeholder="Enter your staff ID"
            value={staffId}
            onChange={e => setStaffId(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="staff-password">Password</Label>
          <Input
            id="staff-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">Login as Staff</Button>
        <p className="text-sm text-center text-gray-600">
          Not staff?{" "}
          <a href="/login" className="text-blue-700 hover:underline">
            Patient Login
          </a>
        </p>
      </form>
    </main>
  );
};

export default StaffLogin;
