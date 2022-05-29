interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  colorScheme: "primary" | "secondary" | "tertiary" | "remove";
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
      className={`"w-full py-1 lg:py-1 px-2 lg:px-2 text-lg lg:text-2xl font-bold rounded-md duration-200 cursor-pointer ${
        colorScheme === "primary"
          && "text-white bg-indigo-600  hover:bg-indigo-500"
      } ${colorScheme === "secondary" && "text-indigo-600 bg-white"}
      ${colorScheme === "tertiary" && "text-sky-500 bg-white hover:bg-indigo-300"}
      ${colorScheme === "remove" && "text-white bg-red-400 hover:bg-red-200"}`}
    >
      {children}
    </button>
  );
};
