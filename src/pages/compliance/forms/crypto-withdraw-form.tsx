import React from "react";
import { z } from "zod";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spinner } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { setCryptoAml } from "../../../store/non-reducer-actions.ts/aml";

type Props = {
  type: "Tier 1" | "Tier 2" | "Tier 3" | "ordinary";
  id: number;
  className?: string | undefined;
};
const CryptoWithdrawForm: React.FC<Props> = ({ type, id, className }) => {
  const formSchema = z.object({
    limit: z
      .number({
        required_error: "limit is required",
        invalid_type_error: "limit must be a number",
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
    if (type === "Tier 1") {
      const res = await setCryptoAml({
        withdrawal_limit: data.limit,
        country_id: id,
        level: 1,
      });
      if (res) reset({ limit: 0 });
      return;
    }
    if (type === "Tier 2") {
      const res = await setCryptoAml({
        withdrawal_limit: data.limit,
        country_id: id,
        level: 2,
      });
      if (res) reset({ limit: 0 });
      return;
    }
    if (type === "Tier 3") {
      const res = await setCryptoAml({
        withdrawal_limit: data.limit,
        country_id: id,
        level: 3,
      });
      if (res) reset({ limit: 0 });
      return;
    }
    if (type === "ordinary") {
      const res = await setCryptoAml({
        withdrawal_limit: data.limit,
        country_id: id,
        level: 4,
      });
      if (res) reset({ limit: 0 });
      return;
    }
  };
  return (
    <div className={` ${className}`}>
      <h3 className="mt-3 text-base lg:text-lg font-inter capitalize text-[#333333]">
        {type} User
      </h3>
      <form
        className="mt-5 flex flex-wrap items-end justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" w-full lg:w-[75%] mb-5">
          <label className="text-xs lg:text-sm font-semibold capitalize">
            Crypto Withdraw
          </label>
          <input
            className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="rate"
            placeholder="Enter rate"
            type="number"
            {...register("limit", {
              required: "This is required.",
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
          />
          <ErrorMessage
            errors={errors}
            name="limit"
            render={({ message }: { message: string }) => (
              <p className="my-1 text-textForm text-xs lg:text-sm">
                <FontAwesomeIcon icon={faInfoCircle} /> {message}
              </p>
            )}
          />
        </div>

        <div className=" w-full lg:w-[20%] mb-5 min-w-[50px]">
          {isSubmitting ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#FAFAFA] text-[#1C1C93] text-sm lg:text-base  p-3  rounded-lg cursor-pointer hover:bg-[#1C1C93] hover:text-white capitalize font-semibold"
            >
              save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CryptoWithdrawForm;
