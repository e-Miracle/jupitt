import React from "react";
import { z } from "zod";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spinner } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { setVcRate } from "../../../store/non-reducer-actions.ts/rate";
type Props = {
  type: "funding" | "withdrawal" | "spending";
  id: number;
  className?: string | undefined;
};
const CardRateForm: React.FC<Props> = ({ type, id, className }) => {
  const formSchema = z.object({
    percentage: z
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
    if (type === "funding") {
      const res = await setVcRate({ country_id: id, fund: data.percentage });
      if (res) reset({ percentage: 0 });
      return;
    }

    if (type === "withdrawal") {
      const res = await setVcRate({
        country_id: id,
        withdraw: data.percentage,
      });
      if (res) reset({ percentage: 0 });
      return;
    }

    if (type === "spending") {
      const res = await setVcRate({ country_id: id, spend: data.percentage });
      if (res) reset({ percentage: 0 });
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
            Card {type}
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

        <div className=" w-full lg:w-[20%] mb-5">
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

export default CardRateForm;
