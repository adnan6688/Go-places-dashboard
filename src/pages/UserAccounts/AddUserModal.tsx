import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, X } from "lucide-react";
import { createStaff } from './staff';
import { ToastMessage } from '../../components/ToastMessage';
import axiosInstance from '../../baseUrl/baseurl';

const isValidPassword = (val: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*])[A-Za-z\d!@#$%&*]{8,}$/;

  return regex.test(val);
};

interface UserData {
  name?: string;
  email?: string;
  role?: 'Admin' | 'Staff' | 'Rider' | 'Driver';
  status?: string
}

interface AddUserModalProps {
  onClose: () => void;
  mode: string;
  initialData?: UserData;
  refetch: () => void;
  editStaffId?: string
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, mode, initialData, refetch, editStaffId }) => {

  const isEdit = mode === 'edit';


  const [successMsg, setSuccessMsg] = useState<string>("")
  const [load, setLoad] = useState<boolean>(false)
  const [showPass, setShowPass] = useState<boolean>(false)

  const [errors, setErrros] = useState<string>("")

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const [active, setIsActive] = useState(false);

  useEffect(() => {
    if (initialData?.status) {
      setIsActive(initialData.status === "active");
    }
  }, [initialData]);
  const addStaff = async () => {
    setErrros('')
    setSuccessMsg('')
    setLoad(true)

    if (password.length < 8) {
      setErrros("Password must be at least 8 characters");
      setLoad(false)
      return;
    }


    if (!isValidPassword(password)) {
      setErrros("Must be 8+ chars, include A, a, 1, and !@#$%&*")
      setLoad(false)
      return
    }


    if (password != confirmPassword) {
      setErrros("Password Doestn't match!")
      setLoad(false)
      return
    }


    try {
      const add = await createStaff(name, email, password);
      if (add?.data?.success) {
        refetch()
        setSuccessMsg(add?.data?.message)
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong";


      ToastMessage("error", msg);
    }
    finally {
      setLoad(false)
      // onClose()
      setName('')
      setPassword('')
      setEmail('')
    }


  }

  const editStaff = async () => {

    try {
      const res = await axiosInstance.patch(`/admin/staffs/update/${editStaffId}`, { fullName: name ? name : initialData?.name, status: active ? 'active' : 'inactive' })

      if (res?.data?.success) {
        ToastMessage('success', res?.data?.message)
        refetch()
        onClose()
      }
    }
    catch (err) {
      //
      console.log(err)
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
          {
            !isEdit && <div className="space-y-1.5">
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
          }




          {!isEdit && (
            <>
              <div className="space-y-1.5 relative">
                <label className="text-sm font-bold text-gray-700">Password</label>

                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all pr-10"
                />

                {/* icon toggle */}
                <div
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                  onClick={() => setShowPass((prev) => !prev)}
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
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
          {
            successMsg && <p className='text-green-500'>{successMsg}</p>
          }



          {
            isEdit && <div className="flex items-center gap-3">
            <button
              onClick={() => setIsActive(!active)}
              className={`w-14 h-7 flex cursor-pointer items-center rounded-full p-1 transition-all duration-300 ${active ? "bg-green-500" : "bg-red-500"
                }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${active ? "translate-x-7" : "translate-x-0"
                  }`}
              />
            </button>

            <span
              className={`font-medium ${active ? "text-green-600" : "text-red-600"
                }`}
            >
              {active ? "Active" : "Inactive"}
            </span>
          </div>
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
              onClick={() => {
                isEdit ? editStaff() : addStaff()
              }}
              disabled={load}
              className="flex-1 disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-md shadow-blue-200 transition-all active:scale-95"
            >
              {isEdit ? 'Update Changes' : load ? 'Staff crateing..' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};