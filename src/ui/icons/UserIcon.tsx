//HOOKS
import { useState } from "react";
import { Link } from "react-router-dom";

//COMPONENTS
import { FontAwesomeIcon, MyProfileIcon } from "../icons";

type Props = {
  onToggle: VoidFunction;
};

export const UserIcon = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <>
      {isMenuActive && (
        <div
          onClick={() => setIsMenuActive(false)}
          className="absolute top-0 left-0 w-screen h-screen"
        >
          <div className="z-50 absolute xsm:top-0 right-0 md:bottom-0 md:left-0 w-[150px] h-[100px] flex items-center border border-gray-200 text-gray-700 bg-white rounded-md">
            <ul className="w-full">
              <Link to="/mi-perfil">
                <li className="w-full py-1 px-2 text-lg font-medium hover:bg-gray-200">
                  Mi Perfil
                </li>
              </Link>
              <li className="w-full py-1 px-2 text-lg font-medium cursor-pointer hover:bg-gray-200">
                Cerrar Sesión
              </li>
            </ul>
          </div>
        </div>
      )}
      <li
        onClick={() => setIsMenuActive(true)}
        className={`md:w-full md:flex md:h-[50px] items-center justify-center list-none cursor-pointer hover:bg-gray-200`}
      >
        <FontAwesomeIcon
          icon={MyProfileIcon}
          className="text-2xl text-center text-gray-700 font-semibold"
        />
      </li>
    </>
  );
};
