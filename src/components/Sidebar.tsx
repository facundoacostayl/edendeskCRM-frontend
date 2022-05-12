//SIDEBAR COMPONENTS
import { SidebarContainer } from "../ui/sidebar/SidebarContainer";
import { MenuList } from "../ui/sidebar/MenuList";
import { Hamburguer, Icon, UserIcon } from "../ui/icons";

//ICONS
import {DashboardIcon} from '../ui/icons';

export const Sidebar = () => {
  return (
    <SidebarContainer>
        {/*<Hamburguer />*/}
        <div className="">
        <img className="hidden md:block" src={require('../img/logo.png')} alt="" />
        <MenuList>
          <Icon type={DashboardIcon}/>
          
        </MenuList>
        </div>
        <UserIcon> </UserIcon>
      </SidebarContainer>
  )
}
