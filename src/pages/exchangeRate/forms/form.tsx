import React from "react";
import { z } from "zod";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spinner } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { INewForm } from "../../../utils";
import { setCryptoRate } from "../../../store/non-reducer-actions.ts/rate";
const Form: React.FC<INewForm> = ({ type, coinName, className, id }) => {
  const formSchema = z.object({
    rate: z
      .number({
        required_error: "rate is required",
        invalid_type_error: "rate must be a number",
      })
      .positive(),
  });

  type FormSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (type === "sell") {
      const res = await setCryptoRate({
        sell: data.rate,
        country_id: id,
        asset: coinName.toLocaleUpperCase(),
      });
      if (res) reset({ rate: 0 });
      return
    }
    if (type === "buy") {
      const res = await setCryptoRate({
        buy: data.rate,
        country_id: id,
        asset: coinName.toLocaleUpperCase(),
      });
      if (res) reset({ rate: 0 });
       return;
    }
  };
  return (
    <div className={` ${className}`}>
      {" "}
      <form
        className="mt-5 flex flex-wrap items-end justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" w-full lg:w-[75%] mb-5">
          <label className="text-xs lg:text-sm font-semibold capitalize">
            {type} <span className="uppercase">{coinName}</span>
          </label>
          <input
            className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="rate"
            placeholder="Enter rate"
            type="number"
            {...register("rate", {
              required: "This is required.",
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
          />
        </div>

        <div className=" w-full lg:w-[20%] min-w-[70px] mb-5 ">
          {isSubmitting ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full  bg-[#FAFAFA] text-[#1C1C93] text-sm lg:text-base  p-3  rounded-lg cursor-pointer hover:bg-[#1C1C93] hover:text-white capitalize font-semibold"
            >
              save
            </button>
          )}
        </div>
      </form>
      <ErrorMessage
        errors={errors}
        name="rate"
        render={({ message }: { message: string }) => (
          <p className="my-1 text-textForm text-xs lg:text-sm">
            <FontAwesomeIcon icon={faInfoCircle} /> {message}
          </p>
        )}
      />
    </div>
  );
};

export default Form;
