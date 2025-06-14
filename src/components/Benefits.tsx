
import { HeartPulse, CalendarCheck, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: <CalendarCheck className="w-8 h-8 text-blue-600" />,
    title: "Effortless Appointments",
    desc: "Book, reschedule, and manage appointments at any public hospital or clinic in minutes.",
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-green-500" />,
    title: "Personal Health Access",
    desc: "Access your medical history, prescriptions, and lab results securely, whenever you need them.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
    title: "Trusted, Secure System",
    desc: "Your health data is protected with the latest security standards and government compliance.",
  },
];

const Benefits = () => (
  <section className="w-full py-14 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-blue-900 mb-10 text-center">Why Use Our Portal?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((b) => (
          <div 
            key={b.title} 
            className="bg-blue-50/30 rounded-lg p-8 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="mb-4">{b.icon}</span>
            <h3 className="text-xl font-bold mb-2 text-blue-800">{b.title}</h3>
            <p className="text-center text-gray-600">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
