import {UserIcon} from '../ui/icons';

type Props = {
  sectionName: string;
}

export const SectionBanner = ({sectionName}: Props) => {
  return (
    <div className="w-full flex justify-between bg-white p-4 border-b border-gray-200 shadow-sm">
      <h3 className="text-lg text-gray-700 font-semibold">{sectionName}</h3>
      <div className="md:hidden">
      <UserIcon/>
      </div>
    </div>
  )
}
