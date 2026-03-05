import { useState } from "react";
import {
    Users,
    Plus,
    List,
    Bookmark,
    LogOut,
    LogIn,
    Menu, // Added for burger icon
    X,    // Added for close icon
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { appPath } from "../../enums";
import { useUserStore } from "../../../storage/useAuthStore";

const NavigationTab: React.FC = () => {
    const { isAuthenticated, user, logout } = useUserStore();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        if (isAuthenticated) {
            const isLogout = confirm("Are you sure you want to log out?");
            if (isLogout) {
                logout();
                setIsMenuOpen(false); // Close menu on mobile after logout
                navigate(appPath.ROOT);
            }
        } else {
            navigate(appPath.LOGIN);
        }
    };

    return (
        <nav className="relative bg-white border-b border-gray-100">
            <div className="flex items-center justify-between px-8 py-4">
                {/* Logo / Main Link */}
                <Link to={appPath.ROOT} className="flex items-center space-x-2 cursor-pointer hover:text-indigo-600">
                    <List size={22} className="text-indigo-600" />
                    <span className="font-bold text-lg tracking-tight">Evently</span>
                </Link>

                {/* Desktop Menu - Hidden on Mobile */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to={appPath.ROOT} className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 transition">
                        <span className="font-medium">All Events</span>
                    </Link>
                    {isAuthenticated && (
                        <>
                            <Link to={appPath.MY_EVENTS} className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 transition">
                                <Bookmark size={18} />
                                <span className="font-medium">My Events</span>
                            </Link>
                            <Link to={appPath.CREATE_EVENT}>
                                <button type="button" className="flex cursor-pointer items-center space-x-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm">
                                    <Plus size={18} />
                                    <span className="font-medium">Create Event</span>
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Right Side Items (Desktop) */}
                <div className="hidden md:flex items-center space-x-4">
                    {isAuthenticated && (
                        <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-full border border-gray-200">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                <Users size={16} />
                            </div>
                            <span className="font-medium text-sm text-slate-700">{user?.name}</span>
                        </div>
                    )}
                    <button type="button" onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition cursor-pointer">
                        {isAuthenticated ? <LogOut size={20} /> : <LogIn size={20} />}
                    </button>
                </div>

                {/* Mobile Burger Button - Only visible on small screens */}
                <div className="md:hidden flex items-center">
                    <button 
                        type="button"
                        onClick={toggleMenu} 
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition cursor-pointer"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex flex-col p-6 space-y-4">
                        <Link 
                            to={appPath.ROOT} 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center space-x-3 p-3 hover:bg-indigo-50 rounded-xl"
                        >
                            <List size={20} />
                            <span className="font-medium">All Events</span>
                        </Link>
                        
                        {isAuthenticated ? (
                            <>
                                <Link 
                                    to={appPath.MY_EVENTS} 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center space-x-3 p-3 hover:bg-indigo-50 rounded-xl"
                                >
                                    <Bookmark size={20} />
                                    <span className="font-medium">My Events</span>
                                </Link>
                                <Link 
                                    to={appPath.CREATE_EVENT} 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center space-x-3 p-3 bg-indigo-600 text-white rounded-xl"
                                >
                                    <Plus size={20} />
                                    <span className="font-medium">Create Event</span>
                                </Link>
                                <hr className="border-gray-100" />
                                <div className="flex items-center justify-between p-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                            <Users size={18} />
                                        </div>
                                        <span className="font-bold text-slate-800">{user?.name}</span>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={handleLogout}
                                        className="text-red-500 font-medium px-4 py-2 border border-red-100 rounded-lg hover:bg-red-50 transition"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link 
                                to={appPath.LOGIN} 
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center space-x-2 bg-slate-800 text-white p-3 rounded-xl"
                            >
                                <LogIn size={20} />
                                <span className="font-medium">Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export { NavigationTab };