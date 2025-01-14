import { useCallback, useState } from "react";
import { CONVERT_MONEY } from "../const/const";

export interface ExchangeRatesResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

const useConvertMoney = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [data, setData] = useState<ExchangeRatesResponse>();
  const [error, setError] = useState<string>("");
  const fetchExchangeRates = useCallback(async (base: string) => {
    setIsConverting(true);
    setError("");

    try {
      const response = await fetch(`${CONVERT_MONEY}?base=${base}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch exchange rates`);
      }
      const result: ExchangeRatesResponse = await response.json();
      setData(result);
      return result;
    } catch (err: any) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      throw new Error(err.message);
    } finally {
      setIsConverting(false);
    }
  }, []);
  return { isConverting, convertData: data, error, fetchExchangeRates };
};

export default useConvertMoney;
