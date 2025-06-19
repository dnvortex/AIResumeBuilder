export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-6 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition">Privacy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition">Terms</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
