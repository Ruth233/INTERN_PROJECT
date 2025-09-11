interface ButtonProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Button = ({ setIsOpen }: ButtonProps) => {
  return (
    <button
      onClick={() => setIsOpen(true)}
      aria-label="Add intern"
      title="Add new intern"
      className="text-5xl px-3 py-2 bg-blue-950 text-white rounded-md bottom-5 cursor-pointer hover:bg-blue-900 transition-colors duration-[0.3s] right-5 fixed"
    >
      +
    </button>
  );
};
export default Button;
