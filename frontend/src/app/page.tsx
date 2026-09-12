"use client";
import React,{useEffect, useState} from "react";
import axios from "axios";
type HouseFeatures = {
  MedInc: number;
  HouseAge: number;
  AveRooms: number;
  AveBedrms: number;
  Population: number;
  AveOccup: number;
  Latitude: number;
  Longitude: number;
};
export default function home(){
  const [house,setHouse] = useState({
  MedInc: "",
  HouseAge: "",
  AveRooms: "",
  AveBedrms: "",
  Population: "",
  AveOccup: "",
  Latitude: "",
  Longitude: ""
  })
  const [prediction, setPrediction] = React.useState<{
  predicted_price: string;
  predicted_price_short: string;
  confidence_range: string;
} | null>(null);

const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState("");
const [buttonDisabled, setButtonDisabled] = React.useState(true);
React.useEffect(() => {
  setButtonDisabled(
    !house.MedInc ||
    !house.HouseAge ||
    !house.AveRooms ||
    !house.AveBedrms ||
    !house.Population ||
    !house.AveOccup ||
    !house.Latitude ||
    !house.Longitude
  );
}, [house]);
  const getpredict = async () =>{
     if (
    Number(house.MedInc) <= 0 ||
    Number(house.HouseAge) <= 0 ||
    Number(house.AveRooms) <= 0 ||
    Number(house.AveBedrms) <= 0 ||
    Number(house.Population) <= 0 ||
    Number(house.AveOccup) <= 0 ||
    Number(house.Latitude) < -90 ||
    Number(house.Latitude) > 90 ||
    Number(house.Longitude) < -180 ||
    Number(house.Longitude) > 180
  ) {
    setError("Please enter valid values for all fields.");
    return;
  }
    try{
       setLoading(true);
    setError("");
    setPrediction(null);

      const response = await axios.post(
      "http://127.0.0.1:8000/predict",
          {
        MedInc: Number(house.MedInc),
        HouseAge: Number(house.HouseAge),
        AveRooms: Number(house.AveRooms),
        AveBedrms: Number(house.AveBedrms),
        Population: Number(house.Population),
        AveOccup: Number(house.AveOccup),
        Latitude: Number(house.Latitude),
        Longitude: Number(house.Longitude),
          }
    );
           setPrediction(response.data);

  } catch (error: any) {
    console.log("Prediction failed", error.message);
    setError(
      error.response?.data?.detail || "Unable to predict house price."
    );
  } finally {
    setLoading(false);
  }
}; return(

  <div className="min-h-screen bg-zinc-950 text-white">
    <div className="mx-auto max-w-5xl px-6 py-12">

      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          California House Price Predictor
        </h1>

        <p className="mt-3 text-zinc-400">
          Enter the details of a California neighborhood to estimate its
          median house value.
        </p>
      </div>

      {/* Input Card */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Median Income */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Median Income
            </label>

            <input
              type="number"
              value={house.MedInc}
              onChange={(e) =>
                setHouse({
                  ...house,
                  MedInc: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-orange-500"
              placeholder="e.g. 8.5"
            />
          </div>

          {/* House Age */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              House Age
            </label>

            <input
              type="number"
              value={house.HouseAge}
              onChange={(e) =>
                setHouse({
                  ...house,
                  HouseAge: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-orange-500"
              placeholder="e.g. 25"
            />
          </div>

          {/* Average Rooms */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Average Rooms
            </label>

            <input
              type="number"
              value={house.AveRooms}
              onChange={(e) =>
                setHouse({
                  ...house,
                  AveRooms: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-orange-500"
              placeholder="e.g. 6.2"
            />
          </div>

          {/* Average Bedrooms */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Average Bedrooms
            </label>

            <input
              type="number"
              value={house.AveBedrms}
              onChange={(e) =>
                setHouse({
                  ...house,
                  AveBedrms: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-orange-500"
              placeholder="e.g. 1.1"
            />
          </div>

          {/* Population */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Population
            </label>

            <input
              type="number"
              value={house.Population}
              onChange={(e) =>
                setHouse({
                  ...house,
                  Population: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-orange-500"
              placeholder="e.g. 1200"
            />
          </div>

          {/* Average Occupancy */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Average Occupancy
            </label>

            <input
              type="number"
              value={house.AveOccup}
              onChange={(e) =>
                setHouse({
                  ...house,
                  AveOccup: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-orange-500"
              placeholder="e.g. 3.0"
            />
          </div>

          {/* Latitude */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Latitude
            </label>

            <input
              type="number"
              value={house.Latitude}
              onChange={(e) =>
                setHouse({
                  ...house,
                  Latitude: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-orange-500"
              placeholder="e.g. 34.2"
            />
          </div>

          {/* Longitude */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Longitude
            </label>

            <input
              type="number"
              value={house.Longitude}
              onChange={(e) =>
                setHouse({
                  ...house,
                  Longitude: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-orange-500"
              placeholder="e.g. -118.3"
            />
          </div>

        </div>

        {/* Predict Button */}
        <button
          onClick={getpredict}
          disabled={buttonDisabled || loading}
          className="mt-8 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict House Price"}
        </button>

        {/* Error */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-400">
            {error}
          </p>
        )}

      </div>

      {/* Prediction Result */}
      {prediction && (
        <div className="mt-8 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-8 text-center backdrop-blur-xl">

          <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            Estimated House Value
          </p>

          <h2 className="mt-3 text-5xl font-bold text-orange-500">
            {prediction.predicted_price}
          </h2>

          <p className="mt-4 text-zinc-400">
            Estimated range:{" "}
            <span className="text-zinc-200">
              {prediction.confidence_range}
            </span>
          </p>

        </div>
      )}

    </div>
  </div>
);
}