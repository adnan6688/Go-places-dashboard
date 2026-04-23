
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Define Validation Schema
const formSchema = z.object({
  // Section 1
  fullName: z.string().min(2, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  pmiNumber: z.string().min(1, "PMI number is required"),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  county: z.string().min(1, "County is required"),
  address: z.string().min(5, "Full address is required"),

  // email
  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  // Section 2
  supportInstructions: z.string().optional(),
  serviceNotes: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),

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

  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted Successfully:", data);
    alert("Check console for submitted data!");
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
                <input type="date" {...register("dob")} className={inputClass(errors.dob)} />
              </div>
              <div>
                <label className="text-sm font-medium">PMI Number</label>
                <input {...register("pmiNumber")} placeholder="PMI #" className={inputClass(errors.pmiNumber)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input {...register("phoneNumber")} placeholder="(555) 000-0000" className={inputClass(errors.phoneNumber)} />
              </div>
              <div>
                <label className="text-sm font-medium">County</label>
                <input {...register("county")} placeholder="County" className={inputClass(errors.county)} />
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Rider Email</label>
                <input {...register("email")} placeholder="Rider Email" className={inputClass(errors.email)} />
              </div>
              <div className="relative">
                <label className="text-sm font-medium">
                  Rider Password (One Time)
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    defaultValue={"145356"}
                    {...register("password")}
                    placeholder="Create rider password"
                    className={`${inputClass(errors.password)} pr-10`}
                  />

                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <input type="date" {...register("startDate")} className={inputClass(errors.startDate)} />
              </div>
              <div>
                <label className="text-sm font-medium">End Date</label>
                <input type="date" {...register("endDate")} className={inputClass(errors.endDate)} />
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
            className="bg-[#0073E6] hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md flex items-center transition-all"
          >
            <span className="mr-2">⊙</span> Submit Rider Enrollment
          </button>
        </div>
      </form>
    </div>
  );
};

export default RiderEnrollmentForm;