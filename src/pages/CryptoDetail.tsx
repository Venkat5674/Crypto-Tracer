import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getCryptoDetails, getCryptoChart } from '../services/api';
import { CryptoData, ChartData } from '../types/crypto';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe } from 'lucide-react';

const CryptoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [crypto, setCrypto] = useState<CryptoData | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const [cryptoData, chartInfo] = await Promise.all([
            getCryptoDetails(id),
            getCryptoChart(id)
          ]);
          setCrypto(cryptoData);
          setChartData(chartInfo);
        }
      } catch (error) {
        console.error('Error fetching crypto details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading || !crypto || !chartData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const chartFormattedData = chartData.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    price: price
  }));

  const isPositive = crypto.price_change_percentage_24h > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <img src={crypto.image} alt={crypto.name} className="w-16 h-16" />
          <div>
            <h1 className="text-3xl font-bold">{crypto.name}</h1>
            <p className="text-gray-500 uppercase">{crypto.symbol}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</p>
            <p className={`flex items-center justify-end ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <DollarSign className="w-5 h-5" />
              <span>Market Cap</span>
            </div>
            <p className="text-xl font-semibold">${crypto.market_cap.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <BarChart3 className="w-5 h-5" />
              <span>Volume (24h)</span>
            </div>
            <p className="text-xl font-semibold">${crypto.total_volume.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <Globe className="w-5 h-5" />
              <span>Market Rank</span>
            </div>
            <p className="text-xl font-semibold">#{crypto.market_cap_rank}</p>
          </div>
        </div>

        <div className="h-[400px]">
          <h2 className="text-xl font-bold mb-4">Price Chart (7 Days)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartFormattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetail;