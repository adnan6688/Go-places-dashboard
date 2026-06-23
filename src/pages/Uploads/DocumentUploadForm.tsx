import { useEffect, useState } from "react";
import {
  AlertCircle,
  Car,
  FileText,
  GraduationCap,
  ShieldCheck,
  X,
} from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import axiosInstance from "../../baseUrl/baseurl";


type props = {
  type: string;
};

type FileMap = Record<string, File | null>;

const DocumentUploadForm = ({ type }: props) => {
  const [driver, setDriver] = useState("");
  const [category, setCategory] = useState("General Document");

  // each type = one file only
  const [files, setFiles] = useState<FileMap>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fileLimit = type === "Driver" ? 4 : 2;

  const [users, setUsers] = useState<any[]>([]);



  const fetchAllUsers = async () => {
    let page = 1;
    let allData: any[] = [];
    let totalPages = 1;
    do {
      const res = await axiosInstance.get(`/admin/drivers?page=${page}&limit=10`);
      const data = res?.data?.data?.drivers;
      totalPages = res.data?.data?.pagination?.totalPages;
      allData = [...allData, ...data];
      page++;
    } while (page <= totalPages);
    setUsers(allData);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  console.log(users)







  const allCategories = [
    { id: "general", name: "General Document", icon: <FileText size={20} />, showFor: ["Driver", "Rider"] },
    { id: "training", name: "General Training", icon: <GraduationCap size={20} />, showFor: ["Driver"] },
    { id: "record", name: "Driving Record", icon: <Car size={20} />, showFor: ["Driver"] },
    { id: "mndot", name: "MnDOT Training", icon: <ShieldCheck size={20} />, showFor: ["Driver"] },
    { id: "enrollment", name: "Enrollment Agreement", icon: <FileText size={20} />, showFor: ["Rider"] },
  ];

  const isValidFile = (file: File) => {
    const allowed = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    return allowed.includes(file.type);
  };

  // upload per category (NO duplicate type allowed)
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    categoryName: string
  ) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];

    if (!isValidFile(file)) {
      setErrors((p) => ({
        ...p,
        file: "Only PDF, JPG, PNG, WEBP allowed",
      }));
      return;
    }

    setFiles((prev) => {
      const updated = { ...prev };

      // ❌ already exists → replace not duplicate add
      updated[categoryName] = file;

      return updated;
    });

    setErrors((p) => ({ ...p, file: "" }));
  };

  const removeFile = (categoryName: string) => {
    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[categoryName];
      return updated;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedFiles = Object.values(files).filter(Boolean);

    const newErrors: { [key: string]: string } = {};

    if (!driver) newErrors.driver = "Please select a driver";
    if (selectedFiles.length === 0)
      newErrors.file = "Please upload at least one document";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Driver:", driver);
    console.log("Category selected:", category);
    console.log("Files:", files);


  };

  const renderPreview = (file: File) => {
    const url = URL.createObjectURL(file);

    if (file.type === "application/pdf") {
      return (
        <div className="w-full h-24 flex items-center justify-center bg-red-50 text-red-500 rounded-lg">
          📄 PDF File
        </div>
      );
    }

    return (
      <img
        src={url}
        className="w-full h-24 object-cover rounded-lg"
      />
    );
  };

  const selectedCount = Object.keys(files).length;

  return (
    <div className="space-y-6 sm:max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* DRIVER */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-lg font-bold mb-6">
            Select {type === "Driver" ? "Driver" : "Rider"}
          </h2>

          <select
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            className="w-full bg-gray-50 p-3 rounded-xl"
          >
            <option value="">Choose</option>
         

            {users?.map((u) => (
              <option key={u._id} value={u._id}>
                {u?.fullName}
              </option>
            ))}
          </select>

          {errors.driver && (
            <p className="text-red-500 text-xs mt-2 flex gap-1">
              <AlertCircle size={14} /> {errors.driver}
            </p>
          )}
        </div>

        {/* CATEGORY UPLOAD (ONE FILE PER TYPE) */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-lg font-bold mb-4">
            Documents ({selectedCount}/{fileLimit})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allCategories
              .filter((c) => c.showFor.includes(type))
              .map((cat) => (
                <div
                  key={cat.id}
                  className="border border-gray-300 rounded-xl p-4 bg-gray-50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {cat.icon}
                    <span className="font-semibold">{cat.name}</span>
                  </div>

                  {files[cat.name] ? (
                    <div className="relative">
                      {renderPreview(files[cat.name]!)}

                      <button
                        type="button"
                        onClick={() => removeFile(cat.name)}
                        className="absolute top-2 right-2 bg-white p-1 rounded-full"
                      >
                        <X size={14} />
                      </button>

                      <p className="text-xs mt-2 truncate">
                        {files[cat.name]?.name}
                      </p>
                    </div>
                  ) : (
                    <label className="cursor-pointer block text-center bg-white border border-gray-200 py-3 rounded-lg">
                      Upload
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, cat.name)}
                      />
                    </label>
                  )}
                </div>
              ))}
          </div>

          {errors.file && (
            <p className="text-red-500 text-xs mt-3 flex gap-1">
              <AlertCircle size={14} /> {errors.file}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl"
          >
            Upload Documents
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUploadForm;