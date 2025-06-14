
import { Button } from "@/components/ui/button";

const Hero = () => (
  <section className="w-full flex flex-col-reverse lg:flex-row gap-10 items-center justify-between px-8 pt-12 pb-20 bg-gradient-to-r from-blue-50 via-white to-blue-100">
    <div className="flex-1 flex flex-col items-start gap-6 max-w-xl">
      <h1 className="text-5xl tracking-tight font-extrabold text-blue-900 leading-tight mb-2">
        Welcome to the Public Health Portal
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Simple, secure access to appointments, your health history, and trusted care across all public hospitals and clinics.
      </p>
      <div className="flex gap-4">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors">
          Book Appointment
        </Button>
        <Button variant="outline" size="lg" className="border-blue-600 text-blue-700 hover:bg-blue-100 rounded-lg">
          Find a Clinic
        </Button>
      </div>
    </div>
    <div className="flex-1 flex items-center justify-center min-w-[320px]">
      <img
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80"
        alt="Woman using healthcare portal"
        className="rounded-xl shadow-xl w-full max-w-md object-cover"
      />
    </div>
  </section>
);

export default Hero;
