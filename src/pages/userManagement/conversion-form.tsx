import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Spinner } from "@chakra-ui/react";

type ConversionType = "fiat" | "crypto";

// Define the schemas for "fiat" and "crypto" conversions


type ConversionFormProps = {
  type: ConversionType;
  handleConvert?: () => void;
};

const ConversionForm: React.FC<ConversionFormProps> = ({
  type,
  handleConvert,
}) => {
  const schemas = {
    fiat: z.object({
      amount: z.string(),
      country_id: z.number(),
      identifier: z.string(),
    }),
    crypto: z.object({
      amount: z.string(),
      asset: z.string(),
      identifier: z.string(),
    }),
  };

  type ConversionFormData = z.infer<typeof schemas[type as keyof ConversionType]>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConversionFormData>({
    resolver: zodResolver(schemas[type]),
  });

  const onSubmit: SubmitHandler<ConversionFormData> = async (data) => {
    console.log(data);
    handleConvert && handleConvert();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Render form fields based on the "type" prop */}
      {type === "fiat" && (
        <div>
          <label
            className="text-sm lg:text-base font-semibold"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            type="text"
            id="amount"
            {...register("amount")}
          />
          <p className="my-1 text-textForm text-xs lg:text-sm">
            {errors.amount?.message}
          </p>
        </div>
      )}

      {type === "crypto" && (
        <div>
          <label
            className="text-sm lg:text-base font-semibold"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            type="text"
            id="amount"
            {...register("amount")}
          />
          <p className="my-1 text-textForm text-xs lg:text-sm">
            {errors.amount?.message}
          </p>
        </div>
      )}

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