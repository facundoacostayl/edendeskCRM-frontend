import {FontAwesomeIcon, MyProfileIcon} from '../icons';

export const UserIcon = () => {
  return (
    <li className={`md:w-full md:flex items-center justify-center md:h-[70px] list-none cursor-pointer hover:bg-gray-200`}>
      <FontAwesomeIcon icon={MyProfileIcon} className="text-center text-gray-700 text-2xl font-semibold"/>
    </li>
  )
}
