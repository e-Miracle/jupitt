import React from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { Spinner } from "@chakra-ui/react";
const Faq = () => {
  const formSchema = z.object({
    message: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .max(255, {
        message: "The password can't accept more than 255 characters",
      })
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
  };
  return (
    <div>
      {" "}
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm lg:text-base font-semibold" htmlFor="tag">
            FAQ
          </label>
          <input
            className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="tag number"
            placeholder="Enter your email or STN"
            type="text"
            id="tag"
            {...register("message", { required: "This is required." })}
            disabled={isSubmitting}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="message"
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
              className="w-full bg-secondary text-white text-sm lg:text-base  p-3 mt-10 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm   hover:bg-formBg"
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Faq;
