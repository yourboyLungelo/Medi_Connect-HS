
const Footer = () => (
  <footer className="w-full border-t bg-blue-50 text-blue-900 py-8 mt-10">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
      <div className="font-semibold text-xl">Public Health Portal</div>
      <div className="flex gap-6 text-sm">
        <a href="#about" className="hover:underline">About</a>
        <a href="#faq" className="hover:underline">FAQ</a>
        <a href="#contact" className="hover:underline">Contact</a>
        <a href="/" className="hover:underline">Home</a>
      </div>
      <div className="text-xs text-blue-700">&copy; {new Date().getFullYear()} Public Health System</div>
    </div>
  </footer>
);
export default Footer;
