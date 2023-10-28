import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { faCircleDot, faDotCircle, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatServerTime } from "../utils";
import { tableBackgroundColors, tableStatusColors } from "../constants";
export type TableData = {
  id: number | string;
  [key: string]: string | number | Date;
};

export type TableHeaders = {
  key: string;
  label: string;
};

type Props = {
  headers: TableHeaders[];
  data: TableData[];
  onActionClick: (type: "delete", id: number | string) => void;
  viewLink: (id: number | string) => string;
  change?: (page: number) => void;
  total?: number;
  currentPage?: number | null;
  next_page_url?: null | string;
  prev_page_url?: null | string;
};

const Tables: React.FC<Props> = ({
  headers,
  data,
  onActionClick,
  viewLink,
  change,
  total,
  currentPage,
  next_page_url,
  prev_page_url,
}) => {
  const [selectedRows, setSelectedRows] = useState<Array<number | string>>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleRowClick = (id: number | string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleAllSelect = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      const allRowIds = data.map((row) => row.id);
      setSelectedRows(allRowIds);
    }
    setIsAllSelected(!isAllSelected);
  };

  const allSelected = selectedRows.length === data.length;

  return (
    <div className="relative overflow-x-auto mt-5">
      <table className="w-full text-left font-inter">
        <thead className="bg-tableHead text-sm capitalize ">
          <tr>
            <th scope="col" className="pl-3 py-3 ">
              <Checkbox isChecked={allSelected} onChange={handleAllSelect} />
            </th>
            {headers.map((header) => (
              <th
                scope="col"
                className="px-3 py-3 font-medium text-sm whitespace-nowrap  text-coincard"
                key={header.key}
              >
                {header.label}
              </th>
            ))}
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr className="border-b h-[70px]" key={row.id}>
              <th scope="row" className="pl-3 py-3">
                <Checkbox
                  isChecked={selectedRows.includes(row.id)}
                  onChange={() => handleRowClick(row.id)}
                />
              </th>
              {headers.map((header) => (
                <td
                  key={header.key}
                  className="text-[#666666] text-sm px-3 py-3 min-w-[100px] whitespace-nowrap"
                >
                  {header.key === "status" ? (
                    <span
                      style={{
                        background:
                          tableBackgroundColors[row[header.key] as string],
                        color: tableStatusColors[row[header.key] as string],
                      }}
                      className="w-auto p-2 rounded-[16px] capitalize text-xs font-semibold "
                    >
                      <span
                        style={{
                          background:
                            tableStatusColors[row[header.key] as string],
                        }}
                        className="inline-block w-[8px] h-[8px] rounded-full mr-2"
                      ></span>
                      {row[header.key] as string}
                    </span>
                  ) : (
                    <>
                      {header.key === "user" ? (
                        <>
                          <div className="flex items-center space-x-2">
                            {row.image && (
                              <Avatar
                                width={"40px"}
                                height={"40px"}
                                name={row.name as string}
                                src={row.image as string}
                              />
                            )}
                            {row.name && (
                              <div>
                                <Text
                                  color={"#101828"}
                                  className="font-medium capitalize text-sm"
                                >
                                  {row.name as string}
                                </Text>
                                {row.email && (
                                  <Text color="#6B788E" className="text-sm ">
                                    {row.email as string}
                                  </Text>
                                )}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {header.key === "time" ? (
                            <>{formatServerTime(row[header.key] as Date)}</>
                          ) : (
                            <>{row[header.key]}</>
                          )}
                        </>
                      )}
                    </>
                  )}
                </td>
              ))}
              <td>
                <Menu>
                  <MenuButton as={Button} background={"none"}>
                    <FontAwesomeIcon
                      className="text-2xl text-coincard"
                      icon={faEllipsisV}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link className="block w-full" to={viewLink(row.id)}>
                        View
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={() => onActionClick("delete", row.id)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-5 flex items-center flex-wrap justify-between">
        {prev_page_url && (
          <button
            className="rounded-md p-2 text-gray outline-none border border-coincard hover:bg-coincard ml-5"
            onClick={() => {
              if (currentPage && currentPage > 1)
                change && change(currentPage - 1);
            }}
          >
            Previous
          </button>
        )}
        <div className="font-inter text-xs">
          Page {currentPage} of {total}
        </div>
        {next_page_url && (
          <button
            className="rounded-md p-2 text-gray outline-none border border-coincard hover:bg-coincard ml-5"
            onClick={() => {
              if (currentPage && total && currentPage < total)
                change && change(currentPage + 1);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Tables;
