import React, { useMemo, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import countryList from "react-select-country-list"; // Import SelectCountry
import { ErrorMessage } from "@hookform/error-message";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@chakra-ui/react";
import { EmptyImage } from "../../../assets";
import toast from "react-hot-toast";
type CardData = {
  cardName: string;
  country: string;
  cardType: string;
  vendor: string;
  image: File | null;
};

const cardSchema = z.object({
  cardName: z.string().min(2),
  country: z.string().min(2),
  cardType: z.string().min(2),
  vendor: z.string().min(2),
  image: z.string().optional(),
});

const dropzoneStyles: React.CSSProperties = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  cursor: "pointer",
};

const AddCardForm: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const countries = useMemo(() => countryList().getData(), []);
  const cardTypes = useMemo(() => ["Type 1", "Type 2", "Type 3"], []);
  const vendors = useMemo(() => ["Vendor 1", "Vendor 2", "Vendor 3"], []);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CardData>({
    resolver: zodResolver(cardSchema),
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setImage(event.target.result as string);
        }
      };

      reader.readAsDataURL(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const onSubmit: SubmitHandler<CardData> = async (data) => {
    if (!image || !file) {
      toast.error("Please add an image");
      return;
    }
    console.log({ ...data, file });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-poppins">
      <div>
        <label htmlFor="cardName" className="text-xs font-semibold capitalize ">
          Card Name:
        </label>
        <input
          className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
          aria-label="cardName"
          placeholder="Enter card name"
          type="text"
          id="cardName"
          {...register("cardName", { required: "This is required." })}
          disabled={isSubmitting}
        />
      </div>

      <ErrorMessage
        errors={errors}
        name="cardName"
        render={({ message }: { message: string }) => (
          <p className="my-1 text-textForm text-xs lg:text-sm">
            <FontAwesomeIcon icon={faInfoCircle} /> {message}
          </p>
        )}
      />

      <div className="mt-2">
        <label htmlFor="country" className="text-xs font-semibold capitalize ">
          Country:
        </label>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              {...field}
              className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            >
              <option value={""}>Select An option</option>
              {countries.map((type, index) => (
                <option key={index} value={type.label}>
                  {type.label}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <ErrorMessage
        errors={errors}
        name="country"
        render={({ message }: { message: string }) => (
          <p className="my-1 text-textForm text-xs lg:text-sm">
            <FontAwesomeIcon icon={faInfoCircle} /> {message}
          </p>
        )}
      />

      <div className="mt-2">
        <label className="text-xs font-semibold capitalize ">Card Type:</label>
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
              {cardTypes.map((type: string, index: number) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}
        />
        {errors.cardType && <span>{errors.cardType.message}</span>}
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

      <div className="mt-2">
        <label className="text-xs font-semibold capitalize ">Vendor:</label>
        <Controller
          name="vendor"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              {...field}
              className={`mt-1 w-full border border-[#CED4DA] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            >
              <option value={""}>Select An option</option>
              {vendors.map((vendor, index) => (
                <option key={index} value={vendor}>
                  {vendor}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <ErrorMessage
        errors={errors}
        name="vendor"
        render={({ message }: { message: string }) => (
          <p className="my-1 text-textForm text-xs lg:text-sm">
            <FontAwesomeIcon icon={faInfoCircle} /> {message}
          </p>
        )}
      />

      {image ? (
        <img src={image} alt={image} className="mt-5" />
      ) : (
        <div
          {...getRootProps()}
          style={dropzoneStyles}
          className="mt-5 w-[200px]  mx-auto p-2 "
        >
          <input {...getInputProps()} />
          <div className="mt-5">
            <img
              src={EmptyImage}
              alt={EmptyImage}
              className="w-[50px] h-[50px] object-contain mx-auto"
            />
          </div>
          <p className="block text-xs text-center text-[#858585] font-bold my-4 w-full">
            Upload card image here
          </p>
        </div>
      )}

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
  );
};

export default AddCardForm;
