import React from "react";
import { z } from "zod";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spinner } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
type Props = {
  type: "buy" | "sell";
  country: string;
  className?: string | undefined;
};
const GiftCardForm: React.FC<Props> = ({ type, country, className }) => {
  const formSchema = z.object({
    rate: z
      .number({
        required_error: "rate is required",
        invalid_type_error: "rate must be a number",
      })
      .positive(),
    giftCard: z
      .string({
        required_error: "giftCard is required",
        invalid_type_error: "giftCard must be a number",
      })
      .min(2),
    category: z
      .string({
        required_error: "category is required",
        invalid_type_error: "category must be a number",
      })
      .min(2),
    type: z
      .string({
        required_error: "type is required",
        invalid_type_error: "type must be a number",
      })
      .min(2),
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
    console.log({ ...data, country, type });
  };
  return (
    <div className={` ${className}`}>
      {" "}
      <form className="mt-5 " onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-base lg:text-lg font-inter font-semibold capitalize">
          {type} card
        </h3>
        <div className=" w-full mt-2 ">
          <label className="text-xs lg:text-sm font-semibold capitalize">
            Gift Card
          </label>
          <select
            id=""
            {...register("giftCard", {
              required: "This is required.",
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
            className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          >
            {" "}
            <option value="">Select</option>
          </select>
          <ErrorMessage
            errors={errors}
            name="giftCard"
            render={({ message }: { message: string }) => (
              <p className="my-1 text-textForm text-xs lg:text-sm">
                <FontAwesomeIcon icon={faInfoCircle} /> {message}
              </p>
            )}
          />
        </div>
        <div className=" w-full mt-2 ">
          <label className="text-xs lg:text-sm font-semibold capitalize">
            Card Type
          </label>
          <select
            id=""
            {...register("type", {
              required: "This is required.",
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
            className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          >
            {" "}
            <option value="">Select</option>
          </select>
          <ErrorMessage
            errors={errors}
            name="type"
            render={({ message }: { message: string }) => (
              <p className="my-1 text-textForm text-xs lg:text-sm">
                <FontAwesomeIcon icon={faInfoCircle} /> {message}
              </p>
            )}
          />
        </div>

        <div className=" w-full mt-2 ">
          <label className="text-xs lg:text-sm font-semibold capitalize">
            Value Category
          </label>
          <select
            id=""
            {...register("category", {
              required: "This is required.",
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
            className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          >
            {" "}
            <option value="">Select</option>
          </select>
          <ErrorMessage
            errors={errors}
            name="category"
            render={({ message }: { message: string }) => (
              <p className="my-1 text-textForm text-xs lg:text-sm">
                <FontAwesomeIcon icon={faInfoCircle} /> {message}
              </p>
            )}
          />
        </div>

        <div className=" w-full mt-2 ">
          <label className="text-xs lg:text-sm font-semibold capitalize">
            Rate
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

        <div className=" w-full ">
          {isSubmitting ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#1C1C93] text-white text-sm lg:text-base my-5  p-3  rounded-lg cursor-pointer hover:bg-[#FAFAFA] hover:text-[#1C1C93] capitalize font-semibold"
            >
              save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GiftCardForm;
