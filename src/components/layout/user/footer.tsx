import Link from 'next/link';

export default function UserFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">U</span>
            </div>
            <span className="text-sm font-medium text-gray-600">User Panel</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <Link href="/dashboard" className="hover:text-gray-700 transition-colors">
              Dashboard
            </Link>
            <Link href="/settings" className="hover:text-gray-700 transition-colors">
              Settings
            </Link>
            <span>© 2025 Base NextJS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}