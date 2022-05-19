type Props = {
  children: React.ReactNode,
  margin?: "my-2",
  center? : "items-center",
  onSetClientId?: VoidFunction
};

export const Card: React.FC<Props> = ({ children, margin, center, onSetClientId }) => {
  return (
    <article onClick={onSetClientId} className={`w-full flex justify-between ${center} py-4 px-4 md:py-10 mx-auto bg-white border border-gray-200 shadow-sm
    rounded-xl ${margin}`}>
      {children}
    </article>
  );
};
