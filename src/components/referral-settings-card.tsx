import React, { useState } from "react";
import { formatTimestamp, nFormatter } from "../utils";
type Props = {
  type: string;
  start_date: string;
  stop_date: string;
  currency: string;
  amount: number;
  status: "active"| "stopped" | "in_progress";
};

const color = {
  active: "#1FCB4F",
  stopped: "#EB5757",
  in_progress: "#0D63D3",
};

const background = {
  stopped: "rgba(255, 154, 152, 0.3)",
  active: "rgba(42, 181, 125, 0.3)",
  in_progress: "rgb(13, 99, 211,0.3)",
};

const ReferralSettingsCard: React.FC<Props> = ({
  type,
  start_date,
  stop_date,
  status,
  currency,
  amount,
}) => {
  const [checked, setChecked] = useState(false);
  const handleToggle = () => setChecked((k) => !k);

  return (
    <div className="bg-[#EAECF0] rounded-lg p-5 font-poppins  cursor-pointer">
      <div className="flex flex-wrap justify-between">
        <h3 className="text-xs lg:text-sm font-bold capitalize">{type}</h3>
        <label className="relative inline-block w-10 h-5">
          <input
            type="checkbox"
            className="hidden"
            checked={checked}
            onChange={handleToggle}
          />
          <span className="block w-10 h-5 bg-gray-300 rounded-full shadow-inner" />
          <span
            className={`absolute block w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 transform ${
              checked ? "translate-x-5" : ""
            }`}
          />
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-[1rem] mt-[2rem]">
        <div>
          <h4 className="text-xs lg:text-sm text-coincard  font-bold capitalize">
            Start Date
          </h4>
          <p className="text-xs lg:text-sm  font-bold mt-2">
            {formatTimestamp(start_date)}
          </p>
        </div>
        <div>
          <h4 className="text-xs lg:text-sm text-coincard  font-bold capitalize">
            Stop Date
          </h4>
          <p className="text-xs lg:text-sm  font-bold mt-2">
            {formatTimestamp(stop_date)}
          </p>
        </div>

        <div>
          <h4 className="text-xs lg:text-sm text-coincard mb-5 font-bold capitalize">
            Status
          </h4>
          <span
            className="w-auto p-2 rounded-lg mt-2 capitalize"
            style={{ color: color[status], background: background[status] }}
          >
            {status}
          </span>
        </div>

        <div>
          <h4 className="text-xs lg:text-sm text-coincard  font-bold capitalize">
            Currency
          </h4>
          <p className="text-xs lg:text-sm  font-bold mt-2">{currency}</p>
        </div>

        <div>
          <h4 className="text-xs lg:text-sm text-coincard  font-bold capitalize">
            Amount
          </h4>
          <p className="text-xs lg:text-sm  font-bold mt-2">
            {nFormatter(amount, 3)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferralSettingsCard;
