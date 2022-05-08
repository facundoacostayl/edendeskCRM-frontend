type Props = {
  children: React.ReactNode;
};

export const Hero: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative h-[500px] lg:h-[800px] bg-gradient-to-t from-sky-500 to-indigo-600 rounded-lg flex flex-col-reverse items-center justify-center">
      {children}
    </div>
  );
};
