import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully!');
            setShowUserMenu(false);
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/explore-gardeners', label: 'Explore Gardeners' },
        { to: '/browse-tips', label: 'Browse Tips' },
    ];

    const privateLinks = [
        { to: '/share-tip', label: 'Share a Garden Tip' },
        { to: '/my-tips', label: 'My Tips' },
    ];

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
                        <FaLeaf className="text-3xl" />
                        <span className="text-xl font-bold hidden sm:block">GardenHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-semibold'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        {user && privateLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-semibold'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <FiMoon className="text-xl text-gray-700 dark:text-gray-300" />
                            ) : (
                                <FiSun className="text-xl text-gray-300" />
                            )}
                        </button>

                        {/* User section */}
                        {user ? (
                            <div className="relative hidden md:block">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                    onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
                                >
                                    <img
                                        src={user.photoURL || 'https://via.placeholder.com/40'}
                                        alt={user.displayName}
                                        className="w-10 h-10 rounded-full border-2 border-primary-500 hover:border-primary-600 transition-all duration-200"
                                    />
                                </button>

                                {/* Dropdown menu */}
                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-200 dark:border-gray-700">
                                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                {user.displayName}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                                        >
                                            <FiLogOut />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="hidden md:block btn-primary"
                            >
                                Login / Signup
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            {isMenuOpen ? (
                                <FiX className="text-2xl text-gray-700 dark:text-gray-300" />
                            ) : (
                                <FiMenu className="text-2xl text-gray-700 dark:text-gray-300" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-semibold'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            {user && privateLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-semibold'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            {user ? (
                                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                    <div className="px-4 py-2">
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                            {user.displayName}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                                    >
                                        <FiLogOut />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="btn-primary text-center"
                                >
                                    Login / Signup
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
