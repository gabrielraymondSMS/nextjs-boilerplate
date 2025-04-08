import Button from "@/components/common/button/Button";
import MyIcon from "@/components/common/icon/MyIcon";
import Modal from "@/components/common/modal/Modal";
import React from "react";

const ConfirmationLead = ({
  isShow,
  setIsShow,
  handleSubmit,
  title,
  desc,
  isLoading,
  primaryButton,
  secondaryButton,
  stylePrimaryButton = "primary",
}: {
  isShow: boolean;
  setIsShow: (prev: any) => void;
  handleSubmit: () => void;
  title?: string;
  desc?: string;
  isLoading?: boolean;
  primaryButton?: string;
  secondaryButton?: string;
  stylePrimaryButton?: "primary" | "danger";
}) => {
  const handleCancel = () => {
    setIsShow(false);
  };

  const handleClickSubmit = () => {
    handleSubmit();
  };

  const header = () => {
    return (
      <div className="flex gap-5">
        <div className="rounded-full p-2 bg-[#C3EFCB] border-[8px] border-[#E0F8E4] w-fit h-fit">
          <MyIcon
            src="/assets/icons/ic-map.svg"
            width={24}
            height={24}
            className="text-[#267D39]"
          />
        </div>
        <div className="w-full">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-sm font-normal text-[#535862]">{desc}</p>
        </div>
      </div>
    );
  };

  const footer = () => {
    return (
      <div className="flex gap-4">
        {secondaryButton && (
          <Button
            className="w-full"
            style="outline_secondary"
            onClick={handleCancel}
          >
            {secondaryButton}
          </Button>
        )}
        {primaryButton && (
          <Button
            className="w-full"
            onClick={handleClickSubmit}
            loading={isLoading}
            style={stylePrimaryButton}
          >
            {primaryButton}
          </Button>
        )}
      </div>
    );
  };
  return (
    <Modal
      header={header()}
      footer={footer()}
      isShow={isShow}
      setIsShow={setIsShow}
      width="w-fit"
    />
  );
};

export default ConfirmationLead;
