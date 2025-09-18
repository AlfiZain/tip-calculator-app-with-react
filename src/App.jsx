import { useState, useEffect } from 'react';
import logo from './assets/images/logo.svg';
import CalculatorInput from './components/CalculatorInput';
import ResultSection from './components/ResultSection';
import { tipPerPerson, totalPerPerson } from './utils/calculateTip';

export default function App() {
  const [formData, setFormData] = useState({
    billAmount: '',
    peopleAmount: '',
  });
  const [selectedTip, setSelectedTip] = useState();
  const [customTip, setCustomTip] = useState('');
  const [results, setResults] = useState({
    tipTotal: 0,
    billTotal: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const tipPercent = customTip || selectedTip;

    const hasEmpty = Object.values({ ...formData, tipPercent }).some(
      (item) => item === undefined || item === null || item === '',
    );
    if (hasEmpty) return;

    const hasZero = Object.values(formData).some((item) => item <= 0);
    if (hasZero) return;

    calculateTip({ ...formData, tipPercent });
  }, [formData, selectedTip, customTip, errors]);

  const handleValueChange = (field) => (values) => {
    const inputValue = values.value;
    setFormData((prev) => ({
      ...prev,
      [field]: inputValue,
    }));

    if (inputValue !== '' && inputValue <= 0) {
      setErrors({
        ...errors,
        [field]: "Can't be zero",
      });
      return;
    }

    setErrors({
      ...errors,
      [field]: '',
    });
  };

  const handleTipClick = (event) => {
    const selected = Number(event.target.value);
    setSelectedTip(selected);
    setCustomTip('');
  };

  const handleCustomTip = (values) => {
    const inputValue = values.value;
    setCustomTip(inputValue);

    if (inputValue !== '') {
      setSelectedTip(undefined);
    }
  };

  const handleResetClick = () => {
    setFormData({
      billAmount: '',
      peopleAmount: '',
    });
    setSelectedTip(undefined);
    setCustomTip('');
    setErrors({});
    setResults({
      tipTotal: 0,
      billTotal: 0,
    });
  };

  const calculateTip = ({ billAmount, peopleAmount, tipPercent }) => {
    const bill = Number(billAmount);
    const tip = Number(tipPercent);
    const people = Number(peopleAmount);

    const tipTotal = tipPerPerson(bill, tip, people);
    const billTotal = totalPerPerson(bill, tipTotal, people);
    setResults({ tipTotal, billTotal });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-Grey-200 font-space-mono font-bold">
      <img src={logo} alt="logo" className="my-8" />
      <div className="grid grid-cols-1 rounded-2xl bg-White md:m-[5%] lg:m-[2.5%] lg:max-w-5xl lg:grid-cols-2">
        <CalculatorInput
          values={formData}
          selectedTip={selectedTip}
          customTip={customTip}
          errors={errors}
          onValueChange={handleValueChange}
          onTipClick={handleTipClick}
          onCustomTipChange={handleCustomTip}
        />
        <ResultSection results={results} onResetClick={handleResetClick} />
      </div>
    </main>
  );
}
