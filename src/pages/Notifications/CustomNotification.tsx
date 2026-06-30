import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Send, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { allNotifications, deleteNotifications, sentNotification, type TNotifictions } from './notificationsapi';
import Pagination from '../../components/Pagination';
import { ToastMessage } from '../../components/ToastMessage';
import SmallLoading from '../../Loading/SmallLoading';

type UserType = "" | "all" | "driver" | "rider";
type notiType = "announcement" | "alert" | "update" | ""


const CustomNotification = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1)

    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>("")
    const [target, setTarget] = useState<UserType>('')
    const [type, setType] = useState<notiType>('')
    const [load, setLoad] = useState<boolean>(false)



    const [deleteLoad, setDeleteLoad] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<string>('')



    const { data, refetch, isLoading } = useQuery({
        queryKey: ['notifications_data', currentPage],
        queryFn: () => allNotifications(currentPage)
    })

    const onPrev = () => {
        setCurrentPage(currentPage - 1)
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const handleSentNotifications = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoad(true)
        try {
            const result = await sentNotification({ title, body, target, type })
            if (result?.data?.success) {
                setIsModalOpen(false)
                ToastMessage('success', result?.data?.message)
                refetch()
            }
        }
        catch {

        } finally {
            setLoad(false)
        }
    }


    const handleDeleteFunction = async (id: string) => {
        setDeleteLoad(true)
        setDeleteId(id)

        try {
            const res = await deleteNotifications(id)
            if (res?.data?.success) {
                ToastMessage('success', res?.data?.message)
                refetch()
            }
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setDeleteLoad(false)
            setDeleteId('')
        }
    }


    return (
        <div className="bg-[#f8fafc] ">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
                    <p className="text-slate-500">Manage and send global notifications to users</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
                >
                    <Send size={18} />
                    <span>Send Notification</span>
                </button>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-xl border border-slate-200 overflow-hidden shadow-sm">

                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-200">
                            <tr>
                                {['Title', 'Message', 'Target', 'Type', 'Sent At', 'Actions'].map((head) => (
                                    <th key={head} className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? <tr>
                                <td colSpan={100} className="text-center py-10">
                                    <div className="inline-flex justify-center items-center w-full">
                                        <SmallLoading message="notification loading...." />
                                    </div>
                                </td>
                            </tr> : !data?.notifications?.length ? <tr>
                                <td colSpan={100} className="text-center py-8 text-slate-400 font-medium">
                                    notifications not found
                                </td>
                            </tr> : data?.notifications?.map((n: TNotifictions) => (
                                <tr key={n._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 font-medium text-slate-700">{n.title}</td>
                                    <td className="p-4 text-slate-600 max-w-xs truncate">{n.body}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-md text-xs font-bold tracking-wide ${n.target === 'all' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                            n.target === 'driver' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                n.target === 'rider' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                    'text-slate-600 font-medium'
                                            }`}>
                                            {n.target?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${n.type === 'announcement' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                            n.type === 'alert' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                n.type === 'update' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' :
                                                    'bg-slate-50 text-slate-500 border-slate-100'
                                            }`}>
                                            {n.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-500 text-sm">{new Date(n.createdAt).toLocaleString()}</td>
                                    <td className="p-4 text-center">
                                        <button

                                            onClick={() => handleDeleteFunction(n._id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            title="Delete Notification"
                                        >
                                            {
                                                deleteLoad && deleteId == n._id ? <Loader2 className="animate-spin" /> : <Trash2 className=' cursor-pointer' size={18} />
                                            }
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden grid grid-cols-1 divide-y divide-slate-100">
                    {isLoading ? <div>
                        <div  className="text-center py-10">
                            <div className="inline-flex justify-center items-center w-full">
                                <SmallLoading message="notification loading...." />
                            </div>
                        </div>
                    </div> : !data?.notifications?.length ? <div>
                        <div  className="text-center py-8 text-slate-400 font-medium">
                            notifications not found
                        </div>
                    </div> : data?.notifications?.map((n: TNotifictions) => (
                        <div key={n._id} className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-slate-800">{n.title}</h3>
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">{n.type}</span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{n.body}</p>
                            <div className="flex justify-between items-center text-xs pt-2">
                                <span className="text-slate-400">{new Date(n.createdAt).toLocaleString()}</span>
                                <span className="font-medium text-blue-500 italic">To: {n.target}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Pagination currentPage={currentPage} onNext={nextPage} onPrev={onPrev} totalPages={data?.meta?.totalPages}></Pagination>




            {/* Send Notification Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h2 className="text-xl font-bold text-slate-800">New Global Notification</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form className="p-6 space-y-5" onSubmit={handleSentNotifications}>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notification Title</label>
                                    <input
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        required
                                        minLength={5}
                                        onInvalid={(e) =>
                                            e.currentTarget.setCustomValidity(
                                                "Title must be at least 5 characters long."
                                            )
                                        }
                                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                                        placeholder="e.g. System Maintenance"
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message Content</label>
                                    <textarea minLength={10}
                                        onInvalid={(e) =>
                                            e.currentTarget.setCustomValidity(
                                                "Message must be at least 5 characters long."
                                            )
                                        } onChange={(e) => setBody(e.target.value)} rows={3} required placeholder="Write your message here..." className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Target Audience</label>
                                        <select
                                            required

                                            onChange={(e) => setTarget(e.target.value as UserType)}
                                            defaultValue=""
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                        >
                                            <option value="" disabled>
                                                Select User Type
                                            </option>
                                            <option value="all">All Users</option>
                                            <option value="driver">Drivers Only</option>
                                            <option value="rider">Riders Only</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Type</label>
                                        <select onChange={(e) => setType(e.target.value as notiType)} required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none">
                                            <option value="" disabled>
                                                Select  Type
                                            </option>
                                            <option value={'announcement'}>Announcement</option>
                                            <option value={'alert'}>Alert</option>
                                            <option value={'update'}>Update</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                                        Cancel
                                    </button>
                                    <button disabled={load} type="submit" className="flex-1 bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-500 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 flex justify-center items-center gap-2">
                                        {load ? (
                                            <Loader2 className="animate-spin" />
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                <span>Broadcast Now</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomNotification;