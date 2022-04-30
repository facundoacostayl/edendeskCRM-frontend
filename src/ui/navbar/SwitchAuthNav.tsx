type Props = {
  children: React.ReactNode;
};

export const SwitchAuthNav: React.FC<Props> = ({ children }) => {
  return <nav className="w-[95%] mx-auto py-2 flex justify-end">{children}</nav>;
};
