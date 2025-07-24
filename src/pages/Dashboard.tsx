import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserSidebar from "@/components/UserSidebar";
import { getIdNumberFromToken } from "@/lib/jwt";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [userName, setUserName] = useState("");
  const [userIdNumber, setUserIdNumber] = useState<string | null>(null);

  // Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Session timeout state
  const [timeoutId, setTimeoutId] = useState(null);

  // Logout function
  const logout = () => {
    // Clear user session data (e.g., localStorage)
    localStorage.clear();
    // Redirect to login page
    window.location.href = "/login";
  };

  // Reset inactivity timer
  const resetTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      alert("You have been logged out due to inactivity.");
      logout();
    }, 15 * 60 * 1000); // 15 minutes
    setTimeoutId(id);
  };

  useEffect(() => {
    // Load user's name from localStorage
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }

    // Set up event listeners for user activity
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start the timer initially
    resetTimer();

    // Cleanup event listeners on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:5000/api/users/current", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUserProfile(data);
        setUserName(data.name || "");
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setLoadingProfile(false);
    }
  };

// Fetch upcoming appointments and past appointments together
const fetchAppointments = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch("http://localhost:5000/api/users/current", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      const now = new Date();
      setUpcomingAppointments(data.appointments.filter(appt => new Date(appt.date) >= now));
      setPastAppointments(data.appointments.filter(appt => new Date(appt.date) < now));
    }
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
  } finally {
    setLoadingAppointments(false);
  }
};

  useEffect(() => {
    // Extract idNumber from token on frontend
    const token = localStorage.getItem('token');
    if (token) {
      const idNumber = getIdNumberFromToken(token);
      setUserIdNumber(idNumber);
    }

    fetchUserProfile();
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen flex bg-blue-50">
      <UserSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md text-center">
            <div className="mb-4 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-10 w-10 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={toggleSidebar}
              >
                <title>Toggle Sidebar</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome, {userName || "User"}!
            </h1>
            
            <p className="text-gray-600">
              You have successfully logged in to the Medi_Connect Health Portal.
            </p>
          </div>
        </main>
        <main className="flex-grow p-6 overflow-auto">
          <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

          {loadingProfile && <p>Loading profile...</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <section className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
              {upcomingAppointments.length === 0 ? (
                <p>No upcoming appointments.</p>
              ) : (
                <ul>
                  {upcomingAppointments.map((appt) => (
                    <li key={appt._id} className="mb-2 border-b pb-2">
                      <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {appt.time}</p>
                      <p><strong>Doctor:</strong> {appt.doctor}</p>
                      <p><strong>Staff ID:</strong> {appt.staffId }</p>
                      <p><strong>Type:</strong> {appt.type}</p>
                      <p><strong>Status:</strong> {appt.status}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
              {loadingAppointments ? (
                <p>Loading past appointments...</p>
              ) : pastAppointments.length === 0 ? (
                <p>No past appointments.</p>
              ) : (
                <ul>
                  {pastAppointments.map((appt) => (
                    <li key={appt._id} className="mb-2 border-b pb-2">
                      <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {appt.time}</p>
                      <p><strong>Doctor:</strong> {appt.doctor.split(' ')[0]}</p>
                      <p><strong>Staff ID:</strong> {appt.staffId }</p>
                      <p><strong>Type:</strong> {appt.type}</p>
                      <p><strong>Status:</strong> {appt.status}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <section className="mb-8 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Medical Records</h2>
            <p>Medical records feature coming soon.</p>
          </section>

          <section className="mb-8 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <p>Notifications feature coming soon.</p>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
