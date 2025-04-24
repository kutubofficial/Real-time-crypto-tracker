import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAssets, updateRandomData } from "../features/crypto/cryptoSlice";

const CryptoTable = () => {
  const dispatch = useDispatch();
  const cryptoData = useSelector(selectAssets);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateRandomData());
    }, 1500); // this update every 1.5 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  const getColorClass = (value) => {
    if (value.startsWith("+")) return "text-green-600 font-medium";
    if (value.startsWith("-")) return "text-red-600 font-medium";
    return "text-gray-600"; //here we're adding red and green color based on +/-
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto text-sm border rounded-xl overflow-hidden shadow-md bg-white">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Logo</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Symbol</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">1h %</th>
            <th className="px-4 py-2 text-left">24h %</th>
            <th className="px-4 py-2 text-left">7d %</th>
            <th className="px-4 py-2 text-left">Market Cap</th>
            <th className="px-4 py-2 text-left">24h Volume</th>
            <th className="px-4 py-2 text-left">Circulating Supply</th>
            <th className="px-4 py-2 text-left">Max Supply</th>
            <th className="px-4 py-2 text-left">7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData?.map((coin, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">
                <div className="h-10 w-10 object-cover object-center">
                  <img src={coin.logo} alt={coin.name} className="h-10 w-10 " />
                </div>
              </td>
              <td className="px-4 py-2">{coin.name}</td>
              <td className="px-4 py-2">{coin.symbol}</td>
              <td className="px-4 py-2">{coin.price}</td>
              <td className={`px-4 py-2 ${getColorClass(coin["1h_percent"])}`}>
                {coin["1h_percent"]}
              </td>
              <td className={`px-4 py-2 ${getColorClass(coin["24h_percent"])}`}>
                {coin["24h_percent"]}
              </td>
              <td className={`px-4 py-2 ${getColorClass(coin["7d_percent"])}`}>
                {coin["7d_percent"]}
              </td>
              <td className="px-4 py-2">{coin.market_cap}</td>
              <td className="px-4 py-2">{coin.volume_24h}</td>
              <td className="px-4 py-2">{coin.circulating_supply}</td>
              <td className="px-4 py-2">{coin.max_supply}</td>
              <td className="px-4 py-2">{coin.chart_7d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
