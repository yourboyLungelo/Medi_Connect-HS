import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("loggedInUserName");
    if (storedName) {
      setUserName(storedName);
    } else {
      setUserName("User");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow w-full max-w-md text-center">
          <div className="mb-4 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome, {userName}!
          </h1>
          <p className="text-gray-600">
            You have successfully logged in to the Medi_Connect Health Portal.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
