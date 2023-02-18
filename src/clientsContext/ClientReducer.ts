import { Client } from "./types";

type ACTION_TYPES =
  | {
      type: "addClient";
      payload: {
        firstname: Client["firstName"];
        lastname: Client["lastName"];
        tel: Client["tel"];
      };
    }
  | {
      type: "updateClient";
      payload: {
        tel: Client["tel"];
        amount: Number;
      };
    };

export const clientReducer = (clientState: Client, action: ACTION_TYPES) => {
  switch (action.type) {
    case "addClient":
      async () => {
        const body = {
          firstName: action.payload.firstname,
          lastName: action.payload.lastname,
          tel: action.payload.tel,
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
