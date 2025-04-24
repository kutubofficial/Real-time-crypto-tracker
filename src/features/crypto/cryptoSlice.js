import { createSlice } from "@reduxjs/toolkit";
import initialData from "../../mockData/data.json";

const getRandomPercentage = () => {
  const val = (Math.random() * 4 - 2).toFixed(2); // creating number between -2% and +2%
  return (val > 0 ? "+" : "") + val + "%";
};

const getRandomPrice = (price) => {
  const cleanPrice = Number(price.replace(/[^0-9.]/g, "")); //here extract only number and removing symbol
  const variation = cleanPrice * (Math.random() * 0.02 - 0.01);
  return `$${(cleanPrice + variation).toFixed(2)}`;
};

const getRandomVolume = (volume) => {
  const cleanVolume = Number(volume.replace(/[^0-9.]/g, "").replace("B", ""));
  const variation = cleanVolume * (Math.random() * 0.2 - 0.1);
  return `$${(cleanVolume + variation).toFixed(1)}B`;
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    assets: initialData, //this is my initial data
  },
  reducers: {
    updateRandomData: (state) => {
      state.assets = state?.assets?.map((asset) => ({
        ...asset,
        price: getRandomPrice(asset.price),
        "1h_percent": getRandomPercentage(),
        "24h_percent": getRandomPercentage(),
        "7d_percent": getRandomPercentage(),
        volume_24h: getRandomVolume(asset.volume_24h),
      }));
    },
  },
});

export const { updateRandomData } = cryptoSlice.actions;
export const selectAssets = (state) => state?.crypto?.assets;
export default cryptoSlice.reducer;
