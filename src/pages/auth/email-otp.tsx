
import { Suspense, lazy } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import toast from "react-hot-toast";
import copy from "copy-text-to-clipboard";
const Spinner = lazy(() => import("../../components/spinner/Spinner"));
export default function EmailOtp() {
  const formSchema = z.object({
    code: z.string({
      required_error: "amount is required",
      invalid_type_error: "amount must be a number",
    }),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const handleGetValue = () => {
    const fieldValue = getValues("code");
    if (!fieldValue) {
       toast.error(`Nothing to copy`);
      return;
    }
      copy(fieldValue);
    toast.success(`${fieldValue} has been copied to clipboard`);
  };
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data);
  };
  return (
    <Suspense>
      <div className="font-poppins bg-form rounded-lg my-5 lg:mt-0 p-5 lg:p-10">
        <h1 className=" font-bold text-xl lg:text-2xl ">Enter OTP</h1>

        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm lg:text-base font-semibold" htmlFor="tag">
              Email verification
            </label>
            <div className="flex items-center">
              <input
                className={`mt-3 w-[70%] border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                aria-label="tag number"
                placeholder="Enter code here"
                type="text"
                id="tag"
                {...register("code", { required: "This is required." })}
                disabled={isSubmitting}
              />
              <button
                onClick={handleGetValue}
                className="mt-3 w-[30%] text-secondary text-sm lg:text-base font-semibold "
              >
                Copy Code
              </button>
            </div>
          </div>
          <ErrorMessage
            errors={errors}
            name="code"
            render={({ message }: { message: string }) => (
              <p className="my-1 text-textForm text-xs lg:text-sm">
                <FontAwesomeIcon icon={faInfoCircle} /> {message}
              </p>
            )}
          />

          <p className="text-xs  lg:text-sm mt-3">
            Enter the 6-digit code sent to olu***@gmail.com
          </p>

          <div className=" w-full">
            {isSubmitting ? (
              <div>
                <Spinner toggle={false} />
              </div>
            ) : (
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-secondary text-white text-sm lg:text-base  p-3 mt-10 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm   hover:bg-formBg"
              >
                Continue
              </button>
            )}
          </div>
        </form>
      </div>
    </Suspense>
  );
}
