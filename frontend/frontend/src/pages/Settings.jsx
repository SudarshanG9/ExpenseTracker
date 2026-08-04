import React, { useState, useEffect } from 'react';
import ThresholdForm from '../components/settings/ThresholdForm';
import NotificationSettings from '../components/settings/NotificationSettings';
import ThemeSwitcher from '../components/settings/ThemeSwitcher';
import CurrencySwitcher from '../components/settings/CurrencySwitcher';
import { userAPI } from '../services/api';

const Settings = () => {
    // Profile State
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        initial_balance: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await userAPI.getProfile();
                setProfile(data);
            } catch (err) {
                console.error("Failed to load profile:", err);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handleProfileSave = async (e) => {
        e.preventDefault();
        try {
            const updated = await userAPI.updateProfile(profile);
            setProfile(updated);
            setIsEditingProfile(false);
        } catch (err) {
            console.error("Failed to update profile:", err);
            alert("Failed to update profile.");
        }
    };

    const handleLogout = () => {
        console.log("User triggered logout sequence.");
        alert("Logout triggered. Authentication module pending.");
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div className="h-full max-w-[800px] mx-auto p-4 md:p-6 transition-colors duration-200">

            {/* Header Section */}
            <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage your account settings, preferences, and appearance.
                </p>
            </div>

            <div className="space-y-8">

                {/* SECTION 1: Profile */}
                <section className="bg-white dark:bg-[#151a23] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>
                    <div className="flex flex-col sm:flex-row gap-6 items-start">

                        {/* Avatar */}
                        <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-2xl font-bold border border-purple-200 dark:border-purple-500/20 shrink-0">
                            {profile.name.charAt(0)}
                        </div>

                        {/* Edit Form */}
                        <div className="flex-1 w-full">
                            {isEditingProfile ? (
                                <form onSubmit={handleProfileSave} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            required
                                            className="w-full bg-gray-50 dark:bg-[#0b0e14] border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            required
                                            className="w-full bg-gray-50 dark:bg-[#0b0e14] border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Initial Balance</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={profile.initial_balance}
                                            onChange={(e) => setProfile({ ...profile, initial_balance: parseFloat(e.target.value) })}
                                            required
                                            className="w-full bg-gray-50 dark:bg-[#0b0e14] border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all">
                                            Save Changes
                                        </button>
                                        <button type="button" onClick={() => setIsEditingProfile(false)} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-1">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{profile.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{profile.email}</p>
                                    <button
                                        onClick={() => setIsEditingProfile(true)}
                                        className="mt-2 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 rounded-lg transition-all"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* SECTION 2: Financial Preferences (Imported) */}
                <section className="bg-white dark:bg-[#151a23] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Financial Preferences</h2>
                    <div className="space-y-6">
                        <ThresholdForm />
                        <hr className="border-gray-200 dark:border-gray-800" />
                        <NotificationSettings />
                        <CurrencySwitcher />
                    </div>
                </section>

                {/* SECTION 3: Appearance (Imported) */}
                <section className="bg-white dark:bg-[#151a23] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Appearance</h2>
                    <ThemeSwitcher />
                </section>

                {/* SECTION 4: Account Security */}
                <section className="bg-white dark:bg-[#151a23] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Account Actions</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Temporarily disconnect your session. (Auth integration pending).</p>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-transparent hover:border-red-200 dark:hover:border-red-500/30 rounded-lg transition-all"
                    >
                        Log Out
                    </button>
                </section>

            </div>
        </div>
    );
};

export default Settings;