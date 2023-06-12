export enum EstadoEnum {
    SinInicializar = 0,
    Iniciado = 1, //Estado inicial cuando se solicita
    PendienteAprobacion = 2, //Falta aprobacion de un administrativo
    Activo = 3,//Turno que ya fue aprobado pero todavia no ha llegado la fecha.
    EnProgreso = 4,
    Cancelado = 5, //Estado final turno cancelado.
    Rechazado = 6, //Estado final turno rechazado por el especialista.
    Finalizado = 7 //Turno tomado, realizado y finalizado correctamente.
}