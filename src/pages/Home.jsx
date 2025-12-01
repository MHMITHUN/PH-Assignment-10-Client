import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import { Typewriter } from 'react-simple-typewriter';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaHeart, FaSeedling, FaUsers, FaLightbulb, FaArrowRight } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [activeGardeners, setActiveGardeners] = useState([]);
    const [trendingTips, setTrendingTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [gardenersRes, tipsRes] = await Promise.all([
                axios.get(`${API_URL}/api/gardeners/active`),
                axios.get(`${API_URL}/api/tips/trending`)
            ]);
            setActiveGardeners(gardenersRes.data);
            setTrendingTips(tipsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
    };

    const slides = [
        {
            title: 'Community Garden Meetup',
            description: 'Join us for a hands-on workshop on composting and sustainable gardening practices',
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=600&fit=crop',
            date: 'March 15, 2024',
            buttonText: 'Learn More'
        },
        {
            title: 'Spring Planting Festival',
            description: 'Celebrate the season with fellow gardeners and learn about the best spring vegetables',
            image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=1200&h=600&fit=crop',
            date: 'April 1, 2024',
            buttonText: 'Join Event'
        },
        {
            title: 'Hydroponics Workshop',
            description: 'Discover the future of urban gardening with our expert-led hydroponics session',
            image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=600&fit=crop',
            date: 'April 20, 2024',
            buttonText: 'Register Now'
        }
    ];

    const handleLike = async (tipId) => {
        try {
            await axios.patch(`${API_URL}/api/tips/${tipId}/like`);
            // Refresh trending tips
            const res = await axios.get(`${API_URL}/api/tips/trending`);
            setTrendingTips(res.data);
        } catch (error) {
            console.error('Error liking tip:', error);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen">
            {/* Hero Slider */}
            <section className="relative">
                <Slider {...sliderSettings}>
                    {slides.map((slide, index) => (
                        <div key={index} className="relative h-[500px] md:h-[600px]">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                            </div>
                            <div className="relative container mx-auto px-4 h-full flex items-center">
                                <div className="max-w-2xl text-white">
                                    <Fade>
                                        <div className="inline-block bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                                            {slide.date}
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                                        <p className="text-xl mb-8">{slide.description}</p>
                                        <button className="btn-primary">
                                            {slide.buttonText} <FaArrowRight className="inline ml-2" />
                                        </button>
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>

            {/* Typewriter Welcome Section */}
            <section className="py-16 gradient-bg">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Welcome to{' '}
                        <span className="text-primary-600 dark:text-primary-400">
                            <Typewriter
                                words={['GardenHub', 'Your Gardening Community', 'Paradise for Plant Lovers']}
                                loop={0}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Connect with passionate gardeners, share your growing tips, and cultivate knowledge together
                    </p>
                </div>
            </section>

            {/* Featured Gardeners */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <Slide direction="up">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                <FaUsers className="inline mr-3 text-primary-600" />
                                Featured Gardeners
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">Meet our active community members</p>
                        </div>
                    </Slide>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activeGardeners.map((gardener, index) => (
                            <Fade key={gardener._id} delay={index * 100}>
                                <div className="card hover:scale-105 transition-transform duration-300">
                                    <div className="flex items-start space-x-4">
                                        <img
                                            src={gardener.imageUrl}
                                            alt={gardener.name}
                                            className="w-20 h-20 rounded-full object-cover border-4 border-primary-200 dark:border-primary-800"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{gardener.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {gardener.age} years • {gardener.gender}
                                            </p>
                                            <div className="mt-2">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${gardener.status === 'Active'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                    }`}>
                                                    {gardener.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{gardener.bio}</p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Experience: <span className="font-semibold text-primary-600 dark:text-primary-400">{gardener.experience}</span>
                                            </span>
                                            <span className="text-gray-600 dark:text-gray-400">
                                                <FaSeedling className="inline mr-1" />
                                                {gardener.totalSharedTips} tips
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/explore-gardeners" className="btn-primary">
                            Explore All Gardeners
                        </Link>
                    </div>
                </div>
            </section>

            {/* Top Trending Tips */}
            <section className="py-16 gradient-bg">
                <div className="container mx-auto px-4">
                    <Slide direction="up">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                <FaLightbulb className="inline mr-3 text-primary-600" />
                                Top Trending Tips
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">Most loved gardening tips from our community</p>
                        </div>
                    </Slide>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trendingTips.map((tip, index) => (
                            <Fade key={tip._id} delay={index * 100}>
                                <div className="card group">
                                    <div className="relative overflow-hidden rounded-lg mb-4">
                                        <img
                                            src={tip.imageUrl}
                                            alt={tip.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tip.difficultyLevel === 'Easy'
                                                    ? 'bg-green-500 text-white'
                                                    : tip.difficultyLevel === 'Medium'
                                                        ? 'bg-yellow-500 text-white'
                                                        : 'bg-red-500 text-white'
                                                }`}>
                                                {tip.difficultyLevel}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-xs text-primary-600 dark:text-primary-400 font-semibold">
                                            {tip.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{tip.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{tip.description}</p>
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() => handleLike(tip._id)}
                                            className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                                        >
                                            <FaHeart />
                                            <span className="font-semibold">{tip.totalLiked || 0}</span>
                                        </button>
                                        <Link
                                            to={`/tip/${tip._id}`}
                                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/browse-tips" className="btn-primary">
                            Browse All Tips
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-primary-600 dark:bg-primary-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
                        <Fade cascade>
                            <div>
                                <div className="text-5xl font-bold mb-2">500+</div>
                                <div className="text-xl">Active Gardeners</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">1,200+</div>
                                <div className="text-xl">Gardening Tips</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">50+</div>
                                <div className="text-xl">Monthly Events</div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <Slide direction="up">
                        <div className="max-w-3xl mx-auto text-center card bg-gradient-to-r from-primary-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Stay Updated with Our Newsletter
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Get weekly gardening tips, event updates, and exclusive content delivered to your inbox
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input-field flex-1"
                                />
                                <button className="btn-primary whitespace-nowrap">
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </Slide>
                </div>
            </section>
        </div>
    );
};

export default Home;
