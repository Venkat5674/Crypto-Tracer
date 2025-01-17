import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoData } from '../types/crypto';

interface CryptoCardProps {
  crypto: CryptoData;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const isPositive = crypto.price_change_percentage_24h > 0;

  return (
    <Link to={`/crypto/${crypto.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
        <div className="flex items-center space-x-4">
          <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{crypto.name}</h3>
            <p className="text-gray-500 uppercase">{crypto.symbol}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">${crypto.current_price.toLocaleString()}</p>
            <p className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;