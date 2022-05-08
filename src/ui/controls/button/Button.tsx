interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  colorScheme: "primary" | "secondary" | "tertiary";
  onClose?: VoidFunction;
  onOpenModal?: VoidFunction;
  onConfirmModalSubmit?: VoidFunction;
}

export const Button: React.FC<Props> = ({
  children,
  colorScheme = "secondary",
  onClose,
  onOpenModal,
  onConfirmModalSubmit
}) => {
  return (
    <button
    onClick={onClose || onOpenModal || onConfirmModalSubmit}
      className={`"w-full py-1 lg:py-3 px-2 lg:px-3 text-white text-lg lg:text-2xl font-bold rounded-md duration-200 cursor-pointer ${
        colorScheme === "primary"
          && "bg-indigo-600  hover:bg-indigo-500"
      } ${colorScheme === "secondary" && "text-indigo-600 bg-white hover:bg-indigo-300"}
      ${colorScheme === "tertiary" && "text-sky-500 bg-white hover:bg-indigo-300"}`}
    >
      {children}
    </button>
  );
};
