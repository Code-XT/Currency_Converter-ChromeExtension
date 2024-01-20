import "./App.css";
import { useState, useEffect } from "react";

const SwitchCurrency = () => (
  <svg
    className="svg-icon"
    style={{
      width: "1em",
      height: "1em",
      verticalAlign: "middle",
      fill: "currentColor",
      overflow: "hidden",
    }}
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M448 774.4v192l-448-320h1024v128H448z m-448-512h576v-192l448 320H0v-128z"
      fill="##03479c"
    />
  </svg>
);

const Convert = () => {
  const [value, setValue] = useState();
  const [currencies, setCurrencies] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [conversionCurrency, setConversionCurrency] = useState("INR");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchData();
  }, [baseCurrency, conversionCurrency]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        `https://api.currencyapi.com/v3/latest?apikey=cur_live_ko6PfiitK191KUJ9VwGnpYTwqIeIxrSpkCS9SDP6&currencies=${conversionCurrency}&base_currency=${baseCurrency}`
      );

      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }

      const rates = await data.json();
      setResult(rates);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const data = await fetch(
        `https://api.currencyapi.com/v3/latest?apikey=cur_live_ko6PfiitK191KUJ9VwGnpYTwqIeIxrSpkCS9SDP6&currencies`
      );

      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }

      const results = await data.json();
      setCurrencies(results);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBaseCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  const handleConversionCurrencyChange = (e) => {
    setConversionCurrency(e.target.value);
  };

  const handleSwitch = () => {
    setBaseCurrency(conversionCurrency);
    setConversionCurrency(baseCurrency);
  };

  return (
    <>
      <header className="bg-blue-500 text-white py-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-3xl font-extrabold">
            Currency Converter <sub>CX</sub>
          </h1>
          <h4>Includes Popular Crypto</h4>
        </div>
      </header>
      <div className="flex items-center justify-center mt-8">
        <select
          value={baseCurrency}
          onChange={handleBaseCurrencyChange}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 mr-4"
        >
          {currencies?.data &&
            Object.values(currencies.data).map((val) => (
              <option value={`${val.code}`}>{val.code}</option>
            ))}
        </select>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          placeholder="Enter Value"
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 w-48"
        />
        <select
          value={conversionCurrency}
          onChange={handleConversionCurrencyChange}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ml-4"
        >
          {currencies?.data &&
            Object.values(currencies.data).map((val) => (
              <option value={`${val.code}`}>{val.code}</option>
            ))}
        </select>
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handleSwitch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ml-2"
        >
          <SwitchCurrency />
        </button>
      </div>

      {result?.data &&
        Object.values(result.data).map((cur) => (
          <>
            <div className="flex items-center justify-center mt-4">
              <input
                key={cur.code}
                value={cur.value * value}
                type="number"
                placeholder="Converted Value"
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-neutral-700 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 w-48 ml-1"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <p className="items-center justify-center mt-4">{`Exchange Rate: 1 ${baseCurrency} = ${cur.value} ${conversionCurrency}`}</p>
            </div>
            <footer className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-4 text-center">
              <div className="container mx-auto">
                <p>&copy; 2024 Currency Converter. All rights reserved.</p>
                <a href="https://github.com/Code-XT">
                  <p>@CodeX</p>
                </a>
              </div>
            </footer>
          </>
        ))}
    </>
  );
};

export default Convert;
