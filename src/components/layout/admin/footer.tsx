import Link from 'next/link';

export default function AdminFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Admin Panel</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <Link href="/admin/dashboard" className="hover:text-gray-700 transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/users" className="hover:text-gray-700 transition-colors">
              Users
            </Link>
            <span>© 2025 Base NextJS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}