import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL;

const MyTips = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyTips();
    }, [user]);

    const fetchMyTips = async () => {
        if (!user?.email) return;

        try {
            const response = await axios.get(`${API_URL}/api/tips/user/${user.email}`);
            setTips(response.data);
        } catch (error) {
            console.error('Error fetching tips:', error);
            toast.error('Failed to load your tips');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, title) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete "${title}"? This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/api/tips/${id}`);
                toast.success('Tip deleted successfully!');
                fetchMyTips(); // Refresh the list
            } catch (error) {
                console.error('Error deleting tip:', error);
                toast.error('Failed to delete tip');
            }
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen gradient-bg py-12 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            My Garden Tips
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage all your shared gardening tips
                        </p>
                    </div>
                    <Link to="/share-tip" className="mt-4 md:mt-0 btn-primary">
                        Share New Tip
                    </Link>
                </div>

                {tips.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                            You haven't shared any tips yet
                        </p>
                        <Link to="/share-tip" className="btn-primary">
                            Share Your First Tip
                        </Link>
                    </div>
                ) : (
                    <div className="card overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Likes
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {tips.map((tip) => (
                                    <tr key={tip._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={tip.imageUrl}
                                                alt={tip.title}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {tip.title}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {tip.plantType}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                                                {tip.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tip.availability === 'Public'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                }`}>
                                                {tip.availability}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                            {tip.totalLiked || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center space-x-3">
                                                <Link
                                                    to={`/tip/${tip._id}`}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                                    title="View Details"
                                                >
                                                    <FaEye className="text-lg" />
                                                </Link>
                                                <Link
                                                    to={`/update-tip/${tip._id}`}
                                                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                                                    title="Edit"
                                                >
                                                    <FaEdit className="text-lg" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(tip._id, tip.title)}
                                                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                                    title="Delete"
                                                >
                                                    <FaTrash className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="text-center mt-8">
                    <p className="text-gray-600 dark:text-gray-400">
                        Total tips: {tips.length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyTips;
