
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { enrollmentRider } from './enrollment';
import { ToastMessage } from '../../components/ToastMessage';
import { useState } from 'react';


// Define Validation Schema
const formSchema = z.object({
  // Section 1
  fullName: z.string().min(2, "Full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  pmiNumber: z.string().optional(),
  phone: z.string().optional(),
  county: z.string().min(1, "County is required"),
  address: z.string().min(5, "Full address is required"),

  riderType: z.string(),

  // email
  email: z.string().email("Invalid email address"),



  // Section 2
  supportInstructions: z.string().optional(),
  serviceNotes: z.string().optional(),
  serviceStartDate: z.string().min(1, "Start date is required"),
  serviceEndDate: z.string().min(1, "End date is required"),

  // Section 3
  caseManagerName: z.string().min(2, "Case manager name is required"),
  caseEmail: z.string().email("Invalid email address"),
  casePhone: z.string().min(10, "Valid phone number required"),

  // Section 4
  oneWayQty: z.number().min(0),
  oneWayRate: z.number().min(0),
  mileageQty: z.number().min(0),
  mileageRate: z.number().min(0),
});

type FormData = z.infer<typeof formSchema>;

const RiderEnrollmentForm = () => {


  const [load, setLoad] = useState<boolean>(false)

  const { register, handleSubmit, watch, formState: { errors }, } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oneWayQty: 0,
      oneWayRate: 0,
      mileageQty: 0,
      mileageRate: 0,
    }
  });

  // Watch values for real-time cost calculation
  const values = watch();
  const oneWayTotal = (values.oneWayQty || 0) * (values.oneWayRate || 0);
  const mileageTotal = (values.mileageQty || 0) * (values.mileageRate || 0);

  const onSubmit = async (data: FormData) => {

    setLoad(true)
    const { address, fullName, county, dateOfBirth, email, serviceNotes, riderType, pmiNumber, mileageRate, mileageQty, casePhone, oneWayRate, oneWayQty, caseEmail, caseManagerName, serviceEndDate, serviceStartDate, supportInstructions, phone } = data


    const caseManager = {
      name: caseManagerName,
      phone: casePhone,
      email: caseEmail
    }

    const transportAuthorization = {
      oneWayTransport: {
        unitRate: oneWayRate,
        unitQuantity: oneWayQty
      },
      mileageReimbursement: {
        unitRate: mileageRate,
        unitQuantity: mileageQty
      }
    }


    const sendData = { address, email, transportAuthorization, riderType, caseManager, fullName, county, dateOfBirth, pmiNumber, serviceEndDate, serviceStartDate, supportInstructions, phone, serviceNotes }

    try {
      const res = await enrollmentRider(sendData)

      if (res?.success) {
        const msg = res?.message
        ToastMessage('success', msg)
      }

    }
    catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong";

      ToastMessage('error', message)
    } finally {
      setLoad(false)
    }

  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputClass = (error?: any) => `
    w-full p-2 bg-gray-50 border rounded-md outline-none transition-colors
    ${error ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-blue-500'}
  `;




  return (
    <div className=" ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* SECTION 1: Rider Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">1. Rider Information</h2>
          <p className="text-sm text-gray-500 mb-4">Personal details of this rider</p>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input {...register("fullName")} placeholder="Enter full name" className={inputClass(errors.fullName)} />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <input type="date" {...register("dateOfBirth")} className={inputClass(errors.dateOfBirth)} />
              </div>
              <div>
                <label className="text-sm font-medium">PMI Number</label>
                <input {...register("pmiNumber")} placeholder="PMI #" className={inputClass(errors.pmiNumber)} />
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  {...register("phone", {
                    required: "Phone number required",
                    pattern: {
                      value: /^\(\d{3}\)\s\d{3}-\d{4}$/,
                      message: "Use format like (555) 000-0000"
                    }
                  })}
                  placeholder="(555) 000-0000"
                  className={inputClass(errors.phone)}
                />
              </div>


              <div>
                <label className="text-sm font-medium">County</label>
                <input {...register("county")} placeholder="County" className={inputClass(errors.county)} />
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Email */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Rider Email
                </label>

                <input
                  {...register("email", { required: "Email is required" })}
                  placeholder="Rider Email"
                  className={`border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                />

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Rider Type */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Rider Type
                </label>

                <select
                  {...register("riderType", { required: "Select rider type" })}
                  className={`border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.riderType ? "border-red-500" : "border-gray-300"
                    }`}
                >
                  <option value="">Select service type</option>
                  <option value="standard">Standard</option>
                  <option value="assist">Assist</option>
                  <option value="wheelchair">Wheelchair</option>
                </select>

                {errors.riderType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.riderType.message}
                  </p>
                )}
              </div>

            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <input {...register("address")} placeholder="Full address" className={inputClass(errors.address)} />
            </div>



          </div>
        </div>

        {/* SECTION 2: Service & Support */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">2. Service & Support Details</h2>
          <p className="text-sm text-gray-500 mb-4">Accessibility needs and dates</p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Support Instructions</label>
              <textarea {...register("supportInstructions")} className={inputClass()} rows={2} placeholder="List accessibility needs..." />
            </div>
            <div>
              <label className="text-sm font-medium">Service Notes</label>
              <textarea {...register("serviceNotes")} className={inputClass()} rows={2} placeholder="additional service notes..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <input type="date" {...register("serviceStartDate")} className={inputClass(errors.serviceStartDate)} />
              </div>
              <div>
                <label className="text-sm font-medium">End Date</label>
                <input type="date" {...register("serviceEndDate")} className={inputClass(errors.serviceEndDate)} />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Case Management */}
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-2 border-gray-100">
          <h2 className="text-lg font-bold text-[#121721]">3. Case Management Contact</h2>
          <h3 className='text-sm text-[#737B8C]'>Case manager details for coordination</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Case Manager Name</label>
              <input {...register("caseManagerName")} placeholder='Full name' className={inputClass(errors.caseManagerName)} />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input {...register("caseEmail")} placeholder='example@gmail.com' className={inputClass(errors.caseEmail)} />
            </div>
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <input {...register("casePhone")} placeholder='0181132345' className={inputClass(errors.casePhone)} />
            </div>
          </div>
        </div>

        {/* SECTION 4: Authorization (Calculations) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">4. Transportation Authorization</h2>

          <div className="mt-4 space-y-6">
            {/* One-Way Transport */}
            <div>
              <label className="text-sm font-bold block mb-2">One-Way Transport (T2003)</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-gray-500">Unit Quantity</span>
                  <input type="number" {...register("oneWayQty", { valueAsNumber: true })} className={inputClass()} />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Unit Rate ($)</span>
                  <input type="number" step="0.01" {...register("oneWayRate", { valueAsNumber: true })} className={inputClass()} />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Total Cost ($)</span>
                  <div className="p-2 bg-gray-100 border rounded-md font-semibold">${oneWayTotal.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Mileage */}
            <div>
              <label className="text-sm font-bold block mb-2">Mileage Reimbursement</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-gray-500">Unit Quantity</span>
                  <input type="number" {...register("mileageQty", { valueAsNumber: true })} className={inputClass()} />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Unit Rate ($)</span>
                  <input type="number" step="0.01" {...register("mileageRate", { valueAsNumber: true })} className={inputClass()} />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Total Cost ($)</span>
                  <div className="p-2 bg-gray-100 border rounded-md font-semibold">${mileageTotal.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={load}
            className="bg-[#0073E6] cursor-pointer hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl shadow-md flex items-center transition-all"
          >
            {load ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Loading...
              </span>
            ) : (
              <>
                <span className="mr-2">⊙</span>
                Submit Rider Enrollment
              </>
            )}
          </button>
        </div>


      </form>
    </div>
  );
};

export default RiderEnrollmentForm;