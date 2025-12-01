import { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const recaptchaRef = useRef(null);
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verify reCAPTCHA
        const recaptchaValue = recaptchaRef.current?.getValue();
        if (!recaptchaValue) {
            toast.error('Please complete the reCAPTCHA verification');
            return;
        }

        setLoading(true);

        try {
            await login(email, password);
            toast.success('Login successful!');
            navigate(from, { replace: true });

            // Reset reCAPTCHA
            recaptchaRef.current?.reset();
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/user-not-found') {
                toast.error('No account found with this email');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password');
            } else if (error.code === 'auth/invalid-credential') {
                toast.error('Invalid email or password');
            } else {
                toast.error('Login failed. Please try again.');
            }

            // Reset reCAPTCHA on error
            recaptchaRef.current?.reset();
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        // Verify reCAPTCHA for Google login too
        const recaptchaValue = recaptchaRef.current?.getValue();
        if (!recaptchaValue) {
            toast.error('Please complete the reCAPTCHA verification');
            return;
        }

        try {
            await googleLogin();
            toast.success('Login successful!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error('Google login failed. Please try again.');
            recaptchaRef.current?.reset();
        }
    };

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="card">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome Back!</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Login to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* reCAPTCHA v2 - Visible Checkbox */}
                        {siteKey && (
                            <div className="flex justify-center">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={siteKey}
                                    theme="light"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            className="mt-6 w-full flex items-center justify-center space-x-2 btn-secondary"
                        >
                            <FaGoogle className="text-xl text-red-500" />
                            <span>Continue with Google</span>
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
