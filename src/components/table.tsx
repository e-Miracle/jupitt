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
import { faCircleDot, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatServerTime } from "../utils";
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
  const [selectedRows, setSelectedRows] = useState<number[] | string[]>([]);
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
    <Box className="w-full overflow-x-auto">
      <Table className="mt-5 font-inter">
        <Thead className="bg-tableHead text-xs font-semibold">
          <Tr>
            <Th>
              <Checkbox isChecked={allSelected} onChange={handleAllSelect} />
            </Th>
            {headers.map((header) => (
              <Th key={header.key}>{header.label}</Th>
            ))}
            <Th>More</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td>
                <Checkbox
                  isChecked={selectedRows.includes(row.id)}
                  onChange={() => handleRowClick(row.id)}
                />
              </Td>
              {headers.map((header) => (
                <Td key={header.key} className="text-coincard">
                  {header.key === "status" ? (
                    <Text
                      className="w-auto p-2 rounded-[100px] capitalize inline text-xs font-semibold"
                      backgroundColor={
                        header.key === "status" && row.status === "active"
                          ? "rgba(42, 181, 125, 0.3)"
                          : header.key === "status" && row.status === "flagged"
                          ? "blue.200"
                          : header.key === "status" && row.status === "inactive"
                          ? "rgba(255, 154, 152, 0.3)"
                          : "transparent"
                      }
                      color={
                        header.key === "status" && row.status === "active"
                          ? "#2AB57D"
                          : header.key === "status" && row.status === "flagged"
                          ? "blue.600"
                          : header.key === "status" && row.status === "inactive"
                          ? "#FD625E"
                          : "black"
                      }
                    >
                      <FontAwesomeIcon className=" mr-1" icon={faCircleDot} />{" "}
                      {row[header.key] as string}
                    </Text>
                  ) : (
                    <>
                      {header.key === "user" ? (
                        <>
                          <div className="flex items-center space-x-2">
                            {row.image && (
                              <Avatar
                                name={row.name as string}
                                src={row.image as string}
                              />
                            )}
                            {row.name && (
                              <div>
                                <Text className="font-medium">
                                  {row.name as string}
                                </Text>
                                {row.email && (
                                  <Text fontSize="sm" color="gray.500">
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
                </Td>
              ))}
              <Td>
                <Menu>
                  <MenuButton as={Button} background={"none"}>
                    <FontAwesomeIcon
                      className="text-2xl text-coincard"
                      icon={faEllipsisV}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link className="block w-full" to={viewLink(row.id)}>View</Link>
                    </MenuItem>
                    <MenuItem onClick={() => onActionClick("delete", row.id)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box className="my-5 flex items-center flex-wrap justify-between">
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
      </Box>
    </Box>
  );
};

export default Tables;
