import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from './index';

type Props = {
  type: IconProp;
}

export const Icon: React.FC<Props> = ({type}) => {
  return (
    <li className={`w-full flex items-center justify-center md:h-[70px] cursor-pointer hover:bg-gray-200`}>
      <FontAwesomeIcon className="text-center text-gray-700 text-2xl font-semibold" icon={type}/>
    </li>
  );
};
