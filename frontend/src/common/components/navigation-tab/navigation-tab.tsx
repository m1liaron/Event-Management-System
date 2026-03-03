import type React from "react";
import {
	Users,
	Plus,
	List,
	Bookmark,
	LogOut,
    LogIn,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { appPath } from "../../enums";
import { useUserStore } from "../../../storage/useAuthStore";

const NavigationTab: React.FC = () => {
    const { isAuthenticated, user, logout } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        if(isAuthenticated) {
            const isLogout = confirm("Are you sure you want to log out?");
            if(isLogout) {
                logout();
            }
        } else {
            navigate(appPath.LOGIN);
        }
    }

    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-8">
                <Link to={appPath.ROOT} className="flex items-center space-x-2 cursor-pointer hover:text-indigo-600">
                    <List size={18} />
                    <span className="font-medium">Events</span>
                </Link>
                {isAuthenticated && (
                    <>
                        <Link to={appPath.MY_EVENTS} className="flex items-center space-x-2 cursor-pointer text-slate-600 hover:text-indigo-600">
                            <Bookmark size={18} />
                            <span className="font-medium">My Events</span>
                        </Link>
                        <Link to={appPath.CREATE_EVENT}>
                            <button
                                type="button"
                                className="flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                <Plus size={18} />
                                <span className="font-medium">Create Event</span>
                            </button>
                        </Link>
                    </>
                )}
            </div>

            <div className="flex items-center space-x-4">
                {isAuthenticated && (
                    <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-full border border-gray-200">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                            <Users size={16} />
                        </div>
                        <span className="font-medium text-sm">{user?.name}</span>
                    </div>
                )}
                {isAuthenticated ? (
                    <LogOut
                        onClick={handleLogout}
                        size={20}
                        className="text-slate-400 cursor-pointer hover:text-red-500"
                    />
                ) : (
                    <LogIn
                        onClick={handleLogout}
                        size={20}
                        className="text-slate-400 cursor-pointer hover:text-red-500"
                    />
                )}
            </div>
        </nav>
    )
};

export { NavigationTab };
