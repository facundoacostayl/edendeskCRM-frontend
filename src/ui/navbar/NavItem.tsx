type Props = {
  children: React.ReactNode;
  type: "normal" | "outstanding";
  responsive?: "small" | "lg";
};

export const NavItem: React.FC<Props> = ({ type = "normal", responsive, children }) => {
  return (
    <li
      className={`list-none text-slate-500 ${
        type === "normal" ? "font-semibold" : "font-bold"
      } ${responsive === "lg" ? "hidden" : ""}`}
    >
      {children}
    </li>
  );
};
