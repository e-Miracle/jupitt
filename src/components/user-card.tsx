import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";

type Props = {
  image: string;
  coinName: string;
  balance: number;
  amount: string;
  type: string
  onOpenCredit: () => void;
  onOpenDebit: () => void;
};
const UserCard = ({
  image,
  coinName,
  balance,
  amount,
  onOpenCredit,
  onOpenDebit,
}: Props) => {
  return (
    <Suspense>
      <div className="bg-tableHead rounded-lg p-5 font-poppins  cursor-pointer">
        <div className="flex justify-between flex-wrap">
          <div>
            <div className="flex items-center">
              <img
                className="w-[1.3rem] h-[1.3rem] object-contain"
                src={image}
                alt={image}
                loading="lazy"
              />
              <h4 className="ml-2 text-sm lg:text-base font-semibold capitalize">
                {coinName}
              </h4>
            </div>

            <h5 className="uppercase text-xs lg:text-sm text-[#606060] my-2">
              Wallet balance
            </h5>

            <h3 className="text-xl lg:text-2xl font-semibold">{balance}</h3>
            <p className=" text-[#606060] text-xs lg:text-sm ml-2">
              $ {amount}
            </p>
          </div>
          <div>
            <button
              onClick={onOpenCredit}
              className="text-white rounded-full bg-darkGreen text-sm w-[20px] h-[20px] block hover:bg-opacity-95"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>

            <button
              onClick={onOpenDebit}
              className="text-white rounded-full bg-secondary text-sm w-[20px] h-[20px] block mt-3 hover:bg-opacity-95"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default UserCard;
