import React, { useState } from 'react';
import { useAuth } from '../../Hook/useAuth';

// Mock User Data (In a real app, this comes from Auth Context or API)
const initialUser = {
  name: "John Operations",
  email: "john.ops@company.com",
  role: "Staff", // or "Admin"
  phone: "+1 (555) 000-1234",
  avatar: "https://ui-avatars.com/api/?name=John+Operations&background=0D8ABC&color=fff"
};

export default function Settings() {
  const [profile, setProfile] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  

  const {user} = useAuth()

  // Password State




  return (
    <div className="flex justify-center bg-gray-50 sm:p-3">
      <div className=" space-y-6">
        
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>

        {/* --- Profile Section --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Profile Information</h2>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <form  className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar & Role */}
              <div className="flex flex-col items-center space-y-3">
                <img src={ profile.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-gray-50" />
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  profile.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {user?.user?.role}
                </span>
              </div>

              {/* Input Fields */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                  <input 
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 disabled:opacity-70"
                    value={user?.fullName}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                  <input 
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 disabled:opacity-70"
                    value={user?.user?.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                  <input 
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 disabled:opacity-70"
                    value={user?.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>

        {/* --- Password Change Section --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-lg font-semibold text-gray-700">Security</h2>
            <p className="text-xs text-gray-400">Update your password to keep your account secure.</p>
          </div>

          <form  className="p-6 space-y-4 max-w-md">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Current Password</label>
              <input 
                type="password"
                required
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
              
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">New Password</label>
              <input 
                type="password"
                required
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
             
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Confirm New Password</label>
              <input 
                type="password"
                required
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"

              />
            </div>
            
            <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-black transition">
              Update Password
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}