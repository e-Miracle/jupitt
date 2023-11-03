import React from "react";
import { z } from "zod";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spinner } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { setFiatAml } from "../../../store/non-reducer-actions.ts/aml";
type Props = {
  tier: "tier 1" | "tier 2" | "tier 3" | "ordinary";
  type: "deposit" | "withdrawal";
  id: number;
  className?: string | undefined;
};
const FiatForm: React.FC<Props> = ({ type, tier, id, className }) => {
  const formSchema = z.object({
    limit: z
      .number({
        required_error: "limit is required",
        invalid_type_error: "limit must be a number",
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
    const packet: {
      withdrawal_limit?: number;
      country_id: number;
      level: number;
      deposit_limit?: number;
    } = {
      withdrawal_limit: data.limit,
      country_id: id,
      level: tier === "ordinary" ? 0 : parseInt(tier.split(" ")[1]),
      deposit_limit: data.limit,
    };
    if (type === "deposit") delete packet.withdrawal_limit;
    if (type === "withdrawal") delete packet.deposit_limit;
    const res = await setFiatAml(packet);
    if (res) reset({ limit: 0 });
    return;
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
            Fiat {type}
          </label>
          <input
            className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="rate"
            placeholder="Enter rate"
            type="number"
            {...register("limit", {
              required: "This is required.",
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
          />
          <ErrorMessage
            errors={errors}
            name="limit"
            render={({ message }: { message: string }) => (
              <p className="my-1 text-textForm text-xs lg:text-sm">
                <FontAwesomeIcon icon={faInfoCircle} /> {message}
              </p>
            )}
          />
        </div>

        <div className=" w-full lg:w-[20%] mb-5 min-w-[50px]">
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

export default FiatForm;
