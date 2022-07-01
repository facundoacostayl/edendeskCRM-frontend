interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  colorScheme: "primary" | "secondary" | "tertiary" | "borders" | "remove";
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
      className={`"w-full py-1 lg:py-1 px-2 lg:px-2 text-lg font-bold rounded-md duration-200 cursor-pointer ${
        colorScheme === "primary"
          && "lg:text-2xl text-white bg-indigo-600  hover:bg-indigo-500"
      } ${colorScheme === "secondary" && "lg:text-2xl text-indigo-600 bg-white"}
      ${colorScheme === "tertiary" && "lg:text-2xl text-sky-500 bg-white hover:bg-indigo-300"}
      ${colorScheme === "remove" && "lg:text-2xl text-white bg-red-400 hover:bg-red-200"}
      ${colorScheme === "borders" && "lg:text-2xl text-white border-4 border-white hover:bg-indigo-500"}`}
    >
      {children}
    </button>
  );
};
