type Props = {
  children: React.ReactNode;
};

export const Hero: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {children}
    </div>
  );
};
