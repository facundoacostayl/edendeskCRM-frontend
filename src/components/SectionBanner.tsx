//HOOKS
import { useState } from "react";

//COMPONENTS
import { UserIcon } from "../ui/icons";

type Props = {
  sectionName: string;
};

export const SectionBanner = ({ sectionName }: Props) => {
  const [isUserIconMenuActive, setIsUserIconMenuActive] = useState(false);

  return (
    <div className="w-full bg-white p-4 border-b border-gray-200 shadow-sm">
      <div className="md:w-[80%] mx-auto flex justify-between">
        <h3 className="text-lg md:text-2xl text-gray-700 font-semibold">{sectionName}</h3>
        <div className="md:hidden flex items-center">
          <UserIcon />
        </div>
      </div>
    </div>
  );
};
