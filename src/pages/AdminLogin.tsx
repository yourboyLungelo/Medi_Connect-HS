
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Dummy submit handler (no backend/auth yet)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here, you should check credentials using backend or Supabase in a real app
    if (email && password) {
      alert("Logged in as admin: " + email);
      // Here you could navigate to an admin dashboard if you have one
      // navigate('/admin-dashboard');
    } else {
      alert("Please enter your Admin Email and Password.");
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
          <Label htmlFor="admin-email">Admin Email</Label>
          <Input
            id="admin-email"
            type="email"
            placeholder="Enter your admin email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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

