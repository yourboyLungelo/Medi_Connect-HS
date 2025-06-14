
const Dashboard = () => (
  <main className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome!</h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        You have successfully logged in to the Public Health Portal.
      </p>
      <span role="img" aria-label="doctor" className="text-5xl mb-6">🩺</span>
      <a
        className="mt-4 text-blue-700 hover:underline"
        href="/"
      >
        Go back to Home
      </a>
    </div>
  </main>
);

export default Dashboard;
