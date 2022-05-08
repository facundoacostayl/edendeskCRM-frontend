type Props = {
  children: React.ReactNode;
};

export const Hero: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-[500px] bg-gradient-to-t from-sky-500 to-indigo-600 rounded-lg flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
