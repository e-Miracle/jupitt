import { Suspense, lazy, useState } from "react";
import {
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { resetPassword } from "../../store/non-reducer-actions.ts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Spinner = lazy(() => import("../../components/spinner/Spinner"));
export default function ResetPassword() {
  const navigate = useNavigate();
  const [visible, setVisibility] = useState<boolean>(false);
  const toggleVisbility = () => setVisibility((k) => !k);
  const formSchema = z.object({
    token: z
      .string({
        required_error: " token is required",
        invalid_type_error: " token must be a number",
      })
      .min(3),
    code: z
      .string({
        required_error: "code is required",
        invalid_type_error: "code must be a number",
      })
      .min(3),
    tag_no: z
      .string({
        required_error: "amount is required",
        invalid_type_error: "amount must be a number",
      })
      .min(3),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .max(50, {
        message: "The password can't accept more than 50 characters",
      })
      .refine(
        (value) =>
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value),
        "All passwords must contain at least 8 characters, including Uppercase and lowercase letters, number and symbol."
      ),
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
    const res = await resetPassword({
      identifier: data.tag_no,
      password: data.password,
      token: data.token,
      _2fa: data.code,
    });
    if (res) navigate(`/`);
    else toast.error("Something went wrong please try again");
  };
  return (
    <Suspense>
      <div className="font-poppins bg-form rounded-lg my-5 lg:mt-0 p-5 lg:p-10">
        <h1 className=" font-bold text-xl lg:text-2xl ">Reset Password</h1>

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

          <div className="relative mt-5">
            <label
              className="text-sm lg:text-base font-semibold"
              htmlFor="token"
            >
              Token
            </label>
            <input
              className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="email"
              placeholder="Enter the token received in your email"
              type="text"
              id="token"
              {...register("token", { required: "This is required." })}
              disabled={isSubmitting}
            />
          </div>

          <ErrorMessage
            errors={errors}
            name="token"
            render={({ message }: { message: string }) => (
              <p className="my-1 text-textForm text-xs lg:text-sm">
                <FontAwesomeIcon icon={faInfoCircle} /> {message}
              </p>
            )}
          />

          <div className="relative mt-5">
            <label
              className="text-sm lg:text-base font-semibold"
              htmlFor="code"
            >
              Code
            </label>
            <input
              className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="email"
              placeholder="Enter the token received in your email"
              type="text"
              id="code"
              {...register("code", { required: "This is required." })}
              disabled={isSubmitting}
            />
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

          <div className="relative mt-5">
            <label
              className="text-sm lg:text-base font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="password"
              placeholder="Enter your password"
              type={visible ? "text" : "password"}
              id="password"
              {...register("password", { required: "This is required." })}
              disabled={isSubmitting}
            />
            <button
              onClick={toggleVisbility}
              className="text-[#797F8A] absolute right-[1rem] bottom-[.7rem]"
              type="button"
            >
              {visible ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }: { message: string }) => (
              <p className="my-1 text-textForm text-xs lg:text-sm">
                <FontAwesomeIcon icon={faInfoCircle} /> {message}
              </p>
            )}
          />

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
