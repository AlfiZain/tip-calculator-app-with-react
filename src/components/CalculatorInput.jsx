import { NumericFormat } from 'react-number-format';
import iconDollar from '../assets/images/icon-dollar.svg';
import iconPerson from '../assets/images/icon-person.svg';

export default function CalculatorInput({
  values,
  selectedTip,
  customTip,
  errors,
  onValueChange,
  onTipClick,
  onCustomTipChange,
}) {
  const tipOptions = [5, 10, 15, 25, 50];
  return (
    <form className="flex flex-col gap-y-8 p-8" aria-label="calculator form">
      <div className="flex flex-col gap-y-4">
        <label
          htmlFor="billAmount"
          className="flex items-center justify-between text-xl text-Grey-500"
        >
          Bill
          {errors?.billAmount && (
            <span role="alert" className="text-right text-red-500">
              {errors?.billAmount}
            </span>
          )}
        </label>
        <div className="flex cursor-pointer items-center rounded-md bg-Grey-50 px-4 py-2 transition duration-300 focus-within:ring-2 focus-within:ring-Grey-400 hover:ring-2 hover:ring-Grey-400">
          <img
            src={iconDollar}
            alt="dollar"
            className="pointer-events-none h-auto w-3"
          />
          <NumericFormat
            id="billAmount"
            name="billAmount"
            value={values.billAmount}
            onValueChange={onValueChange('billAmount')}
            placeholder="0"
            decimalScale={2}
            decimalSeparator="."
            thousandSeparator=","
            className="w-full cursor-pointer text-right text-2xl text-Green-900 outline-none placeholder:text-2xl"
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <label htmlFor="customTip" className="text-xl text-Grey-500">
          Select Tip %
        </label>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {tipOptions.map((option, index) => (
            <button
              key={index}
              value={option}
              onClick={onTipClick}
              type="button"
              className={`cursor-pointer rounded-md px-8 py-4 text-2xl transition duration-300 hover:bg-Grey-400 hover:text-Green-900 ${selectedTip === option ? 'bg-Grey-400 text-Green-900' : 'bg-Green-900 text-White'}`}
            >
              {option}%
            </button>
          ))}
          <NumericFormat
            id="customTip"
            name="customTip"
            value={customTip}
            onValueChange={onCustomTipChange}
            placeholder="Custom"
            decimalScale={0}
            thousandSeparator=","
            className="durat3- cursor-pointer rounded-md bg-Grey-50 px-4 text-right text-2xl text-Green-900 transition outline-none placeholder:text-2xl hover:ring-2 hover:ring-Grey-400 focus:ring-2 focus:ring-Grey-400"
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <label
          htmlFor="peopleAmount"
          className="flex items-center justify-between text-xl text-Grey-500"
        >
          Number of People
          {errors?.peopleAmount && (
            <span role="alert" className="text-right text-red-500">
              {errors?.peopleAmount}
            </span>
          )}
        </label>
        <div className="flex cursor-pointer items-center rounded-md bg-Grey-50 px-4 py-2 transition duration-300 focus-within:ring-2 focus-within:ring-Grey-400 hover:ring-2 hover:ring-Grey-400">
          <img
            src={iconPerson}
            alt="person icon"
            className="pointer-events-none h-auto w-3"
          />
          <NumericFormat
            id="peopleAmount"
            name="peopleAmount"
            value={values.peopleAmount}
            onValueChange={onValueChange('peopleAmount')}
            placeholder="0"
            decimalScale={0}
            thousandSeparator=","
            className="w-full cursor-pointer text-right text-2xl text-Green-900 outline-none placeholder:text-2xl"
          />
        </div>
      </div>
    </form>
  );
}
