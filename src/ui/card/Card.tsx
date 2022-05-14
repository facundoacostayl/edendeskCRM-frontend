type Props = {
  children: React.ReactNode,
  margin?: "my-2",
  center? : "items-center",
  onSetClientId?: VoidFunction
};

export const Card: React.FC<Props> = ({ children, margin, center, onSetClientId }) => {
  return (
    <article onClick={onSetClientId} className={`w-full flex justify-between ${center} max-w-lg h-[100px] mx-auto bg-white border border-gray-200 shadow-sm py-2 px-2
    rounded-xl ${margin}`}>
      {children}
    </article>
  );
};
