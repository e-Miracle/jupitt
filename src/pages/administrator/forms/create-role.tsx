import  { useState } from "react";
import { faInfoCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { Spinner } from "@chakra-ui/react";
import toast from "react-hot-toast";

const CreateRole = () => {
  const formSchema = z.object({
    name: z.string().min(3, { message: "name must be at least 3 characters" }),
    description: z
      .string({
        required_error: "code is required",
        invalid_type_error: "code must be a string",
      })
      .min(3),
    permissions: z
      .array(z.string())
      .min(1, { message: "At least one permission is required" }),
  });
  type FormSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  // State to track selected permissions
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions((prev) => {
        const newValue = prev.filter((p) => p !== permission);
        setValue("permissions", newValue);
        return newValue;
      });
    } else {
      setSelectedPermissions((prev) => {
        const newValue = [...prev, permission];
        setValue("permissions", newValue);
        return newValue;
      });
    }
  };

  const isPermissionSelected = (permission: string) =>
    selectedPermissions.includes(permission);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (data.permissions.length === 0) {
      toast.error("Please add a permission");
      return;
    }
    console.log(data);
  };

  return (
    <div>
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className={`mt-3 w-full border text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="tag number"
            placeholder="Enter role name"
            type="text"
            id="tag"
            {...register("name", { required: "This is required." })}
            disabled={isSubmitting}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }: { message: string }) => (
            <p className="my-1 text-textForm text-xs lg:text-sm">
              <FontAwesomeIcon icon={faInfoCircle} /> {message}
            </p>
          )}
        />
        <div>
          <textarea
            className={`mt-3 w-full border lg:h-[150px] text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
            aria-label="tag number"
            placeholder="Role description"
            {...register("description", { required: "This is required." })}
            disabled={isSubmitting}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="description"
          render={({ message }: { message: string }) => (
            <p className="my-1 text-textForm text-xs lg:text-sm">
              <FontAwesomeIcon icon={faInfoCircle} /> {message}
            </p>
          )}
        />
        <p className="font-poppins my-4 text-sm text-[#737373]">
          Select all of the badges that applies
        </p>
        <div className="flex flex-wrap">
          {[
            "business",
            "customer relations",
            "engineering",
            "finance",
            "internal control",
            "marketing",
            "products",
          ].map((item) => (
            <span
              className={`mr-2 p-1 rounded-lg font-inter capitalize text-xs mt-2 cursor-pointer hover:opacity-80 ${
                isPermissionSelected(item)
                  ? "bg-secondary text-white"
                  : "bg-[#F5F6F7]"
              }`}
              key={item}
              onClick={() => 
                togglePermission(item)
              }
            >
              {isPermissionSelected(item) ? (
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
              ) : null}
              {item}
            </span>
          ))}
        </div>
        <ErrorMessage
          errors={errors}
          name="permissions"
          render={({ message }: { message: string }) => (
            <p className="my-1 text-textForm text-xs lg:text-sm">
              <FontAwesomeIcon icon={faInfoCircle} /> {message}
            </p>
          )}
        />
        <div className="w-full">
          {isSubmitting ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-secondary text-white text-sm lg:text-base p-3 mt-10 mb-5 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm hover:bg-formBg"
            >
              Continue
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateRole;
