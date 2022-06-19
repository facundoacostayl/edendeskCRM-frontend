import { Link } from "react-router-dom";

import { Navbar } from "../ui/navbar";
import { NavItem } from "../ui/navbar";
import { Hero } from "../ui/hero";
import { Button } from "../ui/controls/button";
import { BrandSection } from "../components/brandsSection";
import { InfoSection } from "../components/InfoSection";
import { Footer } from "../ui/footer";

export const Home = () => {
  return (
    <>
      <Navbar>
        <div className="">
          <Link to="/">
            <img
              className="w-[100px]"
              src={require("../img/logo.png")}
              alt="logo"
            />
          </Link>
        </div>
        <div className="">
          <Link to="/registro">
            <Button colorScheme="primary">
              Registrate<span className="hidden lg:inline"> gratis</span>
            </Button>
          </Link>
        </div>
      </Navbar>
      <Hero>
        <img
          className="absolute bottom-0 md:max-w-[350px] lg:max-w-[700px]"
          src="https://storage.cloudconvert.com/tasks/0957ccbc-0482-4d24-8c53-d4424af664de/Customer-PNG-Background.webp?AWSAccessKeyId=cloudconvert-production&Expires=1655722650&Signature=ENXqNI%2B2zpKLAN0%2BePK4XF5FaHU%3D&response-content-disposition=inline%3B%20filename%3D%22Customer-PNG-Background.webp%22&response-content-type=image%2Fwebp"
          alt=""
        />
        <div className="absolute top-[25%] lg:top-[18%]">
          <h1 className="text-white text-center text-4xl lg:text-7xl font-bold p-2">
            Administra a tus clientes
          </h1>
          <p className="text-slate-200 lg:text-2xl text-center">
            de la manera más sencilla
          </p>
          <div className="w-full mt-5 flex justify-center">
            <Link to="/login">
              <Button colorScheme="tertiary">Inicia Sesión</Button>
            </Link>
          </div>
        </div>
      </Hero>
      <BrandSection>
        <div>
          <h2 className="hidden md:block text-gray-500 font-bold text-lg lg:text-2xl">
            Agilizando tareas de compañías como
          </h2>
        </div>
        <div className="flex items-center justify-center gap-4 py-2">
          <img
            className="w-[75px] lg:w-[100px]"
            src={require("../img/edenred.png")}
            alt="edenred"
          />
          <img
            className="w-[75px] lg:w-[100px]"
            src={require("../img/proviammo.png")}
            alt="proviamo"
          />
          <img
            className="w-[75px] lg:w-[100px]"
            src={require("../img/almacen.png")}
            alt="almacen"
          />
        </div>
      </BrandSection>
      <InfoSection />
      <Footer>
        <img className="w-[70px]" src={require("../img/logo.png")} alt="logo" />
        <p className="text-indigo-900">by Facundo Acosta :)</p>
      </Footer>
    </>
  );
};
