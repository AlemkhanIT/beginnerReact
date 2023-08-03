import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Block } from './Block';

function App() {
  const [toCurrency, setToCurrency] = useState("usd");
  const [fromCurrency, setFromCurrency] = useState("kzt");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);


  const [rates, setRates] = useState({});
  useEffect(()=>{
    fetch("https://www.floatrates.com/daily/usd.json").then(res=>res.json()).then(json=>{
      setRates(json);
      setRates((prev)=>({
        ...prev,
        "usd": {
          "rate" : 1,
        }
      }))
    }).catch(err=>{
      console.warn(err);
      alert("DB error");
    })
  },[]);

  const onChangeFromPrice = (value) => {
    if (!rates[fromCurrency] || !rates[toCurrency]) {
      return;
    }
    const price = (value / rates[fromCurrency].rate) * rates[toCurrency].rate;
    setFromPrice(value);
    setToPrice(price);
  };
  const onChangeToPrice = (value) => {
    if (!rates[fromCurrency] || !rates[toCurrency]) {
      return;
    }
    const price = (rates[fromCurrency].rate / rates[toCurrency].rate) * value;
    setToPrice(value);
    setFromPrice(price);
  };
  
  useEffect(()=>{
    onChangeFromPrice(fromPrice);
  },[fromCurrency]);

  useEffect(()=>{
    onChangeToPrice(toPrice);
  },[toCurrency]);
  
  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;