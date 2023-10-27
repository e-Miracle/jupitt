import React from 'react'

const BankAccount = () => {
  return (
    <div className="lg:w-[80%] mx-auto grid gap-[1rem] lg:grid-cols-2">
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
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
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
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
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          Bank Name
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="identifier"
          type="text"
          defaultValue={"First Bank of Nigeria"}
        />
      </div>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          Account .Number
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="registration date"
          type="string"
          defaultValue={"0000000000"}
        />
      </div>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          Bank Verification Number
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="email"
          type="string"
          defaultValue={"0000000000000000"}
        />
      </div>
      <div>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          Bank Code
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="phone"
          type="tel"
          defaultValue={"000"}
        />
      </div>
    </div>
  );
}

export default BankAccount;