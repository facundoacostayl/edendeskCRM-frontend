//UTILS
import { Link } from "react-router-dom";

//COMPONENTS
import { SidebarContainer } from "../ui/sidebar/SidebarContainer";
import { MenuList } from "../ui/sidebar/MenuList";
import { Icon, UserIcon } from "../ui/icons";

//ICONS
import {
  DashboardIcon,
  MyClientsIcon,
  NewBalanceIcon,
  NewClientIcon,
  MenuIcon,
} from "../ui/icons";

export const Sidebar = () => {
  return (
    <SidebarContainer>
      {/*<Hamburguer />*/}
      <div className="">
        <img
          className="hidden md:block"
          src={require("../img/logo.png")}
          alt=""
        />
        <MenuList>
          <Link to="/dashboard" className="w-full">
            <Icon type={DashboardIcon} />
          </Link>
          <Link to="/mis-clientes" className="w-full">
            <Icon type={MyClientsIcon} />
          </Link>
          <Link to="/nuevo-saldo" className="w-full">
            <Icon type={NewBalanceIcon} />
          </Link>
          <Link to="/nuevo-cliente" className="w-full">
            <Icon type={NewClientIcon} />
          </Link>
        </MenuList>
      </div>
      <div className="hidden w-full md:block">
        <UserIcon />
      </div>
    </SidebarContainer>
  );
};
