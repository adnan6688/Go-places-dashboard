import React, { useState } from 'react';
import { X } from "lucide-react";


interface UserData {
  name?: string;
  email?: string;
  role?: 'Admin' | 'Staff' | 'Rider' | 'Driver';
}

interface AddUserModalProps {
  onClose: () => void;
  mode: string;
  initialData?: UserData;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, mode, initialData }) => {

  const isEdit = mode === 'edit';

  const [errors, setErrros] = useState<string>("")

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")


  const addStaff = async () => {

    console.log(name, email, password, confirmPassword)
    if (password != confirmPassword) {
      setErrros("Password Doestn't match!")
    }

  }




  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">


        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? 'Edit Staff Details' : 'Add New Staff'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Full Name</label>
            <input
              type="text"
              required
              defaultValue={isEdit && initialData?.name || ''}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Khan"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Email Address</label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={isEdit && initialData?.email || ''}
              placeholder="name@company.com"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>




          {!isEdit && (
            <>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </>
          )}
          {
            errors && <p className='text-red-500'>{errors}</p>
          }

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col-reverse sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={addStaff}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-md shadow-blue-200 transition-all active:scale-95"
            >
              {isEdit ? 'Update Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};