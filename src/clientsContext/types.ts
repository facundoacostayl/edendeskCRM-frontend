export interface Client {
    clientid: number,
    nombre: string,
    apellido: string,
    tel: number,
    saldo: number,
    fechaultcarga: Date,
    montoultcarga: number,
    tipodecarga: string,
    fechaultretiro: Date,
    montoultretiro: number,
    sucursal: string
}