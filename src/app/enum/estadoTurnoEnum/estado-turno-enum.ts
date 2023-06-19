export enum EstadoEnum {
    Disponible = 0,
    PendienteAprobacion = 1, //Falta aprobacion de profeisonal
    Rechazado = 2, //Estado final turno rechazado por el especialista.
    Aceptado = 3,//Turno que ya fue aprobado pero todavia no ha llegado la fecha.
    Finalizado = 4 //Turno tomado, realizado y finalizado correctamente.
}