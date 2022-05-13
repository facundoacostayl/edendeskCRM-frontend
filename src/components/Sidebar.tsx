//SIDEBAR COMPONENTS
import { SidebarContainer } from "../ui/sidebar/SidebarContainer";
import { MenuList } from "../ui/sidebar/MenuList";
import {Icon, UserIcon } from "../ui/icons";

//ICONS
import {DashboardIcon, MyClientsIcon, NewBalanceIcon, NewClientIcon, MenuIcon} from '../ui/icons';

export const Sidebar = () => {
  return (
    <SidebarContainer>
        {/*<Hamburguer />*/}
        <div className="">
        <img className="hidden md:block" src={require('../img/logo.png')} alt="" />
        <MenuList>
          <Icon type={DashboardIcon}/>
          <Icon type={MyClientsIcon}></Icon>
          <Icon type={NewBalanceIcon}></Icon>
          <Icon type={NewClientIcon}></Icon>
        </MenuList>
        </div>
        <div className="hidden w-full md:block">
        <UserIcon/>
        </div>
      </SidebarContainer>
  )
}
