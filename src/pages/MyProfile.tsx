import {Sidebar} from '../components/Sidebar';
import {SectionBanner} from '../components';
import {AppContainer} from '../ui/layout/AppContainer';

export const MyProfile = () => {
  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
        <SectionBanner sectionName="Mis Datos" />
        <AppContainer>
            
        </AppContainer>
      </div>
    </div>
  );
};
