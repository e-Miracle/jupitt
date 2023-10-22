import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Spinner } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  title: string;
  currencies: Array<string>;
  handleConvert?: () => void;
};

const conversionSchema = z.object({
  currency: z.string({
    required_error: "info is required",
    invalid_type_error: "info must be a string",
  }),
  amount: z
    .number({
      required_error: "amount is required",
      invalid_type_error: "amount must be a number",
    })
    .positive()
    .refine((val) => val >= 1, "amount must be greater than or equal to 1"),
  limit: z
    .number({
      required_error: "amount is required",
      invalid_type_error: "amount must be a number",
    })
    .positive()
    .refine((val) => val >= 1, "amount must be greater than or equal to 1"),
});
type ConversionFormData = z.infer<typeof conversionSchema>;

const RefferalForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConversionFormData>({
    resolver: zodResolver(conversionSchema),
  });

  const onSubmit: SubmitHandler<ConversionFormData> = async (data) => {
    console.log(data);
    props.handleConvert && props.handleConvert();
  };
  return (
    <div>
      <h3 className="font-inter text-xl lg:text-2xl font-medium">
        {props.title}
      </h3>
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            className="text-sm lg:text-base font-semibold"
            htmlFor="reason"
          >
            Select Bonus Currency
          </label>
          <select
            id="reason"
            className={`mt-3 w-full text-sm border border-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            {...register("currency", { required: "This is required." })}
            disabled={isSubmitting}
          >
            {props.currencies.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <ErrorMessage
          errors={errors}
          name="currency"
          render={({ message }: { message: string }) => (
            <p className="my-1 text-textForm text-xs lg:text-sm">
              <FontAwesomeIcon icon={faInfoCircle} /> {message}
            </p>
          )}
        />
        <div className="relative mt-5">
          <label className="text-sm lg:text-base font-semibold" htmlFor="min">
            Transaction Limit (Min)
          </label>
          <input
            className={`mt-3 w-full  text-sm border border-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="limit"
            type="number"
            placeholder="Enter your password"
            id="min"
            {...register("limit", {
              required: "This is required.",
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="limit"
          render={({ message }: { message: string }) => (
            <p className="my-1 text-textForm text-xs lg:text-sm">
              <FontAwesomeIcon icon={faInfoCircle} /> {message}
            </p>
          )}
        />

        <div className="relative mt-5">
          <label
            className="text-sm lg:text-base font-semibold"
            htmlFor="password"
          >
            Amount
          </label>
          <input
            className={`mt-3 w-full text-sm border border-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="amount"
            type="number"
            placeholder="Enter your password"
            id="password"
            {...register("amount", {
              required: "This is required.",
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="amount"
          render={({ message }: { message: string }) => (
            <p className="my-1 text-textForm text-xs lg:text-sm">
              <FontAwesomeIcon icon={faInfoCircle} /> {message}
            </p>
          )}
        />
        <div className=" w-full">
          {isSubmitting ? (
            <Spinner />
          ) : (
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-secondary text-white text-sm lg:text-base  p-3 mt-10 mb-5 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm   hover:bg-formBg"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RefferalForm;
