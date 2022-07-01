type Props = {
  children: React.ReactNode;
};

export const Hero: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative h-[500px] lg:h-[800px] flex flex-col-reverse items-center">
      {children}
    </div>
  );
};
