import {
  faQuestion,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
type Props = {
  title: string;
  number?: number;
  backBtn?: boolean;
  status?: "active" | "inactive"| "flagged";
};

const color = {
  active: "#1FCB4F",
  inactive: "#EB5757",
  flagged: "#0D63D3",
};

const background = {
  active: "rgba(42, 181, 125, 0.3)",
  inactive: "rgba(255, 154, 152, 0.3)",
  flagged: "blue.200",
};
const Title = (props: Props) => {
  const navigate = useNavigate();
  return (
    <h3 className="font-inter text-xl lg:text-2xl font-medium flex items-center mr-[1rem]">
      {props.backBtn && (
        <FontAwesomeIcon
          onClick={() => navigate(-1)}
          className="mr-5 cursor-pointer"
          icon={faChevronLeft}
        />
      )}
      {props.title}{" "}
      <FontAwesomeIcon
        className="text-[.2rem]  text-[#98A2B3] mx-2 rounded-full border p-[0.1rem] border-[#98A2B3] w-[0.75rem] h-[0.75rem]"
        icon={faQuestion}
      />
      {props.number && (
        <span className="text-[.75rem]  bg-background p-1  h-[22px] flex items-center justify-center rounded-xl max-w-[40px]">
          {props.number}
        </span>
      )}
      {props.status && (
        <span
          style={{
            color: color[props.status],
            background: background[props.status],
          }}
          className="text-xs rounded-xl p-1 capitalize"
        >
          {props.status}
        </span>
      )}
    </h3>
  );
};

export default Title;
