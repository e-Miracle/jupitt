import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
type Props = {
  id: string | number;
  name: string;
  img: string;
  suspend: (id: string | number) => void;
  deleted: (id: string | number) => void;
};
const GiftCard: React.FC<Props> = ({ id, name, img, suspend, deleted }) => {
  return (
    <div className="bg-[#f1f1f1] p-3 rounded-xl">
      <img
        className="object-cover w-full h-[150px] rounded-lg"
        src={img}
        alt={img}
      />
      <div className="mt-3 flex items-center justify-between">
        <h3 className="capitalize font-poppins text-base lg:text-lg ml-5">
          {name}
        </h3>
        <Menu>
          <MenuButton
            as={Button}
            background={"none"}
            px={0}
            py={0}
            mx={0}
            style={{ padding: "min(5px)" }}
          >
            <FontAwesomeIcon
              className="text-base lg:text-lg text-[#545454]"
              icon={faEllipsisV}
            />
          </MenuButton>
          <MenuList
            p={1}
            width={100}
            borderRadius={"7px"}
            className="rounded-xl p-1"
            style={{ minWidth: "120px" }}
          >
            <MenuItem color={"#84818A"} className="text-xs">
              <Link
                className="block w-full"
                to={`/gift-card-management/card/${id}`}
              >
                View Card
              </Link>
            </MenuItem>
            <MenuItem
              color={"#84818A"}
              className="text-xs"
              onClick={() => suspend(id)}
            >
              Suspend Card
            </MenuItem>
            <MenuItem
              color={"#84818A"}
              className="text-xs"
              onClick={() => deleted(id)}
            >
              Delete Card
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default GiftCard;
