import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { routes } from "../../constants";
import { SuccessCheck } from "../../assets"; // Replace with the correct image path

export default function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title") || "Success";
  const description = queryParams.get("description");
  const name = queryParams.get("name") || "Log In";
  const route = queryParams.get("route") || routes.home;

  return (
    <div className="font-poppins bg-form rounded-lg my-5 lg:mt-0 p-5 lg:p-10">
      <div className="mx-auto w-[100px] h-[100px] my-5">
        <img
          src={SuccessCheck}
          alt="SuccessCheck"
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className="font-bold text-center text-xl lg:text-2xl">{title}</h1>
      {description && (
        <p className="text-sm text-center lg:text-base mt-3">{description}</p>
      )}
      <Link
        to={route}
        className="w-full block text-center bg-secondary text-white text-sm lg:text-base p-3 mt-10 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm hover:bg-formBg"
      >
        {name}
      </Link>
    </div>
  );
}
