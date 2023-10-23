import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Spinner } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {
  reasons: Array<string>;
  handleConvert?: () => void;
};

const conversionSchema = z.object({
  reason: z.string({
    required_error: "info is required",
    invalid_type_error: "info must be a string",
  }),
  info: z
    .string({
      required_error: "info is required",
      invalid_type_error: "info must be a string",
    })
    .min(3, { message: "Info must be at least 3 characters" }),
});
type ConversionFormData = z.infer<typeof conversionSchema>;

const CaseForm = (props: Props) => {
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
    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="text-sm lg:text-base font-semibold" htmlFor="reason">
          Reason 
        </label>
        <select
          id="reason"
          className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          {...register("reason", { required: "This is required." })}
          disabled={isSubmitting}
        >
          {props.reasons.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
      <ErrorMessage
        errors={errors}
        name="reason"
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
          Additional Information
        </label>
        <textarea
          className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="password"
          placeholder="Enter your password"
          id="password"
          {...register("info", { required: "This is required." })}
          disabled={isSubmitting}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="info"
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
            className="w-full bg-secondary text-white text-sm lg:text-base  p-3 mt-10 mb-5 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm   hover:bg-formBg"
          >
            Approve
          </button>
        )}
      </div>
    </form>
  );
};

export default CaseForm;
