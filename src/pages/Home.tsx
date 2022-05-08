import { Navbar } from "../ui/navbar";
import { NavItem } from "../ui/navbar";
import { Hero } from "../ui/hero";
import { Button } from "../ui/controls/button";
import {BrandSection} from '../components/brandsSection';
import {InfoSection} from '../components/InfoSection';
import {Footer} from '../ui/footer';

export const Home = () => {
  return (
    <>
      <Navbar>
        <div className="">
          <img
            className="w-[100px]"
            src={require("../img/logo.png")}
            alt="logo"
          />
        </div>
        <div className="">
          <NavItem responsive="lg" type="normal">
            Inicia Sesión
          </NavItem>
          <Button colorScheme="primary">Registrate</Button>
        </div>
      </Navbar>
      <Hero>
        <h1 className="text-white text-center text-4xl font-bold p-2">
          Administra a tus clientes
        </h1>
        <p className="text-slate-200">de la manera más sencilla</p>
        <div className="mt-10">
          <Button colorScheme="tertiary">Inicia Sesión</Button>
        </div>
      </Hero>
    <BrandSection>
      <div>
          <h2 className="hidden md:block">Agilizando tareas de compañías como</h2>
      </div>
      <div className="flex items-center justify-center gap-4 py-2">
          <img className="w-[75px]" src={require('../img/edenred.png')} alt="edenred" />
          <img className="w-[75px]" src={require('../img/proviammo.png')} alt="proviamo" />
          <img className="w-[75px]" src={require('../img/almacen.png')} alt="almacen" />
      </div>
    </BrandSection>
    <InfoSection/>
      <Footer>
      <img
            className="w-[70px]"
            src={require("../img/logo.png")}
            alt="logo"
          />
        <p className="text-indigo-400">by Facundo Acosta :)</p>
      </Footer>
    </>
  );
};
