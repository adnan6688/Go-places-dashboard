import { MapPin, Plus, Minus, Send, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dispatchDrivers, dispatchRiders } from "./dispatchRidersAndDrivers";

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
  const { register, handleSubmit } = useForm<DispatchFormData>();

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
  const onSubmit = (data: DispatchFormData) => {
    const payload = {
      pickupLocation: pickup,
      stops,
      dropoffLocation: destination,
      scheduledAt: new Date(`${data.date}T${data.time}`).toISOString(),
      notes: data.notes,
      riderUserId: riderStore,
      driverUserId: driverStore,
    };

    console.log("🔥 FINAL PAYLOAD", payload);
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

          <div className="grid grid-cols-2 gap-4">
            <select
              {...register("rider")}
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

            <select
              {...register("driver")}
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
              {...register("pickup")}
              className={`${input} mb-4`}
              placeholder="Pickup location"
            />
          </Autocomplete>

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
              {...register("destination")}
              className={`${input} mt-4`}
              placeholder="Destination"
            />
          </Autocomplete>
        </div>

        {/* SCHEDULE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <input type="date" {...register("date")} className={input} />
            <input type="time" {...register("time")} className={input} />
          </div>
        </div>

        {/* NOTES */}
        <textarea
          {...register("notes")}
          className={input}
          rows={4}
          placeholder="Notes..."
        />

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Dispatch Ride
        </button>
      </form>
    </div>
  );
};

export default DispatchForm;