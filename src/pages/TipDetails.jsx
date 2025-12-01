import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaHeart, FaUser, FaCalendar, FaSeedling, FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL;

const TipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tip, setTip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTip();
    }, [id]);

    const fetchTip = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/tips/${id}`);
            setTip(response.data);
        } catch (error) {
            console.error('Error fetching tip:', error);
            toast.error('Failed to load tip details');
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        try {
            await axios.patch(`${API_URL}/api/tips/${id}/like`);
            // Refresh tip data
            fetchTip();
            toast.success('Tip liked!');
        } catch (error) {
            console.error('Error liking tip:', error);
            toast.error('Failed to like tip');
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!tip) {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Tip not found</h2>
                    <button onClick={() => navigate('/browse-tips')} className="btn-primary">
                        Back to Browse Tips
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen gradient-bg py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors duration-200"
                >
                    <FaArrowLeft />
                    <span>Back</span>
                </button>

                <div className="card">
                    {/* Header Image */}
                    <div className="relative overflow-hidden rounded-xl mb-6">
                        <img
                            src={tip.imageUrl}
                            alt={tip.title}
                            className="w-full h-96 object-cover"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${tip.difficultyLevel === 'Easy'
                                    ? 'bg-green-500 text-white'
                                    : tip.difficultyLevel === 'Medium'
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-red-500 text-white'
                                }`}>
                                {tip.difficultyLevel}
                            </span>
                            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-primary-600 text-white">
                                {tip.category}
                            </span>
                        </div>
                    </div>

                    {/* Title and Meta */}
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            {tip.title}
                        </h1>

                        <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                                <FaUser className="text-primary-600" />
                                <span>{tip.userName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaSeedling className="text-primary-600" />
                                <span>{tip.plantType}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCalendar className="text-primary-600" />
                                <span>{new Date(tip.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose dark:prose-invert max-w-none mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Description</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {tip.description}
                        </p>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Difficulty Level</h3>
                            <p className="text-gray-600 dark:text-gray-400">{tip.difficultyLevel}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Category</h3>
                            <p className="text-gray-600 dark:text-gray-400">{tip.category}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Plant Type</h3>
                            <p className="text-gray-600 dark:text-gray-400">{tip.plantType}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Shared By</h3>
                            <p className="text-gray-600 dark:text-gray-400">{tip.userName}</p>
                        </div>
                    </div>

                    {/* Like Button */}
                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                        <button
                            onClick={handleLike}
                            className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <FaHeart className="text-xl" />
                            <span>Like this tip</span>
                            <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                                {tip.totalLiked || 0}
                            </span>
                        </button>

                        <div className="text-gray-600 dark:text-gray-400">
                            <p className="text-sm">Contact: {tip.userEmail}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TipDetails;
