import React, { useState } from 'react';
import { useAuth } from '../../Hook/useAuth';
import { changePassword, updateProfileInformationApi } from './settingApi';
import { ToastMessage } from '../../components/ToastMessage';
import { FaEye, FaEyeSlash } from 'react-icons/fa';



export default function Settings() {

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [errors, setErrors] = useState<string>("")
  const [passError, setPassError] = useState<string>("")
  const [load, setLoad] = useState<boolean>(false)


  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [newPassword, setNewPassNow] = useState<string>("")
  const [currentPassword, setCurrentPassword] = useState<string>("")

  const [passLoad, setPassLoad] = useState<boolean>(false)


  const [currentPassShow, setCurrentPassShow] = useState<boolean>(false)
  const [newPasswordShow, setNewPassShow] = useState<boolean>(false)




  const { user, refetchUser } = useAuth()

  // Password State

  const updateProfileInformation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors("")
    setLoad(true)

    if (!fullName && !phone) {
      setErrors("No changes were made");
      setLoad(false)
      return;
    }

    try {
      const result = await updateProfileInformationApi(fullName, phone)
      if (result?.data?.success) {
        ToastMessage('success', result?.data?.message)
        refetchUser()
      }
    }
    catch {
      console.log("")
    }
    finally {
      setLoad(false)
    }

  }


  const updatePassFun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPassLoad(true)
    setPassError("")

    if (currentPassword === newPassword) {
      setPassError("Current password and new password cannot be the same");
      setPassLoad(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError("New password and confirm password do not match");
      setPassLoad(false);
      return;
    }
    try {
      const result = await changePassword(confirmPassword, newPassword, currentPassword)

      if (result?.data?.success) {
        ToastMessage('success', result?.data?.message)
        setConfirmPassword("")
        setNewPassNow("")
        setCurrentPassword("")
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong";

      ToastMessage("error", message);
    }
    finally {
      setPassLoad(false)
    }

  }



  return (
    <div className="flex justify-center bg-gray-50 sm:p-3">
      <div className=" space-y-6">

        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>

        {/* --- Profile Section --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Profile Information</h2>
            <button
              onClick={() => {
                setIsEditing(!isEditing)
                setErrors("")
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <form onSubmit={updateProfileInformation} className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar & Role */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold">
                  {user?.fullName?.charAt(0).toUpperCase() || "A"}
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user?.user?.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                    }`}
                >
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
                    defaultValue={user?.fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                  <input
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 disabled:opacity-70"
                    value={user?.user?.email}

                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                  <input
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 disabled:opacity-70"
                    defaultValue={user?.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {
              errors && <p className='text-red-500'>{errors} </p>
            }

            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={load}
                  className="bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  {load ? "Updating..." : "Save Changes"}
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

          <form onSubmit={updatePassFun} className="p-6 space-y-4 max-w-md">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Current Password
              </label>

              <div className="relative">
                <input
                  type={currentPassShow ? "text" : "password"}
                  required
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setCurrentPassShow(!currentPassShow)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {currentPassShow ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                New Password
              </label>

              <div className="relative">
                <input
                  type={newPasswordShow ? "text" : "password"}
                  required
                  onChange={(e) => setNewPassNow(e.target.value)}
                  className="w-full p-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setNewPassShow(!newPasswordShow)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {newPasswordShow ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Confirm New Password</label>
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"

              />
            </div>
            {
              passError && <p className='text-red-500'>{passError} </p>
            }


            <button type="submit" className="bg-gray-800 cursor-pointer text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-black transition">
              {
                passLoad ? 'Updating...' : 'Update Password'
              }
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}