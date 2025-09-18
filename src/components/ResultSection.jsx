export default function ResultSection({ results, onResetClick }) {
  return (
    <section className="mx-8 mb-8 flex flex-col justify-between gap-y-8 overflow-hidden rounded-2xl bg-Green-900 px-4 pt-8 pb-4 text-2xl text-White md:mt-8">
      <div className="flex flex-col gap-y-8">
        <div className="flex items-center justify-between">
          <p className="text-lg">
            Tip Amount <br />
            <span className="text-base text-Grey-500">/ person</span>
          </p>
          <p className="text-3xl text-Grey-400">
            ${results?.tipTotal.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg">
            Total <br />
            <span className="text-base text-Grey-500">/ person</span>
          </p>
          <p className="text-3xl text-Grey-400">
            ${results?.billTotal.toFixed(2)}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onResetClick}
        disabled={results.billTotal <= 0}
        className={`rounded-md px-4 py-2 text-Green-900 transition duration-300 hover:bg-Grey-200 focus:bg-Grey-200 ${results.billTotal > 0 ? 'cursor-pointer bg-Grey-400' : 'cursor-not-allowed bg-Grey-500'}`}
      >
        RESET
      </button>
    </section>
  );
}
