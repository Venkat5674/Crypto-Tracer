import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { getTopCryptos } from '../services/api';
import { CryptoData } from '../types/crypto';
import CryptoCard from '../components/CryptoCard';

const Home = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const data = await getTopCryptos();
        setCryptos(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cryptocurrency Tracker
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCryptos.map(crypto => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
};

export default Home;