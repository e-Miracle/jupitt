import React from 'react'
import {  useAppSelector } from "../../store/hooks";
const Fields = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          First Name
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="firstname"
          type="text"
          defaultValue={user?.first_name}
        />
      </div>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          Last Name
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="lastname"
          type="text"
          defaultValue={user?.last_name}
        />
      </div>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          User ID
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="identifier"
          type="text"
          defaultValue={user?.identifier}
        />
      </div>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          Date of Registration
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="registration date"
          type="date"
          defaultValue={
            user ? new Date(user.created_at).toISOString().split("T")[0] : ""
          }
        />
      </div>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          Email
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="email"
          type="text"
          defaultValue={user?.email}
        />
      </div>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          Phone Number
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="phone"
          type="tel"
          defaultValue={user?.phone_number}
        />
      </div>
      {/* <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          Bankc
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="firstname"
          placeholder="Alex"
          type="text"
          id="name"
        />
      </div>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          First Name
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="firstname"
          placeholder="Alex"
          type="text"
          id="name"
        />
      </div>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          First Name
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="firstname"
          placeholder="Alex"
          type="text"
          id="name"
        />
      </div>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          First Name
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="firstname"
          placeholder="Alex"
          type="text"
          id="name"
        />
      </div> */}
    </>
  );
}

export default Fields;