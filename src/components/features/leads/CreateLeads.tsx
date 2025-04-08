"use client";
import Button from "@/components/common/button/Button";
import CustomSelect from "@/components/common/form/CustomSelect";
import InputPhone from "@/components/common/form/InputPhone";
import InputText from "@/components/common/form/InputText";
import HeaderPage from "@/components/common/header/HeaderPage";
import MyIcon from "@/components/common/icon/MyIcon";
import {
  annualElectricityConsumptionOptions,
  annualGasConsumptionOptions,
  budgetOptions,
  companySectorOptions,
  companySizeOptions,
  electroGasIntensiveOptions,
  greenEnergyUsageOptions,
  leadTypeOptions,
  readyForSubsidyOptions,
  underwayEnergyRenovationOptions,
} from "@/lib/options/Options";
import { leadSchema } from "@/lib/validation/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ConfirmationLead from "./ConfirmationLead";
import { useUserList } from "@/hooks/users/useUsers";
import { User } from "@/types/ColumnType";
import { LeadFormValues, LeadsType } from "@/types/LeadType";
import { useCreateLead } from "@/hooks/useCreateLead";

const CreateLeads = () => {
  const router = useRouter();

  const { mutate } = useCreateLead();

  // state
  const [isShowConfirmationCreate, setIsShowConfirmationCreate] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState({});

  const {
    data: userListData,
    isLoading: isUserListLoading,
    // error: userError,
  } = useUserList({ page: 1, limit: 1000 });

  // react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: yupResolver(leadSchema),
  });

  const onSubmit: SubmitHandler<LeadFormValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        router.push("/leads");
      },
    });
    console.log(data);
  };

  const userValue = Number(watch("user_id"));
  const leadTypeValue = watch("lead_type");
  const companySizeValue = watch("company_size");
  const companySectorValue = watch("company_sector");
  const annualGasConsumptionValue = watch("annual_gas_consumption");
  const annualElectricityConsumtionValue = watch(
    "annual_electricity_consumtion"
  );
  const greenEnergyValue = watch("green_energy");
  const underwayEnergyRenovationValue = watch("underway_energy_renovation");
  const readyForSubsidyValue = watch("ready_for_subsidy");
  const budgetValue = watch("budget");
  const electroGasIntensiveValue = watch("electro_gas_intensive");
  const regionalAidEligibilityValue = watch("regional_aid_eligibility");
  const hasEnergyTaxExemptionValue = watch("has_energy_tax_exemption");

  return (
    <>
      <div className="overflow-auto h-[calc(100vh-68px)] px-8 pt-6">
        <ConfirmationLead
          setIsShow={setIsShowConfirmationCreate}
          isShow={isShowConfirmationCreate}
          handleSubmit={handleSubmit(onSubmit)}
          title="Confirm Create Lead?"
          desc="After confirm, Lead data will send to admin to review."
          primaryButton="Confirms"
          secondaryButton="Cancel"
        // isLoading={isPending}
        />
        <HeaderPage
          title={
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/leads")}>
                <MyIcon
                  src="/assets/icons/ic-chevron_down.svg"
                  width={24}
                  height={24}
                  className="rotate-90"
                />
              </button>
              <h1>Create New Leads</h1>
            </div>
          }
          button={
            <div className="flex items-center gap-4">
              <Button
                className="w-fit"
                style="primary"
                onClick={async () => {
                  const isValid = await trigger(); // Manually trigger validation
                  if (isValid) {
                    setIsShowConfirmationCreate(true); // Show confirmation only if valid
                  }
                }}
              >
                Create
              </Button>
            </div>
          }
        />

        <div className=" overflow-auto h-[calc(100vh-170px)] -mx-8 px-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <h1 className="text-[#414651] font-semibold text-sm mb-4">
                Company Detail
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <CustomSelect
                  name="user_id"
                  label="User"
                  placeholder="Select a user"
                  value={userValue ?? ""}
                  onChange={(value) => setValue("user_id", Number(value))}
                  onBlur={() => setValue("user_id", userValue ?? "")}
                  options={userListData?.data ?? []}
                  error={errors.user_id?.message}
                  valueKey="id" // Gunakan "id" sebagai value
                  labelKey="name" // Gunakan "name" sebagai label
                />

                <InputText
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                  disabled={true}
                  value={
                    userListData?.data?.find(
                      (item: User) => item.id === userValue
                    )?.email ?? ""
                  }
                />

                <InputPhone
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter phone number (e.g., +33 612345678)"
                  value={`${userListData?.data?.find(
                    (item: User) => item.id === userValue
                  )?.phone
                    }`} // From your form state
                  disabled
                  onBlur={() => { }} // Optional blur handler
                />

                <CustomSelect
                  name="lead_type"
                  label="Lead Type"
                  placeholder="Select lead type"
                  value={leadTypeValue ?? ""}
                  onChange={(value) => setValue("lead_type", value)}
                  onBlur={() => setValue("lead_type", leadTypeValue ?? "")}
                  options={leadTypeOptions}
                  error={errors.lead_type?.message}
                  valueKey="id" // Gunakan "id" sebagai value
                  labelKey="name" // Gunakan "name" sebagai label
                />
              </div>
            </div>
            <div className="mb-4">
              <h1 className="text-[#414651] font-semibold text-sm mb-4">
                Company Detail
              </h1>
              <div className="grid grid-cols-2 gap-4 items-end">
                <InputText
                  label="Client company name"
                  placeholder="Enter company name (e.g., ABC Corp)"
                  {...register("company_name")} // Bind the input to React Hook Form
                  error={errors.company_name?.message}
                />

                <InputText
                  label="Client company number (SIRET)"
                  placeholder="Enter company number"
                  {...register("company_number")} // Bind the input to React Hook Form
                  error={errors.company_name?.message}
                />

                <CustomSelect
                  name="company_size"
                  label="Size of company"
                  placeholder="Select company size"
                  value={companySizeValue ?? ""}
                  onChange={(value) => setValue("company_size", Number(value))}
                  onBlur={() =>
                    setValue("company_size", companySizeValue ?? "")
                  }
                  options={companySizeOptions}
                  labelKey="name"
                  valueKey="id"
                  error={errors.company_size?.message}
                />

                <CustomSelect
                  name="company_sector"
                  label="What is the sector for your company?"
                  placeholder="Select industry sector"
                  value={companySectorValue ?? ""}
                  onChange={(value) => setValue("company_sector", value)}
                  onBlur={() =>
                    setValue("company_sector", companySectorValue ?? "")
                  }
                  options={companySectorOptions}
                  labelKey="name"
                  valueKey="id"
                  error={errors.company_sector?.message}
                />

                <CustomSelect
                  name="annual_gas_consumption"
                  label="What is your annual consumption of gas?"
                  placeholder="Enter consumption"
                  value={annualGasConsumptionValue ?? ""}
                  onChange={(value) =>
                    setValue("annual_gas_consumption", value)
                  }
                  onBlur={() =>
                    setValue(
                      "annual_gas_consumption",
                      annualGasConsumptionValue ?? ""
                    )
                  }
                  options={annualGasConsumptionOptions}
                  labelKey="name"
                  valueKey="id"
                  error={errors.annual_gas_consumption?.message}
                />

                <CustomSelect
                  name="annual_electricity_consumtion"
                  label="What is your annual consumption of electricity?"
                  placeholder="Enter consumption"
                  value={annualElectricityConsumtionValue ?? ""}
                  onChange={(value) =>
                    setValue("annual_electricity_consumtion", value)
                  }
                  onBlur={() =>
                    setValue(
                      "annual_electricity_consumtion",
                      annualElectricityConsumtionValue ?? ""
                    )
                  }
                  options={annualElectricityConsumptionOptions}
                  labelKey="name"
                  valueKey="id"
                  error={errors.annual_electricity_consumtion?.message}
                />

                <CustomSelect
                  name="green_energy"
                  label="Do you use green energy?"
                  placeholder="Select an option"
                  value={greenEnergyValue ?? ""}
                  onChange={(value) => setValue("green_energy", value)}
                  onBlur={() =>
                    setValue("green_energy", greenEnergyValue ?? "")
                  }
                  options={greenEnergyUsageOptions}
                  labelKey="name"
                  valueKey="id"
                  error={errors.green_energy?.message}
                />

                <CustomSelect
                  name="underway_energy_renovation"
                  label="Do you have any energy renovation projects underway or planned?"
                  placeholder="Select project type"
                  value={underwayEnergyRenovationValue ?? ""}
                  onChange={(value) =>
                    setValue("underway_energy_renovation", value)
                  }
                  onBlur={() =>
                    setValue(
                      "underway_energy_renovation",
                      underwayEnergyRenovationValue ?? ""
                    )
                  }
                  options={underwayEnergyRenovationOptions}
                  labelKey="name"
                  valueKey="id"
                  error={errors.underway_energy_renovation?.message}
                />

                <CustomSelect
                  name="ready_for_subsidy"
                  label="Are you ready to delegate the administative procedures to obtain subsidies?"
                  placeholder="Select an option"
                  value={readyForSubsidyValue ?? ""}
                  onChange={(value) => setValue("ready_for_subsidy", value)}
                  onBlur={() =>
                    setValue("ready_for_subsidy", readyForSubsidyValue ?? "")
                  }
                  options={readyForSubsidyOptions}
                  labelKey="name"
                  valueKey="id"
                  error={errors.ready_for_subsidy?.message}
                />

                <CustomSelect
                  name="budget"
                  label="What is your budget?"
                  placeholder="Select budget range"
                  value={budgetValue ?? ""}
                  onChange={(value) => setValue("budget", value)}
                  onBlur={() => setValue("budget", budgetValue ?? "")}
                  options={budgetOptions}
                  labelKey="name"
                  valueKey="id"
                  error={errors.budget?.message}
                />

                <CustomSelect
                  name="electro_gas_intensive"
                  label="Is your company classified as electro-intensive or gas-intensive (high energy consumption compared to the average for your sector)?"
                  placeholder="Select an option"
                  value={electroGasIntensiveValue ?? ""}
                  onChange={(value) => setValue("electro_gas_intensive", value)}
                  onBlur={() =>
                    setValue(
                      "electro_gas_intensive",
                      electroGasIntensiveValue ?? ""
                    )
                  }
                  options={electroGasIntensiveOptions}
                  labelKey="name"
                  valueKey="id"
                  error={errors.electro_gas_intensive?.message}
                />

                <CustomSelect
                  name="regional_aid_eligibility"
                  label="Is your company located in an area eligible for regional aid (rural areas, priority industrial zones, etc.)?"
                  placeholder="Select an option"
                  value={regionalAidEligibilityValue ?? ""}
                  onChange={(value) =>
                    setValue("regional_aid_eligibility", value)
                  }
                  onBlur={() =>
                    setValue(
                      "regional_aid_eligibility",
                      regionalAidEligibilityValue ?? ""
                    )
                  }
                  options={electroGasIntensiveOptions}
                  labelKey="name"
                  valueKey="id"
                  error={errors.regional_aid_eligibility?.message}
                />

                <CustomSelect
                  name="has_energy_tax_exemption"
                  label="Does your company already benefit from an exemption or a reduced rate for the TCIGN or other energy taxes?"
                  placeholder="Select an option"
                  value={hasEnergyTaxExemptionValue ?? ""}
                  onChange={(value) =>
                    setValue("has_energy_tax_exemption", value)
                  }
                  onBlur={() =>
                    setValue(
                      "has_energy_tax_exemption",
                      hasEnergyTaxExemptionValue ?? ""
                    )
                  }
                  options={electroGasIntensiveOptions}
                  labelKey="name"
                  valueKey="id"
                  error={errors.has_energy_tax_exemption?.message}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateLeads;
