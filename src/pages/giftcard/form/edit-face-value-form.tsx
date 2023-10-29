import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Spinner } from "@chakra-ui/react";

// Define the Zod schema for the gift card values
// const giftCardSchema = z.array(z.string());

const GiftCardForm = () => {
  const initialData = React.useMemo(
    () => [
      "5",
      "10",
      "15",
      "20",
      "25",
      "50",
      "100",
      "200",
      "250",
      "500",
      "750",
      "1000",
      "1500",
      "2000",
    ],
    []
  );
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ giftCards: string[] }>({
    defaultValues: { giftCards: initialData },
  });

  // Handler for form submission
  const onSubmit: SubmitHandler<{ giftCards: string[] }> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-[1rem]">
        {initialData.map((value, index) => (
          <div key={index} className={``}>
            <label>
              <Controller
                name={`giftCards.${index}`}
                control={control}
                defaultValue={value}
                render={({ field }) => (
                  <label className={`inline-flex items-center`}>
                    <input
                      type="checkbox"
                      {...field}
                      className="mr-2 accent-secondary"
                    />
                    <span
                      className={`text-${
                        field.value  ? "secondary" : "[#6C757D]"
                      }`}
                    >
                      ${value}
                    </span>
                  </label>
                )}
              />
            </label>
          </div>
        ))}
      </div>
      <div className="w-full">
        {isSubmitting ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-submit text-white text-sm lg:text-base p-3 my-5 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm hover:bg-formBg"
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default GiftCardForm;
