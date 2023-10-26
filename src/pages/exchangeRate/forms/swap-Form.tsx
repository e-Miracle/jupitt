import React from "react";
import { z } from "zod";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spinner } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
type Props = {
  country: string;
  className?: string;
};
const SwapForm: React.FC<Props> = ({ country, className }) => {
  const formSchema = z.object({
    percentage: z
      .number({
        required_error: "percentage is required",
        invalid_type_error: "percentage must be a number",
      })
      .positive(),
  });

  type FormSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log({ ...data, country });
  };
  return (
    <div className={` ${className}`}>
      {" "}
      <form
        className="mt-5 flex flex-wrap items-end justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" w-full lg:w-[75%]">
          <label className="text-xs lg:text-sm font-semibold capitalize">
            Crypto Swap
          </label>
          <input
            className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="rate"
            placeholder="Enter rate"
            type="number"
            {...register("percentage", {
              required: "This is required.",
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
          />
          <ErrorMessage
            errors={errors}
            name="percentage"
            render={({ message }: { message: string }) => (
              <p className="my-1 text-textForm text-xs lg:text-sm">
                <FontAwesomeIcon icon={faInfoCircle} /> {message}
              </p>
            )}
          />
        </div>

        <div className=" w-full lg:w-[20%]">
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

export default SwapForm;
