//SIDEBAR COMPONENTS
import { SidebarContainer } from "../ui/sidebar/SidebarContainer";
import { MenuList } from "../ui/sidebar/MenuList";

//ICONS
import { Hamburguer, Icon, UserIcon } from "../ui/icons";

export const Sidebar = () => {
  return (
    <SidebarContainer>
        {/*<Hamburguer />*/}
        <div className="">
        <img className="hidden md:block" src={require('../img/logo.png')} alt="" />
        <MenuList>
          <Icon />
          <Icon />
          <Icon />
          <Icon />
        </MenuList>
        </div>
        <UserIcon/>
      </SidebarContainer>
  )
}
