export const InfoSection = () => {
  return (
    <section className="p-2">
      <h2 className="p-1 text-center font-semibold text-lg text-indigo-600">Organiza la información que más necesitas de tus clientes</h2>
      <div className="grid grid-cols-2 grid-rows-2 my-10">
        <div className="">
          <div className="w-10 h-10">
            <img
              className="object-cover"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/2214px-How_to_use_icon.svg.png"
              alt="tuerca"
            />
          </div>
          <h4 className="text-indigo-600 text-lg font-semibold">Mejora la productividad</h4>
          <p className="text-gray-700 text-sm">Los resultados no se harán esperar al utilizar Edendesk.</p>
        </div>
        <div className="">
          <div className="w-10 h-10">
            <img
              className="object-cover"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Toicon-icon-lines-and-angles-alarm.svg/2048px-Toicon-icon-lines-and-angles-alarm.svg.png"
              alt="clock"
            />
          </div>
          <h4 className="text-indigo-600 text-lg font-semibold">Ahorra tiempo y reduce costos</h4>
          <p className="text-gray-700 text-sm">
            Reduzca el tiempo en el que completas tus procesos.
          </p>
        </div>
        <div className="">
            <div className="w-10 h-10">
          <img
          className="object-cover"
            src="https://cdn-icons-png.flaticon.com/512/770/770706.png"
            alt="rocket"
          />
          </div>
          <h4 className="text-indigo-600 text-lg font-semibold">Mejora la productividad</h4>
          <p className="text-gray-700 text-sm">Los resultados no se harán esperar al utilizar Edendesk.</p>
        </div>
        <div className="">
            <div className="w-10 h-10">
          <img
            className="object-cover"
            src="https://mpng.subpng.com/20190513/uob/kisspng-computer-icons-share-icon-connect-group-portable-n-5cd9e86d7f6c95.3978303215577846855219.jpg"
            alt="users"
          />
          </div>
          <h4 className="text-indigo-600 text-lg font-semibold">Whatsapp's Automaticos</h4>
          <p className="text-gray-700 text-sm">Envíe mensajes mediante WhatsApp a sus clientes automaticamente luego de concretar funciones.</p>
        </div>
      </div>
    </section>
  );
};
