interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  colorScheme: "primary" | "secondary";
  onClose?: VoidFunction
}

export const Button: React.FC<Props> = ({
  children,
  colorScheme = "secondary",
  onClose
}) => {
  return (
    <button
    onClick={onClose}
      className={`" w-full py-1 px-2 text-white text-lg font-bold rounded-md duration-200 cursor-pointer ${
        colorScheme === "primary"
          ? "bg-indigo-600  hover:bg-indigo-500"
          : "text-indigo-500 bg-slate-200 hover:bg-indigo-300"
      }`}
    >
      {children}
    </button>
  );
};
