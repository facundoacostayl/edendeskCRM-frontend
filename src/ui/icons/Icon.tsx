import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from './index';

type Props = {
  type: IconProp;
  title?: string;
  color?: string;
  forButton?: boolean;
}

export const Icon: React.FC<Props> = ({type, title, color, forButton=false}) => {
  return (
    <li className={`${!forButton ? "w-full flex flex-col items-center justify-center gap-1 md:h-[100px] cursor-pointer md:hover:bg-gray-200" : "list-none"}`}>
      <FontAwesomeIcon className={`text-center text-gray-700 ${color} ${forButton ? "text-2xl" : "text-3xl"} md:text-2xl font-semibold`} icon={type}/>
      <span className="text-xs md:text-lg text-gray-700">{title}</span>
    </li>
  );
};
