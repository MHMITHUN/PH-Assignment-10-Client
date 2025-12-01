import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase.config';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register user
    const register = async (email, password, name, photoURL) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            // Update profile
            await updateProfile(result.user, {
                displayName: name,
                photoURL: photoURL
            });
            // Update local user state
            setUser({
                ...result.user,
                displayName: name,
                photoURL: photoURL
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    // Login user
    const login = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    // Google login
    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    };

    // Logout user
    const logout = async () => {
        return await signOut(auth);
    };

    // Monitor auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        register,
        login,
        googleLogin,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
