import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from "react-hook-form";
import { UploadCloud, Calendar } from 'lucide-react';
import { driverEnrollMent } from './enrollment';
import { ToastMessage } from '../../components/ToastMessage';

// Define the shape of our form data
type FormInputs = {
    fullName: string;
    dob: string;
    phone: string;
    address: string;
    cityStateZip: string;
    licenseNumber: string;
    issuingState: string;
    dotExpiration: string;
    insuranceExpiration: string;
    vehicleMakeModel: string;
    vehicleYear: string;
    licensePlate: string;
    vehicleColor: string;
    vehicleCategory: string;
    seatCount: number;
    email: string;
};

interface InputFieldProps {
    label: string;
    name: keyof FormInputs;
    placeholder?: string;
    type?: string;
    required?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    error?: string;
    options?: string[]; // Added for dropdowns
}

// Reusable Input Component
const InputField: React.FC<InputFieldProps> = ({ label, name, placeholder, type = "text", required = true, register, error, options }) => (
    <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="relative">
            {type === "select" ? (
                <select
                    {...register(name, { required: required ? `${label} is required` : false })}
                    className={`w-full p-2.5 bg-gray-50 border rounded-lg outline-none appearance-none transition-all ${error ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                        }`}
                >
                    <option value="">Select {label}</option>
                    {options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            ) : (
                <input
                    {...register(name, {
                        required: required ? `${label} is required` : false,
                        valueAsNumber: type === "number" // Ensures seat count is a number
                    })}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full p-2.5 bg-gray-50 border rounded-lg outline-none transition-all ${error ? "border-red-500 focus:ring-1 ring-red-500" : "border-gray-200 focus:border-blue-500"
                        }`}
                />
            )}

            {/* Lucide Icons based on type */}
            {type === "date" && <Calendar className="w-4 h-4 absolute right-3 top-3.5 text-gray-400 pointer-events-none" />}
            {type === "select" && (
                <div className="absolute right-3 top-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            )}
        </div>
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
);

const DriverRegistration: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormInputs>();

    const [load, setLoad] = useState<boolean>(false)
    const [files, setFiles] = useState<{ [key: string]: File | null }>({
        licenseCopy: null,
        dotCert: null,
        insuranceProof: null,
        registration: null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const validTypes = [
                'image/jpeg',
                'image/png',
                'image/jpg',
                'application/pdf'
            ];
            if (validTypes.includes(file.type)) {
                setFiles((prev) => ({ ...prev, [key]: file }));
            } else {
                alert("Please upload only JPG or PNG files.");
            }
        }
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        // You can also add validation here to ensure 'files' aren't null if needed
        setLoad(true)
        const finalData = { ...data };

        console.log("Form Data:", finalData);
        const { email, fullName, phone, licensePlate, dotExpiration, address, cityStateZip, dob: dateOfBirth, licenseNumber, issuingState, insuranceExpiration: autoInsuranceExpiration, vehicleMakeModel, vehicleYear, vehicleColor, vehicleCategory, seatCount } = finalData


        const { dotCert, insuranceProof, licenseCopy, registration } = files


        const finalObj = {
            email,
            fullName,
            phone,
            address,
            cityStateZip,
            dateOfBirth,
            seatCount,
            generalDocument: licenseCopy,
            drivingRecord: dotCert,
            generalTraining: insuranceProof,
            mndotTraining: registration,
            vehicle: {
                model: vehicleMakeModel,
                color: vehicleColor,
                licensePlate: licensePlate,
                category: vehicleCategory,
                year: vehicleYear
            },
            licensing: {
                licenseNumber: licenseNumber,
                issuingState,
                autoInsuranceExpiration,
                dotMedicalCardExpiration: dotExpiration
            }
        }

        const formData = new FormData();

        formData.append("email", finalObj?.email);
        formData.append("fullName", finalObj?.fullName);
        formData.append("phone", finalObj?.phone);
        formData.append("address", finalObj?.address);
        formData.append("cityStateZip", finalObj?.cityStateZip);
        formData.append("dateOfBirth", finalObj?.dateOfBirth);
        formData.append("seatCount", finalObj?.seatCount.toString());

        // files
        formData.append("generalDocument", finalObj?.generalDocument as File);
        formData.append("drivingRecord", finalObj.drivingRecord as File);
        formData.append("generalTraining", finalObj.generalTraining as File);
        formData.append("mndotTraining", finalObj.mndotTraining as File);

        // vehicle object → stringify
        formData.append(
            "vehicle",
            JSON.stringify({
                model: vehicleMakeModel,
                color: vehicleColor,
                licensePlate,
                category: vehicleCategory,
                year: vehicleYear,
            })
        );

        // licensing object → stringify
        formData.append("licensing",
            JSON.stringify({
                licenseNumber,
                issuingState,
                autoInsuranceExpiration,
                dotMedicalCardExpiration: dotExpiration,
            })
        );

        try {
            const result = await driverEnrollMent(formData)
            if (result?.success) {
                const msg = result.message
                ToastMessage('success', msg)
            }
        } catch (err : any){
      
            const message = err.message
            ToastMessage('error' ,message)
        }
        finally {
            setLoad(false)
        }




    };

    return (
        <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">

                {/* Section 1: Personal Information */}
                <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800">1. Personal Information</h2>
                    <p className="text-xs text-gray-500 mb-4">Driver's personal details</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-1">
                            <InputField label="Full Name" name="fullName" placeholder="Enter full name" register={register} error={errors.fullName?.message} />
                            <InputField label="Driver Email" name="email" placeholder="Enter driver email" register={register} error={errors.fullName?.message} />
                        </div>
                        <div className='md:columns-1 '>
                            <InputField label="Date of Birth" name="dob" type="date" register={register} error={errors.dob?.message} />
                            <InputField label="Phone Number" name="phone" placeholder="(555) 000-0000" register={register} error={errors.phone?.message} />
                        </div>
                        <div className="md:col-span-2">
                            <InputField label="Residential Address" name="address" placeholder="Street address" register={register} error={errors.address?.message} />
                        </div>
                        <div className="md:col-span-2">
                            <InputField label="City / State / Zip" name="cityStateZip" placeholder="City, State ZIP" register={register} error={errors.cityStateZip?.message} />
                        </div>
                    </div>
                </section>

                {/* Section 2: Licensing & Certification */}
                <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800">2. Licensing & Certification</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <InputField label="Driver's License Number" name="licenseNumber" placeholder="License #" register={register} error={errors.licenseNumber?.message} />
                        <InputField label="Issuing State" name="issuingState" placeholder="State" register={register} error={errors.issuingState?.message} />
                        <InputField label="DOT Medical Card Expiration" name="dotExpiration" type="date" register={register} error={errors.dotExpiration?.message} />
                        <InputField label="Auto Insurance Expiration" name="insuranceExpiration" type="date" register={register} error={errors.insuranceExpiration?.message} />
                    </div>
                </section>

                {/* Section 3: Document Upload */}
                <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800">3. Document Upload Checklist</h2>
                    <div className="space-y-3 mt-4">
                        {[
                            { id: 'licenseCopy', label: "General Document" },
                            { id: 'dotCert', label: "Driving Record" },
                            { id: 'insuranceProof', label: "General Training" },
                            { id: 'registration', label: "MnDOT Training" },
                        ].map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full border-2 transition-colors ${files[doc.id] ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`} />
                                    <span className="text-sm text-gray-700">{doc.label}</span>
                                </div>
                                <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                                    <UploadCloud className="w-4 h-4 text-gray-500" />
                                    {files[doc.id] ? "Uploaded" : "Upload"}
                                    <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={(e) => handleFileChange(e, doc.id)} />
                                </label>
                            </div>
                        ))}
                    </div>
                </section>


                <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-bold text-gray-800">4. Vehicle Information</h2>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Details of the driver's vehicle</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <InputField
                            label="Make / Model"
                            name="vehicleMakeModel"
                            placeholder="e.g. Toyota Camry"
                            register={register}
                            error={errors.vehicleMakeModel?.message}
                        />

                        <InputField
                            label="Category"
                            name="vehicleCategory"
                            type="select"
                            options={["sedan", "suv", "minivan", "wheelchair_van"]}
                            register={register}
                            error={errors.vehicleCategory?.message}
                        />

                        <InputField
                            label="Year"
                            name="vehicleYear"
                            placeholder="2024"
                            register={register}
                            error={errors.vehicleYear?.message}
                        />

                        <InputField
                            label="License Plate Number"
                            name="licensePlate"
                            placeholder="ABC-1234"
                            register={register}
                            error={errors.licensePlate?.message}
                        />

                        <InputField
                            label="Vehicle Color"
                            name="vehicleColor"
                            placeholder="Color"
                            register={register}
                            error={errors.vehicleColor?.message}
                        />

                        <InputField
                            label="Total Seat Count"
                            name="seatCount"
                            type="number"
                            placeholder="e.g. 5"
                            register={register}
                            error={errors.seatCount?.message}
                        />
                    </div>
                </section>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={load}
                        className="w-full  disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-12 rounded-lg transition-all shadow-md active:scale-[0.98]"
                    >
                        {
                            load ? "Creating Driver..." : "Submit Driver Registration"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DriverRegistration;