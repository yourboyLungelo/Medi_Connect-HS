
import { CheckCircle, Hospital, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: <CheckCircle className="w-7 h-7 text-blue-700" />,
    title: "Register or Sign In",
    desc: "Create a secure account or log in with your ID to get started.",
  },
  {
    icon: <Hospital className="w-7 h-7 text-green-600" />,
    title: "Choose Service & Location",
    desc: "Select your clinic/hospital and type of care needed. Quickly see availability.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-purple-600" />,
    title: "Book & Access Care",
    desc: "Book appointments, access results, and manage your health info with confidence.",
  },
];

const HowItWorks = () => (
  <section className="py-16 bg-blue-50/50">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-blue-900 mb-10 text-center">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s, idx) => (
          <div key={s.title} className="flex flex-col items-center bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="mb-3">{s.icon}</div>
            <h3 className="text-lg font-bold text-blue-800 mb-1">{`${idx + 1}. ${s.title}`}</h3>
            <p className="text-center text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
