import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserSidebar from "@/components/UserSidebar";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    birthdate: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePasswordMessage, setChangePasswordMessage] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Fetching profile with token:", token);
        if (!token) {
          console.error("No token found in localStorage");
          return; // Prevent fetch if no token
        }
        const res = await fetch("http://localhost:5000/api/users/current", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched user profile data:", data);
          setUserProfile(data);
          setEditFormData({
            name: data.name || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            birthdate: data.birthdate || "",
          });
        } else {
          console.error("Failed to fetch user profile, status:", res.status);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangePasswordMessage("");
    setChangePasswordError("");
    if (!currentPassword || !newPassword) {
      setChangePasswordError("Please fill in both current and new passwords.");
      return;
    }
      try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5000/api/users/change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        });
        const data = await res.json();
        if (res.ok) {
          setChangePasswordMessage(data.message);
          setCurrentPassword("");
          setNewPassword("");
        } else {
          setChangePasswordError(data.message || "Failed to change password.");
        }
      } catch (err) {
        setChangePasswordError("An error occurred. Please try again.");
      }
  };

  return (
    <div className="min-h-screen flex bg-blue-50">
      <UserSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-6 overflow-auto">
          <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
          {loadingProfile ? (
            <p>Loading profile...</p>
          ) : userProfile ? (
            <>
              {!isEditing ? (
                <section className="bg-white p-4 rounded shadow max-w-md mx-auto transition-opacity duration-700 ease-in-out opacity-100 mb-6">
                  <p><strong>Name:</strong> {userProfile.name || "N/A"}</p>
                  <p><strong>Patient ID:</strong> {userProfile.idNumber || "N/A"}</p>
                  <p><strong>Email:</strong> {userProfile.email || "N/A"}</p>
                  <p><strong>Phone:</strong> {userProfile.phoneNumber || "N/A"}</p>
                  <p><strong>Birthdate:</strong> {userProfile.birthdate || "N/A"}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </section>
              ) : (
                <section className="bg-white p-4 rounded shadow max-w-md mx-auto transition-opacity duration-700 ease-in-out opacity-100 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const token = localStorage.getItem('token');
                      const res = await fetch(`http://localhost:5000/api/userProfile/${userProfile.idNumber}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(editFormData),
                      });
                      const data = await res.json();
                      if (res.ok) {
                        setUserProfile(data);
                        setIsEditing(false);
                      } else {
                        alert(data.message || "Failed to update profile");
                      }
                    } catch (err) {
                      alert("An error occurred. Please try again.");
                    }
                  }}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                      <input
                        id="name"
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={editFormData.email}
                        onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phoneNumber" className="block mb-1 font-medium">Phone Number</label>
                      <input
                        id="phoneNumber"
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={editFormData.phoneNumber}
                        onChange={(e) => setEditFormData({ ...editFormData, phoneNumber: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="birthdate" className="block mb-1 font-medium">Birthdate</label>
                      <input
                        id="birthdate"
                        type="date"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={editFormData.birthdate}
                        onChange={(e) => setEditFormData({ ...editFormData, birthdate: e.target.value })}
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </section>
              )}
              <section className="bg-white p-4 rounded shadow max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <form onSubmit={handleChangePassword}>
                  <div className="mb-4">
                    <label htmlFor="currentPassword" className="block mb-1 font-medium">Current Password</label>
                    <input
                      id="currentPassword"
                      type="password"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="block mb-1 font-medium">New Password</label>
                    <input
                      id="newPassword"
                      type="password"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Change Password
                  </button>
                  {changePasswordMessage && <p className="mt-4 text-green-600">{changePasswordMessage}</p>}
                  {changePasswordError && <p className="mt-4 text-red-600">{changePasswordError}</p>}
                </form>
              </section>
            </>
          ) : (
            <p>User profile not found.</p>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
