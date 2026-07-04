import { MapPin, Plus, Minus, Send, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dispatchDrivers, dispatchRiders, manualDisptach, type TRideRequest } from "./dispatchRidersAndDrivers";
import { ToastMessage } from "../../components/ToastMessage";

type DispatchFormData = {
  rider: string;
  driver: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  notes?: string;
};

type LocationType = {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

const DispatchForm = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm<DispatchFormData>();
  const [loading, setLoading] = useState<boolean>(false)

  const pickupRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destinationRef = useRef<google.maps.places.Autocomplete | null>(null);

  const stopRefs = useRef<Record<number, google.maps.places.Autocomplete | null>>({});

  const [pickup, setPickup] = useState<LocationType | null>(null);
  const [destination, setDestination] = useState<LocationType | null>(null);
  const [stops, setStops] = useState<LocationType[]>([]);

  const [riderStore, setRiderStore] = useState("");
  const [driverStore, setDriverStore] = useState("");

  const { data: riders } = useQuery({
    queryKey: ["riders"],
    queryFn: dispatchRiders,
  });

  const { data: drivers } = useQuery({
    queryKey: ["drivers", riderStore],
    queryFn: () => dispatchDrivers(riderStore),
    enabled: !!riderStore,
  });

  // ➕ ADD STOP
  const addStop = () => {
    setStops((prev) => [
      ...prev,
      {
        address: "",
        coordinates: { lat: 0, lng: 0 },
      },
    ]);
  };

  // ➖ REMOVE STOP
  const removeStop = (index: number) => {
    setStops((prev) => prev.filter((_, i) => i !== index));
  };

  // ✏️ UPDATE STOP
  const updateStop = (
    index: number,
    place: google.maps.places.PlaceResult
  ) => {
    const copy = [...stops];

    copy[index] = {
      address: place.formatted_address || "",
      coordinates: {
        lat: place.geometry?.location?.lat() || 0,
        lng: place.geometry?.location?.lng() || 0,
      },
    };

    setStops(copy);
  };

  // 🚀 SUBMIT
  const onSubmit = async (data: DispatchFormData) => {
    if (!pickup || !destination || !driverStore || !riderStore) {
      ToastMessage("error", "Missing required location/driver/rider");
      return;
    }

    setLoading(true);

    const payload: TRideRequest = {
      pickupLocation: pickup,
      dropoffLocation: destination,
      stops: stops.length ? stops : undefined,
      scheduledAt: new Date(`${data.date}T${data.time}`).toISOString(),
      notes: data.notes,
      riderUserId: riderStore,
      driverUserId: driverStore,
    };

    try {
      const res = await manualDisptach(payload);

      if (res?.data?.success) {
        ToastMessage("success", res?.data?.message);
        reset();
        setStops([]);
        setPickup(null);
        setDestination(null);
      }
    } catch (er) {
      console.log("error from dispatch", er);
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full p-3 border border-gray-300 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl space-y-6"
      >
        {/* RIDER + DRIVER */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b pb-3">
            <User className="w-5 h-5 text-gray-500" />
            <h2 className="font-semibold">Rider & Driver</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rider */}
            <div className="w-full">
              <select
                {...register("rider", {
                  required: "Please select rider!",
                })}
                className={input}
                onChange={(e) => setRiderStore(e.target.value)}
              >
                <option value="">Select Rider</option>

                {riders?.map((item: any) => (
                  <option key={item.riderId} value={item.riderId}>
                    {item.fullName}
                  </option>
                ))}
              </select>

              {errors.rider && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rider.message}
                </p>
              )}
            </div>

            {/* Driver */}
            <div className="w-full">
              <select
                {...register("driver", {
                  required: "Please select driver!",
                })}
                className={input}
                onChange={(e) => setDriverStore(e.target.value)}
              >
                <option value="">Select Driver</option>

                {drivers?.map((item: any) => (
                  <option key={item.driverId} value={item.driverId}>
                    {item.fullName}
                  </option>
                ))}
              </select>

              {errors.driver && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.driver.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ROUTE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Route Details
          </h2>

          {/* PICKUP */}
          <Autocomplete
            onLoad={(a) => (pickupRef.current = a)}
            onPlaceChanged={() => {
              const place = pickupRef.current?.getPlace();
              if (!place?.geometry) return;

              setPickup({
                address: place.formatted_address || "",
                coordinates: {
                  lat: place.geometry.location?.lat() || 0,
                  lng: place.geometry.location?.lng() || 0,
                },
              });
            }}
          >
            <input
              {...register("pickup", {
                required: "Pickup location is required!"
              })}
              className={`${input}  mb-4`}
              placeholder="Pickup location"
            />
          </Autocomplete>
          {errors.pickup && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pickup.message}
            </p>
          )}



          {/* STOPS */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="font-medium">Stops (optional)</p>
              <button
                type="button"
                onClick={addStop}
                className="flex items-center gap-1 text-blue-600"
              >
                <Plus size={18} /> Add Stop
              </button>
            </div>

            {stops.map((_, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Autocomplete
                  onLoad={(a) => (stopRefs.current[index] = a)}
                  onPlaceChanged={() => {
                    const place =
                      stopRefs.current[index]?.getPlace();

                    if (!place?.geometry) return;

                    updateStop(index, place);
                  }}
                >
                  <input
                    className={input}
                    placeholder={`Stop ${index + 1}`}
                  />
                </Autocomplete>

                <button
                  type="button"
                  onClick={() => removeStop(index)}
                  className="text-red-500"
                >
                  <Minus />
                </button>
              </div>
            ))}
          </div>

          {/* DESTINATION */}
          <Autocomplete
            onLoad={(a) => (destinationRef.current = a)}
            onPlaceChanged={() => {
              const place = destinationRef.current?.getPlace();
              if (!place?.geometry) return;

              setDestination({
                address: place.formatted_address || "",
                coordinates: {
                  lat: place.geometry.location?.lat() || 0,
                  lng: place.geometry.location?.lng() || 0,
                },
              });
            }}
          >
            <input
              {...register("destination", {
                required: "Destination is required",
              })}
              className={`${input} mt-4`}
              placeholder="Destination"
            />
          </Autocomplete>

          {errors.destination && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destination.message}
            </p>
          )}
        </div>

        {/* SCHEDULE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="date"
                {...register("date", {
                  required: "Date is required",
                })}
                className={input}
              />

              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="time"
                {...register("time", {
                  required: "Time is required",
                })}
                className={input}
              />

              {errors.time && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* NOTES */}
        <textarea
          {...register("notes", {
            required: "Notes is required"
          })}
          className={input}
          rows={4}
          placeholder="Notes..."
        />
        {
          errors?.notes && <p className="text-red-500">
            {errors?.notes?.message}
          </p>
        }

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 cursor-pointer rounded-xl flex items-center justify-center gap-2 text-white transition ${loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Dispatching...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Dispatch Ride
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default DispatchForm;