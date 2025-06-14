
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

const Register = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Dummy submit handler (no backend/auth yet)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("This is a placeholder. Welcome, " + name + "!");
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg w-full max-w-md rounded-xl p-8 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center">Patient Register</h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            placeholder="Enter your full name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="patient-id">Patient ID</Label>
          <Input
            id="patient-id"
            placeholder="Set your Patient ID"
            value={id}
            onChange={e => setId(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Set a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">Register</Button>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-700 hover:underline">
            Login
          </a>
        </p>
      </form>
    </main>
  );
};

export default Register;
