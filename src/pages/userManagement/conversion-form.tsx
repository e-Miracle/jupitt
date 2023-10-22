import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Spinner } from "@chakra-ui/react";

type Props = {
  handleConvert?: () => void;
};

const conversionSchema = z.object({
  btc: z.string(),
  usd: z.string(),
  ngn: z.string(),
});
type ConversionFormData = z.infer<typeof conversionSchema>;

const ConversionForm: React.FC<Props> = ({ handleConvert }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConversionFormData>({
    resolver: zodResolver(conversionSchema),
  });

  const onSubmit: SubmitHandler<ConversionFormData> = async (data) => {
    console.log(data);
    handleConvert && handleConvert();
  };

  const [formData, setFormData] = useState<ConversionFormData>({
    btc: "",
    usd: "",
    ngn: "",
  });

  const handleInputChange = (
    field: keyof ConversionFormData,
    value: string
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    performConversion(field, value);
  };

  const performConversion = (
    changedField: keyof ConversionFormData,
    value: string
  ) => {
    // Implement the conversion logic here to update other fields based on user input.
    if (changedField === "btc") {
      // Example: Convert BTC to USD and NGN
      // You can use a conversion rate or method
      const btcValue = parseFloat(value);
      // Implement the conversion logic and update 'usd' and 'ngn' fields accordingly
      // For example:
      const usdValue = (btcValue * 50000).toFixed(2);
      const ngnValue = (btcValue * 2000000).toFixed(2);
      setFormData({
        ...formData,
        usd: usdValue,
        ngn: ngnValue,
      });
    }
    // Add similar logic for other fields as needed
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="text-sm lg:text-base font-semibold" htmlFor="btc">
          BTC
        </label>
        <input
          className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          type="text"
          id="btc"
          {...register("btc")}
        //   value={formData.btc}
          onChange={(e) => handleInputChange("btc", e.target.value)}
        />
        <p className="my-1 text-textForm text-xs lg:text-sm">
          {errors.btc?.message}
        </p>
      </div>

      <div className="mt-5">
        <label className="text-sm lg:text-base font-semibold" htmlFor="usd">
          USD
        </label>
        <input
          className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          type="text"
          id="usd"
          {...register("usd")}
          value={formData.usd}
          onChange={(e) => handleInputChange("usd", e.target.value)}
        />
        <p className="my-1 text-textForm text-xs lg:text-sm">
          {errors.usd?.message}
        </p>
      </div>

      <div className="mt-5">
        <label className="text-sm lg:text-base font-semibold" htmlFor="ngn">
          NGN
        </label>
        <input
          className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          type="text"
          id="ngn"
          {...register("ngn")}
          value={formData.ngn}
          onChange={(e) => handleInputChange("ngn", e.target.value)}
        />
        <p className="my-1 text-textForm text-xs lg:text-sm">
          {errors.ngn?.message}
        </p>
      </div>
      <div className=" w-full">
        {isSubmitting ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-secondary text-white text-sm lg:text-base  p-3 mt-10 mb-5 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm   hover:bg-formBg"
          >
            Approve
          </button>
        )}
      </div>
    </form>
  );
};

export default ConversionForm;
