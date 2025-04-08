const Badge = ({
  text,
  status,
  state,
  customStyle,
  dot,
}: {
  text?: string;
  color?: string;
  className?: string;
  status?: string;
  state?: "success" | "danger" | "nonactive";
  customStyle?: string;
  dot?: boolean;
}) => {
  const style = {
    success: "bg-[#ECFDF3] text-[#027A48]",
    danger: "bg-[#FEF3F2] text-[#B42318]",
    nonactive: "bg-[#F5F5F5] text-[#414651]",
  };

  const dotStyle = {
    success: "bg-[#12B76A]",
    danger: "bg-[#B42318] ",
    nonactive: "bg-[#717680]",
  };

  return (
    <div
      className={`rounded-2xl text-xs font-medium capitalize w-fit py-0.5 px-2 flex items-center gap-1.5 ${
        customStyle ? customStyle : style[state || ""]
      }`}
    >
      {dot && (
        <div
          className={`w-1.5 h-1.5 rounded-full ${dotStyle[state || ""]}`}
        ></div>
      )}

      <p>{text || status}</p>
    </div>
  );
};

export default Badge;
