import React, { useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Spinner } from "@chakra-ui/react";
import { useAppSelector } from "../../store/hooks";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "@hookform/error-message";
import { Icrypto } from "../../utils";

type Action = {
  action: "credit" | "debit";
};

export type ISubmitCrypto = Icrypto & Action;

type Props = {
  action: "credit" | "debit";
  handleConvert?: (values: ISubmitCrypto) => Promise<void>;
};

const conversionSchema = z.object({
  amount: z.string(),
  asset: z.string(),
});
type ConversionFormData = z.infer<typeof conversionSchema>;

const ConversionForm: React.FC<Props> = ({ handleConvert, action }) => {
  const options = useMemo(() => ["ETH", "BTC"], []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConversionFormData>({
    resolver: zodResolver(conversionSchema),
  });
  const { user } = useAppSelector((state) => state.user);

  const onSubmit: SubmitHandler<ConversionFormData> = async (data) => {
    console.log(data, user?.identifier);
    handleConvert &&
     await handleConvert({
        action,
        ...data,
        identifier: user?.identifier ? user?.identifier : "",
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="text-sm lg:text-base font-semibold" htmlFor="btc">
          Amount
        </label>
        <input
          className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          type="text"
          id="amount"
          {...register("amount", { required: "This is required." })}
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

      <div className="mt-5">
        <label className="text-sm lg:text-base font-semibold" htmlFor="usd">
          Asset
        </label>
        <select
          className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          placeholder="BTC"
          {...register("asset", { required: "This is required." })}
        >
          {" "}
          <option value="">Select</option>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <ErrorMessage
        errors={errors}
        name="asset"
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

export default ConversionForm;
