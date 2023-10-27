import { z } from "zod"; // Import SelectCountry
import { ErrorMessage } from "@hookform/error-message";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@chakra-ui/react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  cardNumber: z.number().positive(),
  cardType: z.string().min(2),
});
const RejectCard = () => {
  type FormSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log({ ...data });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="font-poppins">
        {" "}
        <div>
          <label
            htmlFor="cardName"
            className="text-xs font-semibold capitalize "
          >
            Card Number
          </label>
          <input
            className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="cardName"
            placeholder="Enter card number"
            type="text"
            id="cardNumber"
            {...register("cardNumber", {
              required: "This is required.",
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="cardNumber"
          render={({ message }: { message: string }) => (
            <p className="my-1 text-textForm text-xs lg:text-sm">
              <FontAwesomeIcon icon={faInfoCircle} /> {message}
            </p>
          )}
        />
        <div className="mt-2">
          <label
            htmlFor="country"
            className="text-xs font-semibold capitalize "
          >
            Card Type
          </label>
          <Controller
            name="cardType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                {...field}
                className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              >
                <option value={""}>Select An option</option>
                <option value={"1"}>Select An option</option>
                <option value={"2"}>Select An option</option>
              </select>
            )}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="cardType"
          render={({ message }: { message: string }) => (
            <p className="my-1 text-textForm text-xs lg:text-sm">
              <FontAwesomeIcon icon={faInfoCircle} /> {message}
            </p>
          )}
        />
        <div className=" w-full">
          {isSubmitting ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-submit text-white text-sm lg:text-base  p-3 my-5 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm   hover:bg-formBg"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RejectCard;
