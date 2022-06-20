import { TextField } from "../form/textField";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onClose: VoidFunction;
};

export const Modal: React.FC<Props> = ({ children, onClose, ...props}) => {
  return (
    <section className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center">
      <b className="z-20 absolute top-0 left-0 w-[100vw] h-[100vh] bg-slate-900/50" onClick={onClose}></b>
      <article className="z-30 bg-white w-[90%] max-w-[480px] p-3 rounded-md">
        <form {...props}>
        {children}
        </form>
      </article>
    </section>
  );
};
