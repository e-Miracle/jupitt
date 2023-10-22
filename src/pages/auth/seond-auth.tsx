import { Suspense, lazy } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import toast from "react-hot-toast";
import copy from "copy-text-to-clipboard";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { confirmAuth } from "../../store/non-reducer-actions.ts";
const Spinner = lazy(() => import("../../components/spinner/Spinner"));
export default function SecondAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  if (!queryParams) <Navigate to="/register" />;
  const qrCode = queryParams.get("image");
  const identifier = queryParams.get("identifier");
  if (!identifier) <Navigate to="/register" />;

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
    const res = await confirmAuth({
      secret: data.code,
      identifier: String(identifier),
    });
    const params = {
      title: "Successfully signed up",
      description:
        "You have successfully created a new account, You can now login",
      name: "log in",
      route: "/",
    };
    const queryString = new URLSearchParams(params).toString();
    if (res) navigate(`/success?${queryString}`);
    else toast.error("Something went  wrong please try another code");
  };
  return (
    <Suspense>
      <div className="font-poppins bg-form rounded-lg my-5 lg:mt-0 p-5 lg:p-10">
        <h1 className=" font-bold text-xl lg:text-2xl ">Add MFA security</h1>

        <p className="text-sm lg:text-base mt-3">
          Only use the Authentication app approved by the organization, any
          other app is highly prohibited.
        </p>

        <div className="mx-auto w-[150px] h-[150px] my-5">
          {qrCode && (
            <img
              src={qrCode}
              alt={qrCode}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <p className="text-sm text-center lg:text-base mt-3 font-semibold">
          Scan this QR or copy the secret key below
        </p>

        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <input
              className={`mt-3 w-[70%] border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="tag number"
              placeholder="4578864GY"
              type="text"
              id="tag"
              {...register("code", { required: "This is required." })}
              disabled={isSubmitting}
            />
            <button
              onClick={handleGetValue}
              type="button"
              className="mt-3 w-[30%] text-secondary text-sm lg:text-base font-semibold "
            >
              Copy Code
            </button>
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
