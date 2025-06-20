import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserSidebar from "@/components/UserSidebar";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/userProfile");
        if (res.ok) {
          const data = await res.json();
          setUserProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen flex bg-blue-50">
      <UserSidebar />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow p-6 overflow-auto">
          <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
          {loadingProfile ? (
            <p>Loading profile...</p>
          ) : userProfile ? (
            <section className="bg-white p-4 rounded shadow max-w-md mx-auto">
              <p><strong>Name:</strong> {userProfile.name}</p>
              <p><strong>Patient ID:</strong> {userProfile.idNumber}</p>
              <p><strong>Email:</strong> {userProfile.email}</p>
              <p><strong>Phone:</strong> {userProfile.phoneNumber || "N/A"}</p>
              <p><strong>Birthdate:</strong> {userProfile.birthdate || "N/A"}</p>
              {/* Add profile update form or buttons here if needed */}
            </section>
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
