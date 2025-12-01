import { Link } from 'react-router-dom';
import { FaLeaf, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <FaLeaf className="text-3xl text-primary-600 dark:text-primary-400" />
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">GardenHub</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            A thriving community for gardening enthusiasts to share tips, connect with local gardeners, and grow together.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/explore-gardeners" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                                    Explore Gardeners
                                </Link>
                            </li>
                            <li>
                                <Link to="/browse-tips" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                                    Browse Tips
                                </Link>
                            </li>
                            <li>
                                <Link to="/share-tip" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                                    Share Tips
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                                <FaMapMarkerAlt className="mt-1 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                                <span className="text-sm">123 Garden Street, Green City, GC 12345</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                                <FaPhone className="text-primary-600 dark:text-primary-400 flex-shrink-0" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                                <FaEnvelope className="text-primary-600 dark:text-primary-400 flex-shrink-0" />
                                <span className="text-sm">hello@gardenhub.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Follow Us</h4>
                        <div className="flex space-x-4 mb-6">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-all duration-300"
                            >
                                <FaFacebook className="text-lg" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-all duration-300"
                            >
                                <FaTwitter className="text-lg" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-all duration-300"
                            >
                                <FaInstagram className="text-lg" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-primary-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-all duration-300"
                            >
                                <FaYoutube className="text-lg" />
                            </a>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                                Terms of Service
                            </Link>
                            {' • '}
                            <Link to="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} GardenHub. All rights reserved. Built with 💚 for gardening enthusiasts.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
