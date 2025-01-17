import axios from 'axios';
import { CryptoData, ChartData } from '../types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getTopCryptos = async (perPage: number = 50): Promise<CryptoData[]> => {
  const response = await axios.get(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&sparkline=false`
  );
  return response.data;
};

export const getCryptoDetails = async (id: string): Promise<CryptoData> => {
  const response = await axios.get(
    `${BASE_URL}/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&sparkline=false`
  );
  return response.data[0];
};

export const getCryptoChart = async (id: string, days: number = 7): Promise<ChartData> => {
  const response = await axios.get(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );
  return response.data;
};