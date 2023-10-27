import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import UserVerification from "../../../components/user-verification";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";

const UserData = () => {
  return (
    <div>
      <div className="grid gap-[1rem] lg:grid-cols-10">
        <div className="lg:col-span-7 grid gap-[1rem] lg:grid-cols-2">
          <div>
            <label
              className="text-xs text-userDetails  font-bold "
              htmlFor="name"
            >
              First Name
            </label>
            <input
              className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="firstname"
              type="text"
              defaultValue={"Alex"}
            />
          </div>
          <div>
            <label
              className="text-xs text-userDetails  font-bold "
              htmlFor="name"
            >
              Last Name
            </label>
            <input
              className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="lastname"
              type="text"
              defaultValue={"Daniel"}
            />
          </div>
          <div>
            <label
              className="text-xs text-userDetails  font-bold "
              htmlFor="name"
            >
              User ID
            </label>
            <input
              className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="identifier"
              type="text"
              defaultValue={"J-000000"}
            />
          </div>
          <div>
            <label
              className="text-xs text-userDetails  font-bold "
              htmlFor="name"
            >
              Date of Registration
            </label>
            <input
              className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="registration date"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label
              className="text-xs text-userDetails  font-bold "
              htmlFor="name"
            >
              Email
            </label>
            <input
              className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="email"
              type="text"
              defaultValue={"adress@example.com"}
            />
          </div>
          <div>
            <label
              className="text-xs text-userDetails  font-bold "
              htmlFor="name"
            >
              Phone Number
            </label>
            <input
              className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="phone"
              type="tel"
              defaultValue={"+234 000 000 0000"}
            />
          </div>
        </div>
        <div className="lg:col-span-3 ">
          <UserVerification />
        </div>
      </div>
      <div className="my-10 flex items-center justify-center">
        <h3 className="font-poppins text-[#7C7C7C] font-semibold text-xl lg:text-2xl">
          Sanctioned By
        </h3>
        <p className="mx-3 font-kumbhSans text-base lg:text-lg text-[#333333] font-semibold">
          Daniel{" "}
          <span className="bg-[#F1F1F1] rounded-sm py-2 px-4 ml-2">
            #30123456
          </span>{" "}
        </p>
        <button
          onClick={() => {
            copy("30123456");
            toast.success("successfully copied 30123456");
          }}
          className="text-base lg:text-lg text-[#7C7C7C] hover:opacity-80"
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
    </div>
  );
};

export default UserData;
