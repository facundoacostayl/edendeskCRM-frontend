export const TextField: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
  return (
    <input
      className="w-full py-2 px-2 md:py-4 md:px-4 md:text-lg border border-gray-200 rounded-md shadow-sm 
    focus:border-none focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
      {...props}
    />
  );
};
