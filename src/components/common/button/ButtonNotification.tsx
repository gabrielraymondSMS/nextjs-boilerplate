import MyIcon from "../icon/MyIcon";

const ButtonNotification = () => {
  return (
    <div className="flex justify-center items-center">
      <button className="p-2 text-[#535862] hover:text-[#5DCB74] rounded-full">
        <MyIcon
          src="/assets/icons/ic-bell.svg"
          width={20}
          height={20}
          className=""
        />
      </button>
    </div>
  );
};

export default ButtonNotification;
