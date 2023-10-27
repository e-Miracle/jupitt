import React from "react";
import { Avatar, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
type Props = {
  imgUrl: string;
  name: string;
  email: string;
};
const StaffAssignCard: React.FC<Props> = ({ imgUrl, name, email }) => {
  const [state, setState] = React.useState(false);
  const handleState = () => setState((k) => !k);
  return (
    <div
      onClick={handleState}
      className={` flex justify-between font-inter items-start my-2 cursor-pointer p-2 rounded-lg ${
        state && "bg-[#E3F1FB]"
      }`}
    >
      <div className="flex items-center space-x-2">
        <Avatar name={imgUrl} src={imgUrl} />
        <div>
          <Text className="font-medium">{name}</Text>
          <p className={` text-sm lg:text-base ${state && "text-secondary"}`}>
            {email}
          </p>
        </div>
      </div>
      <button
        className={`text-xs rounded-full border  w-[20px] h-[20px] flex items-center justify-center ${
          state && " bg-secondary text-white"
        }`}
      >
        {state ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : (
          <div className="rounded-full border  w-[20px] h-[20px]"></div>
        )}
      </button>
    </div>
  );
};

export default StaffAssignCard;
