import {
  faQuestionCircle,
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
    <h3 className="font-inter text-xl lg:text-2xl font-medium flex items-center">
      {props.backBtn && (
        <FontAwesomeIcon
          onClick={() => navigate(-1)}
          className="mr-5 cursor-pointer"
          icon={faChevronLeft}
        />
      )}
      {props.title}{" "}
      <FontAwesomeIcon
        className="text-sm lg:text-base text-coincard mx-2"
        icon={faQuestionCircle}
      />
      {props.number && (
        <span className="text-xs lg:text-sm bg-background p-1 rounded-xl">
          {props.number}
        </span>
      )}
      {props.status && (
        <span
          style={{
            color: color[props.status],
            background: background[props.status],
          }}
          className="text-xs lg:text-sm rounded-xl p-1 capitalize"
        >
          {props.status}
        </span>
      )}
    </h3>
  );
};

export default Title;
