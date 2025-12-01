import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaFilter } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL;

const BrowseTips = () => {
    const [tips, setTips] = useState([]);
    const [filteredTips, setFilteredTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');

    useEffect(() => {
        fetchTips();
    }, []);

    useEffect(() => {
        filterTips();
    }, [selectedDifficulty, tips]);

    const fetchTips = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/tips`);
            setTips(response.data);
        } catch (error) {
            console.error('Error fetching tips:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterTips = () => {
        if (selectedDifficulty === 'All') {
            setFilteredTips(tips);
        } else {
            const filtered = tips.filter(tip => tip.difficultyLevel === selectedDifficulty);
            setFilteredTips(filtered);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen gradient-bg py-12 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Browse Gardening Tips
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Discover gardening wisdom shared by our community
                    </p>
                </div>

                {/* Filter */}
                <div className="card mb-8 max-w-md mx-auto">
                    <label htmlFor="difficulty-filter" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium mb-2">
                        <FaFilter className="text-primary-600" />
                        <span>Filter by Difficulty Level</span>
                    </label>
                    <select
                        id="difficulty-filter"
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="input-field"
                    >
                        <option value="All">All Levels</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                {/* Tips Table */}
                <div className="card overflow-x-auto">
                    {filteredTips.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                No tips found matching your criteria
                            </p>
                        </div>
                    ) : (
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
                                        Difficulty
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredTips.map((tip) => (
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
                                                by {tip.userName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                                                {tip.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tip.difficultyLevel === 'Easy'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : tip.difficultyLevel === 'Medium'
                                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}>
                                                {tip.difficultyLevel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Link
                                                to={`/tip/${tip._id}`}
                                                className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                                            >
                                                <FaEye />
                                                <span>See More</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="text-center mt-8">
                    <p className="text-gray-600 dark:text-gray-400">
                        Showing {filteredTips.length} of {tips.length} tips
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BrowseTips;
