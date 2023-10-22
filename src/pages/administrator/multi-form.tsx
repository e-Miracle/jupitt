import React, { useState, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  Select,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { get as getGender } from "../../store/reducers/gender";
import { get as getDept } from "../../store/reducers/department";
import { get as getRoles } from "../../store/reducers/roles";
import { get as getPermission } from "../../store/reducers/permssions";
import { get as getReports } from "../../store/reducers/reports.ts";
import { createUser } from "../../store/non-reducer-actions.ts";
// Define your Zod schema for form validation
const permissionsSchema = z.array(z.any());

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().max(10),
  role: z.string(),
  gender: z.string(),
  reports_to: z.string(),
  department: z.string(),
  permissions: permissionsSchema,
});

type FormValues = z.infer<typeof userSchema>;

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunkedArray: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

export function MultiStepForm() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getReports());
    dispatch(getGender());
    dispatch(getDept());
    dispatch(getRoles());
    dispatch(getPermission());
  }, [dispatch]);
  const genders = useAppSelector((state) => state.gender);
  const permissionss = useAppSelector((state) => state.permission);
  const departments = useAppSelector((state) => state.department);
  const roles = useAppSelector((state) => state.roles);
  const reports = useAppSelector((state) => state.reports);
  const methods = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      permissions: [],
    },
  });
  const [permissions, setPermissions] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const { control, handleSubmit, formState, setError, clearErrors } = methods;

  const { isSubmitting } = formState;

  const steps = [
    {
      label: "Personal Info",
      fields: [
        "name",
        "email",
        "phone",
        "role",
        "gender",
        "reports_to",
        "department",
      ],
    },
    {
      label: "Permissions",
      fields: chunkArray(
        permissionss.permissions && permissionss.permissions.length > 0
          ? permissionss.permissions
          : [],
        3
      ),
    },
    {
      label: "Preview",
      fields: [
        "name",
        "email",
        "phone",
        "role",
        "gender",
        "reports_to",
        "department",
        "permissions",
      ],
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (step === steps.length - 1) {
      const res = await createUser({ ...data, permissions });
      console.log("data", res);
    } else {
      nextStep();
    }
  };
  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {steps.map((stepData, index: number) => (
            <Box key={index} display={step === index ? "block" : "none"}>
              <Stack spacing={4}>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  mb={4}
                  className="mt-5 text-secondary font-poppins"
                >
                  {stepData.label}
                </Text>
                <Grid
                  templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(2, 1fr)",
                    xl: "repeat(2, 1fr)",
                    base: "repeat(1, 1fr)",
                  }}
                  gridGap="1rem"
                >
                  {stepData.fields.map((field, index: number) => {
                    if (
                      stepData.label === "Permissions" &&
                      Array.isArray(field)
                    ) {
                      return field.map((permission, i: number) => (
                        <GridItem key={`index-${i}-${permission}`} colSpan={1}>
                          <Controller
                            name={`permissions.${i}`} // Use dot notation to access nested fields
                            control={control}
                            render={({ field: { onChange } }) => (
                              <FormControl
                                isInvalid={!!formState.errors.permissions}
                              >
                                <Checkbox
                                  isChecked={permissions.includes(permission)}
                                  onChange={(e) => {
                                    const isChecked: boolean = e.target.checked;
                                    if (isChecked) {
                                      setPermissions([
                                        ...permissions,
                                        permission,
                                      ]);
                                    } else {
                                      setPermissions(
                                        permissions.filter(
                                          (p) => p !== permission
                                        )
                                      );
                                    }
                                    onChange(isChecked);
                                    if (isChecked) {
                                      clearErrors(`permissions.${i}`); // Clear errors for this field
                                    } else {
                                      setError(`permissions.${i}`, {
                                        type: "manual",
                                        message: `Please select ${permission}`,
                                      });
                                    }
                                  }}
                                >
                                  {permission}
                                </Checkbox>
                                <FormErrorMessage>
                                  {
                                    formState.errors[
                                      `permissions` as keyof FormValues
                                    ]?.message
                                  }
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          />
                        </GridItem>
                      ));
                    }
                    return (
                      <div key={`index-${index}-${field}`}>
                        {field === "permissions" ? (
                          <div className="">
                            <FormLabel className=" text-xs lg:text-sm font-poppins capitalize font-semibold text-black">
                              {field}
                            </FormLabel>
                            <div className="flex flex-wrap ">
                              {permissions.map((item, i) => (
                                <Text
                                  className="capitalize text-xs lg:text-sm text-coincard mr-2"
                                  key={i}
                                >
                                  {item}
                                </Text>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <>
                            {field === "gender" ||
                            field === "role" ||
                            field === "department" ||
                            field === "reports_to" ? (
                              <GridItem
                                key={`index-${index}-${field}`}
                                colSpan={1}
                              >
                                <Controller
                                  name={`${field as keyof FormValues}`}
                                  control={control}
                                  render={({ field: { onChange, value } }) => (
                                    <FormControl
                                      isInvalid={
                                        !!formState.errors[
                                          field as keyof FormValues
                                        ]
                                      }
                                    >
                                      <FormLabel className=" text-xs lg:text-sm font-poppins capitalize font-semibold text-black">
                                        {field}
                                      </FormLabel>
                                      {field === "department" ||
                                      field === "role" ? (
                                        <Select
                                          value={value}
                                          onChange={onChange}
                                          isDisabled={isSubmitting}
                                          onBlur={() => {
                                            clearErrors(
                                              field as keyof FormValues
                                            );
                                          }}
                                        >
                                          <option
                                            value=""
                                            className="text-xs  lowercase"
                                          >
                                            select an option
                                          </option>
                                          {field === "role" &&
                                            roles.permissions &&
                                            roles.permissions.length > 0 &&
                                            roles.permissions.map(
                                              ({
                                                id,
                                                name,
                                              }: {
                                                id: number;
                                                name: string;
                                              }) => (
                                                <option key={id} value={id}>
                                                  {name}
                                                </option>
                                              )
                                            )}
                                          {field === "department" &&
                                            departments.permissions &&
                                            departments.permissions.length >
                                              0 &&
                                            departments.permissions.map(
                                              ({
                                                id,
                                                name,
                                              }: {
                                                id: number;
                                                name: string;
                                              }) => (
                                                <option key={id} value={id}>
                                                  {name}
                                                </option>
                                              )
                                            )}
                                        </Select>
                                      ) : (
                                        <Select
                                          value={value}
                                          onChange={onChange}
                                          isDisabled={isSubmitting}
                                          onBlur={() => {
                                            clearErrors(
                                              field as keyof FormValues
                                            );
                                          }}
                                        >
                                          <option
                                            value=""
                                            className="text-xs  lowercase"
                                          >
                                            select an option
                                          </option>
                                          {/* this is the logic we are meant to use */}
                                          {field === "gender" &&
                                            genders.genders &&
                                            genders.genders.length > 0 &&
                                            genders.genders.map((gender) => (
                                              <option
                                                key={gender}
                                                value={gender}
                                              >
                                                {gender}
                                              </option>
                                            ))}
                                          {field === "reports_to" &&
                                            reports.permissions &&
                                            reports.permissions.length > 0 &&
                                            reports.permissions.map(
                                              (gender) => (
                                                <option
                                                  key={gender}
                                                  value={gender}
                                                >
                                                  {gender}
                                                </option>
                                              )
                                            )}
                                        </Select>
                                      )}

                                      <FormErrorMessage>
                                        {
                                          formState.errors[
                                            field as keyof FormValues
                                          ]?.message
                                        }
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                />
                              </GridItem>
                            ) : (
                              <GridItem
                                key={`index-${index}-${field}`}
                                colSpan={1}
                              >
                                <Controller
                                  name={`${field as keyof FormValues}`}
                                  control={control}
                                  render={({ field: { onChange, value } }) => (
                                    <FormControl
                                      isInvalid={
                                        !!formState.errors[
                                          field as keyof FormValues
                                        ]
                                      }
                                    >
                                      <FormLabel className="text-xs lg:text-sm font-poppins capitalize font-semibold text-black">
                                        {field}
                                      </FormLabel>
                                      <Input
                                        value={value}
                                        onChange={onChange}
                                        isDisabled={isSubmitting}
                                        onBlur={() => {
                                          clearErrors(
                                            field as keyof FormValues
                                          );
                                        }}
                                      />
                                      <FormErrorMessage>
                                        {
                                          formState.errors[
                                            field as keyof FormValues
                                          ]?.message
                                        }
                                      </FormErrorMessage>
                                    </FormControl>
                                  )}
                                />
                              </GridItem>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </Grid>
              </Stack>
            </Box>
          ))}
          <Box className="mt-7">
            <Button
              onClick={prevStep}
              type="button"
              isDisabled={step === 0 || isSubmitting}
            >
              Previous
            </Button>
            {step === steps.length - 1 ? (
              <Button
                className="ml-5 bg-secondary text-white"
                type="submit"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                isDisabled={permissions.length === 0 && step === 1}
                className="ml-5 bg-secondary text-white"
              >
                Next
              </Button>
            )}
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
