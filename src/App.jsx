import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ShareTip from './pages/ShareTip';
import BrowseTips from './pages/BrowseTips';
import TipDetails from './pages/TipDetails';
import MyTips from './pages/MyTips';
import UpdateTip from './pages/UpdateTip';
import ExploreGardeners from './pages/ExploreGardeners';
import NotFound from './pages/NotFound';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/browse-tips" element={<BrowseTips />} />
                    <Route path="/explore-gardeners" element={<ExploreGardeners />} />

                    {/* Private Routes */}
                    <Route path="/share-tip" element={
                        <PrivateRoute>
                            <ShareTip />
                        </PrivateRoute>
                    } />
                    <Route path="/my-tips" element={
                        <PrivateRoute>
                            <MyTips />
                        </PrivateRoute>
                    } />
                    <Route path="/update-tip/:id" element={
                        <PrivateRoute>
                            <UpdateTip />
                        </PrivateRoute>
                    } />
                    <Route path="/tip/:id" element={
                        <PrivateRoute>
                            <TipDetails />
                        </PrivateRoute>
                    } />

                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
