

const CryptoAddress = () => {
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
        <h3 className="font-inter text-xl lg:text-xl font-semibold capitalize mb-5 text-[#101828]">
          Bitcoin
        </h3>
        <label className="text-xs text-userDetails  font-bold " htmlFor="name">
          Bitcoin (BTC)
        </label>
        <input
          className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="identifier"
          type="text"
          defaultValue={"0x71C7656EC7ab88b098defB751B7401B5f6d8976F"}
        />
      </div>
      <div>
        <h3 className="font-inter text-xl lg:text-xl font-semibold capitalize mb-5 text-[#101828]">
          Tether USD
        </h3>
        <div className="mt-5">
          <label
            className="text-xs text-userDetails  font-bold "
            htmlFor="name"
          >
            USDT (BEP-20)
          </label>
          <input
            className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="registration date"
            type="string"
            defaultValue={"0x71C7656EC7ab88b098defB751B7401B5f6d8976F"}
          />
        </div>
        <div className="mt-5">
          <label
            className="text-xs text-userDetails  font-bold "
            htmlFor="name"
          >
            USDT (ERC-20)
          </label>
          <input
            className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="registration date"
            type="string"
            defaultValue={"0x71C7656EC7ab88b098defB751B7401B5f6d8976F"}
          />
        </div>
        <div>
          <label
            className="text-xs text-userDetails  font-bold "
            htmlFor="name"
          >
            USDT (TRC-20)
          </label>
          <input
            className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="registration date"
            type="string"
            defaultValue={"0x71C7656EC7ab88b098defB751B7401B5f6d8976F"}
          />
        </div>
      </div>
      <div>
        <h3 className="font-inter text-xl lg:text-xl font-semibold capitalize mb-5 text-[#101828]">
          Ethereum
        </h3>
        <div>
          <label
            className="text-xs text-userDetails  font-bold "
            htmlFor="name"
          >
            ETH (BEP-20)
          </label>
          <input
            className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="email"
            type="string"
            defaultValue={"0x71C7656EC7ab88b098defB751B7401B5f6d8976F"}
          />
        </div>
        <div className="mt-5">
          <label
            className="text-xs text-userDetails  font-bold "
            htmlFor="name"
          >
            ETH (ERC-20)
          </label>
          <input
            className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="email"
            type="string"
            defaultValue={"0x71C7656EC7ab88b098defB751B7401B5f6d8976F"}
          />
        </div>
      </div>
    </div>
  );
}

export default CryptoAddress;
