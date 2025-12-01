import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaSeedling } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL;

const ExploreGardeners = () => {
    const [gardeners, setGardeners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGardeners();
    }, []);

    const fetchGardeners = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/gardeners`);
            setGardeners(response.data);
        } catch (error) {
            console.error('Error fetching gardeners:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen gradient-bg py-12 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        <FaUser className="inline mr-3 text-primary-600" />
                        Explore Gardeners
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Connect with passionate gardeners from our community
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gardeners.map((gardener, index) => (
                        <Fade key={gardener._id} delay={index * 50}>
                            <div className="card hover:scale-105 transition-all duration-300">
                                <div className="flex flex-col items-center text-center">
                                    <img
                                        src={gardener.imageUrl}
                                        alt={gardener.name}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-primary-200 dark:border-primary-800 mb-4"
                                    />
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                        {gardener.name}
                                    </h3>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        <span>{gardener.age} years</span>
                                        <span>•</span>
                                        <span>{gardener.gender}</span>
                                    </div>

                                    <div className="mb-4">
                                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${gardener.status === 'Active'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {gardener.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                        {gardener.bio}
                                    </p>

                                    <div className="w-full pt-6 border-t border-gray-200 dark:border-gray-700">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Experience</p>
                                                <p className="font-bold text-primary-600 dark:text-primary-400">
                                                    {gardener.experience}
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tips Shared</p>
                                                <p className="font-bold text-primary-600 dark:text-primary-400 flex items-center justify-center">
                                                    <FaSeedling className="mr-1" />
                                                    {gardener.totalSharedTips}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    ))}
                </div>

                {gardeners.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            No gardeners found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExploreGardeners;
