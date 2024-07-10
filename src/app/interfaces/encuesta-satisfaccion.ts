export interface EncuestaSatisfaccion {
    id?: string;
    fecha?: Date;
    userEmail: string;
    calificacionGeneral: 1 | 2 | 3 | 4 | 5;
    recomendacion: 1 | 2 | 3 | 4 | 5;
    simplicidadTurnos:boolean;
    amabilidad: 'Excelente' | 'Buena' | 'Regular' | 'Mala';
    aspectosDestacar: ('Puntualidad' | 'Claridad Profesional' | 'Resolucion' | 'Instalaciones')[];
    observacion: string;
}