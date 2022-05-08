export const InfoSection = () => {
  return (
    <section className="p-3 mt-2 lg:mt-14 max-w-[1440px] mx-auto">
      <h2 className="text-center font-semibold lg:font-bold text-lg lg:text-4xl text-indigo-900">Organiza la información que más necesitas de tus clientes</h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-5 lg:gap-16 my-10 lg:my-16 md:grid-cols-4 md:grid-rows-1 md:p-5">
        <div className="flex flex-col gap-1 lg:gap-3">
          <div className="w-10 lg:w-16">
            <img
              className="object-cover"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/2214px-How_to_use_icon.svg.png"
              alt="tuerca"
            />
          </div>
          <h4 className="text-indigo-600 text-lg lg:text-3xl font-semibold">Mejora la productividad</h4>
          <p className="text-gray-700 text-sm lg:text-xl">Los resultados no se harán esperar al utilizar Edendesk.</p>
        </div>
        <div className="flex flex-col gap-1 lg:gap-3">
        <div className="w-10 lg:w-16">
            <img
              className="object-cover"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Toicon-icon-lines-and-angles-alarm.svg/2048px-Toicon-icon-lines-and-angles-alarm.svg.png"
              alt="clock"
            />
          </div>
          <h4 className="text-indigo-600 text-lg lg:text-3xl font-semibold">Ahorra tiempo y reduce costos</h4>
          <p className="text-gray-700 text-sm lg:text-xl">
            Reduzca el tiempo en el que completas tus procesos.
          </p>
        </div>
        <div className="flex flex-col gap-1 lg:gap-3">
        <div className="w-10 lg:w-16">
          <img
          className="object-cover"
            src="https://cdn-icons-png.flaticon.com/512/770/770706.png"
            alt="rocket"
          />
          </div>
          <h4 className="text-indigo-600 text-lg lg:text-3xl font-semibold">Mejora la productividad</h4>
          <p className="text-gray-700 text-sm lg:text-xl">Los resultados no se harán esperar al utilizar Edendesk.</p>
        </div>
        <div className="flex flex-col gap-1 lg:gap-3">
        <div className="w-10 lg:w-16">
          <img
            className="object-cover"
            src="https://mpng.subpng.com/20190513/uob/kisspng-computer-icons-share-icon-connect-group-portable-n-5cd9e86d7f6c95.3978303215577846855219.jpg"
            alt="users"
          />
          </div>
          <h4 className="text-indigo-600 text-lg lg:text-3xl font-semibold">Whatsapp's Automaticos</h4>
          <p className="text-gray-700 text-sm lg:text-xl">Envíe mensajes mediante WhatsApp a sus clientes automaticamente luego de concretar funciones.</p>
        </div>
      </div>
    </section>
  );
};
