type Props = {
    onOpenModal?: VoidFunction,
    onOperate: React.Dispatch<React.SetStateAction<boolean>>,
};

export const OperatorButtons: React.FC<Props> = ({onOpenModal, onOperate}) => {
  return (
    <div onClick={onOpenModal} className="w-[100px] md:w-[120px] h-[35px] md:h-[45px] flex bg-white rounded-lg shadow-sm">
      <button onClick={() => onOperate(false)} className="w-full bg-red-200 rounded-l-lg">-</button>
      <button onClick={() => onOperate(true)} className="w-full bg-green-200 rounded-r-lg">+</button>
    </div>
  );
};
