import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Column {
  width: number;
}

interface LoadingTableProps {
  rows: number;
  columns: Column[];
}

const LoadingTable: React.FC<LoadingTableProps> = ({ rows, columns }) => {
  const cellSpacing = 4; // Adjust this value for the desired cell spacing

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: cellSpacing + "px",
  };

  const thStyle: React.CSSProperties = {
    height: 40, // Adjust the header height as needed
    backgroundColor: "lightgray", // Optional background color for the header
  };

  const tdStyle: React.CSSProperties = {
    height: 20, // Adjust the body cell height as needed
    backgroundColor: "white", // Optional background color for the body cells
  };

  return (
    <div className="mt-5" style={{ width: "100%", overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={thStyle}>
                <Skeleton width={column.width} height={40} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="mt-3">
              {columns.map((column, colIndex) => (
                <td key={colIndex} style={tdStyle}>
                  <Skeleton width={column.width} height={20} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingTable;
