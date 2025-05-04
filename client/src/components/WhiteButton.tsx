import { Link } from "react-router-dom";

interface WhiteButtonProps {
  link?: string; // optional — if provided, acts as <Link>
  onClick?: () => void;
  text: string;
  width?: string;
  py?: string;
  textSize?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const WhiteButton = ({
  link,
  onClick,
  text,
  width = "40",
  py = "2",
  textSize = "base",
  children,
  disabled = false,
}: WhiteButtonProps) => {
  const baseStyles = `w-${width} py-${py} text-${textSize} duration-200 flex items-center justify-center gap-x-2 font-semibold`;

  const buttonStyles = `dark:bg-whiteSecondary bg-blackPrimary dark:hover:bg-white hover:bg-gray-800 text-whiteSecondary dark:text-blackPrimary`;

  if (link) {
    return (
      <Link to={link} className={`${baseStyles} ${buttonStyles}`}>
        {children}
        <span>{text}</span>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${buttonStyles} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
      <span>{text}</span>
    </button>
  );
};

export default WhiteButton;
