import { Suspense, lazy } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { forgetPassword } from "../../store/non-reducer-actions.ts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Spinner = lazy(() => import("../../components/spinner/Spinner"));
export default function ForgetPassword() {
  const navigate = useNavigate();
  const formSchema = z.object({
    // email: z
    //   .string()
    //   .email("This is not a valid email.")
    //   .trim()
    //   .min(8, { message: "Email length must be at least 8." }),
    tag_no: z
      .string({
        required_error: "amount is required",
        invalid_type_error: "amount must be a number",
      })
      .min(3),
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
    console.log(data);
    const res = await forgetPassword({ identifier: data.tag_no });
    if (res) navigate(`/reset-password`);
    else toast.error("Something went wrong please try again");
  };
  return (
    <Suspense>
      <div className="font-poppins bg-form rounded-lg my-5 lg:mt-0 p-5 lg:p-10">
        <h1 className=" font-bold text-xl lg:text-2xl ">Forget Password</h1>

        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm lg:text-base font-semibold" htmlFor="tag">
              Staff Tag Number
            </label>
            <input
              className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="tag number"
              placeholder="Enter your stn"
              type="text"
              id="tag"
              {...register("tag_no", { required: "This is required." })}
              disabled={isSubmitting}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name="tag_no"
            render={({ message }: { message: string }) => (
              <p className="my-1 text-textForm text-xs lg:text-sm">
                <FontAwesomeIcon icon={faInfoCircle} /> {message}
              </p>
            )}
          />

          {/* <div className="relative mt-5">
            <label
              className="text-sm lg:text-base font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="email"
              placeholder="Enter your email"
              type="email"
              id="email"
              {...register("tag_no", { required: "This is required." })}
              disabled={isSubmitting}
            />
          </div> */}

          {/* <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }: { message: string }) => (
              <p className="my-1 text-textForm text-xs lg:text-sm">
                <FontAwesomeIcon icon={faInfoCircle} /> {message}
              </p>
            )}
          /> */}

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
