import { Client } from "./types";

type ACTION_TYPES = {
  type: "addClient";
  payload: {
    firstname: Client["nombre"],
    lastname: Client["apellido"],
    tel: Client["telefono"]
  };
} 
|
 {
    type: "updateClient";
    payload: {
        tel: Client["telefono"],
        amount: Number
    }
}

export const clientReducer = (clientState: Client, action: ACTION_TYPES) => {
  switch (action.type) {
    case "addClient":
      async () => {
        const body = {
          nombre: action.payload.firstname,
          apellido: action.payload.lastname,
          telefono: action.payload.tel,
        };
        try {
          const response = await fetch("http://localhost:4000/nuevo-cliente", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          }
        }
      };
      break;
      case "updateClient": {

      }
  }
};
