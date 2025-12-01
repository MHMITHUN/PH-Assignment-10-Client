import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaSeedling } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const ShareTip = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        plantType: '',
        difficultyLevel: 'Easy',
        description: '',
        imageUrl: '',
        category: 'Plant Care',
        availability: 'Public'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${API_URL}/api/tips`, {
                ...formData,
                userEmail: user.email,
                userName: user.displayName
            });
            toast.success('Tip shared successfully!');
            navigate('/my-tips');
        } catch (error) {
            console.error('Error sharing tip:', error);
            toast.error('Failed to share tip. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen gradient-bg py-12 px-4">
            <div className="container mx-auto max-w-3xl">
                <div className="card">
                    <div className="text-center mb-8">
                        <FaSeedling className="text-5xl text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            Share Your Garden Tip
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Help others grow by sharing your gardening wisdom
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Title *
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., How I Grow Tomatoes Indoors"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label htmlFor="plantType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Plant Type/Topic *
                            </label>
                            <input
                                id="plantType"
                                name="plantType"
                                type="text"
                                required
                                value={formData.plantType}
                                onChange={handleChange}
                                placeholder="e.g., Tomatoes, Herbs, Succulents"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label htmlFor="difficultyLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Difficulty Level *
                            </label>
                            <select
                                id="difficultyLevel"
                                name="difficultyLevel"
                                required
                                value={formData.difficultyLevel}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category *
                            </label>
                            <select
                                id="category"
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="Plant Care">Plant Care</option>
                                <option value="Composting">Composting</option>
                                <option value="Vertical Gardening">Vertical Gardening</option>
                                <option value="Hydroponics">Hydroponics</option>
                                <option value="Balcony Gardens">Balcony Gardens</option>
                                <option value="Indoor Gardening">Indoor Gardening</option>
                                <option value="Pest Control">Pest Control</option>
                                <option value="Soil Management">Soil Management</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                rows="6"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Share detailed information about your gardening tip..."
                                className="input-field resize-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Image URL *
                            </label>
                            <input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                required
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Availability *
                            </label>
                            <select
                                id="availability"
                                name="availability"
                                required
                                value={formData.availability}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="Public">Public</option>
                                <option value="Hidden">Hidden</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Email (Read-only)
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    readOnly
                                    className="input-field bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Name (Read-only)
                                </label>
                                <input
                                    type="text"
                                    value={user?.displayName || ''}
                                    readOnly
                                    className="input-field bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sharing...' : 'Share Tip'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/my-tips')}
                                className="flex-1 btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShareTip;
