import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Spinner,
} from "@chakra-ui/react";
import { Suspense } from "react";
import Title from "../../../components/title";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import {  ticketColors, ticketStatus } from "../../../constants";
const AddTicket = () => {
  const formSchema = z.object({
    email: z
      .string()
      .email()
      .min(8, { message: "password must be at least 8 characters" }),
    body: z
      .string({
        required_error: "ticket body is required",
        invalid_type_error: " ticket body must be a string",
      })
      .min(3),
    status: z
      .string({
        required_error: "status is required",
        invalid_type_error: " status must be a string",
      })
      .min(3),
    type: z
      .string({
        required_error: "type is required",
        invalid_type_error: " type must be a string",
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
  };
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Title title="New Ticket" backBtn={true} />
        <Tabs position="relative" className=" mt-3">
          <Box>
            <TabList
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Box className=" flex items-center">
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Add Ticket
                </Tab>
              </Box>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="#0D63D3"
              borderRadius="1px"
            />
          </Box>
          <TabPanels>
            <TabPanel>
              <h2 className="text-base lg:text-lg font-montserrat font-semibold">
                New Ticket
              </h2>
              <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-[1rem] lg:grid-cols-3">
                  <div>
                    <label
                      className="text-sm lg:text-base font-semibold capitalize font-montserrat block text-[#2E2A40]"
                      htmlFor="tag"
                    >
                      Customer Email
                    </label>
                    <input
                      className={`mt-3 w-full border text-sm font-montserrat  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                      aria-label="tag number"
                      placeholder="Enter your email "
                      type="email"
                      id="tag"
                      {...register("email", { required: "This is required." })}
                      disabled={isSubmitting}
                    />

                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }: { message: string }) => (
                        <p className="my-1 text-textForm text-xs lg:text-sm">
                          <FontAwesomeIcon icon={faInfoCircle} /> {message}
                        </p>
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm lg:text-base font-semibold capitalize font-montserrat block text-[#2E2A40]"
                      htmlFor="tag"
                    >
                      Request Ticket Type
                    </label>
                    <select
                      className={`mt-3 w-full border p-3 rounded-md outline-none text-sm lg:text-base  font-montserrat`}
                      {...register("type", { required: "This is required." })}
                    >
                      <option value="">Selext</option>
                      <option value="Deposit">Deposit</option>
                      <option value="Withdrawal">Withdrawal</option>
                    </select>

                    <ErrorMessage
                      errors={errors}
                      name="type"
                      render={({ message }: { message: string }) => (
                        <p className="my-1 text-textForm text-xs lg:text-sm">
                          <FontAwesomeIcon icon={faInfoCircle} /> {message}
                        </p>
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm lg:text-base font-semibold capitalize font-montserrat block text-[#2E2A40]"
                      htmlFor="tag"
                    >
                      Request Ticket Type
                    </label>
                    <select
                      className={`mt-3 w-full border p-3 rounded-md outline-none text-sm lg:text-base  font-montserrat`}
                      {...register("status", { required: "This is required." })}
                    >
                      <option value="">Selext</option>
                      {ticketStatus.map((item) => (
                        <>
                          <option key={item} value={item}>
                            <span
                              style={{ background: ticketColors[item] }}
                              className="block w-[20px] h-[20px] rounded-full  mr-2"
                            ></span>{" "}
                            {item} ticket
                          </option>
                        </>
                      ))}
                    </select>

                    <ErrorMessage
                      errors={errors}
                      name="status"
                      render={({ message }: { message: string }) => (
                        <p className="my-1 text-textForm text-xs lg:text-sm">
                          <FontAwesomeIcon icon={faInfoCircle} /> {message}
                        </p>
                      )}
                    />
                  </div>
                </div>
                <div className="mt-5 lg:mt-10">
                  <label
                    className="text-sm lg:text-base font-semibold capitalize font-montserrat block text-[#2E2A40]"
                    htmlFor="tag"
                  >
                    Ticket Body
                  </label>
                  <textarea
                    className={`mt-3 w-full lg:h-[200px] border text-sm  lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                    aria-label="tag number"
                    {...register("body", { required: "This is required." })}
                    disabled={isSubmitting}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name="body"
                  render={({ message }: { message: string }) => (
                    <p className="my-1 text-textForm text-xs lg:text-sm">
                      <FontAwesomeIcon icon={faInfoCircle} /> {message}
                    </p>
                  )}
                />
                <div className=" w-full flex justify-center items-center">
                  {isSubmitting ? (
                    <div>
                      <Spinner />
                    </div>
                  ) : (
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className=" bg-[#1C1C93] text-white text-sm lg:text-base  py-2 px-10 mt-10 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm   hover:bg-formBg"
                    >
                      Send
                    </button>
                  )}
                </div>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Suspense>
  );
};

export default AddTicket;
