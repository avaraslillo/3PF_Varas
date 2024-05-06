import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { IInscription, IInscriptionCreateData } from '../../featured/dashboard/models/inscription.model';

let listadoInscripciones: IInscription[]  = [
  
]

@Injectable({
  providedIn: 'root'
})
export class ServicioInscripcionesService {

  obtenerlistadoInscripciones(): Observable<IInscription[]>{

    return of(listadoInscripciones).pipe(delay(500));
  }

  obtenerInscripcionPorID(id: number): Observable<IInscription|undefined>{
    
    return of(listadoInscripciones.find((u) => u.id === id)).pipe(delay(500));
  }

  agregarInscripcion(inscripcion: IInscriptionCreateData): Observable<IInscription[]>{
    if(inscripcion.curso && inscripcion.estudiante){
      const newInscription: IInscription = {
        id: new Date().getTime(),
        estudiante: inscripcion.estudiante,
        curso: inscripcion.curso
      
      }
      listadoInscripciones=[...listadoInscripciones, newInscription];
    }
    
    return of(listadoInscripciones).pipe(delay(500));
  }

  modificarInscripcion(inscripcion: IInscription): Observable<IInscription[]>{
    listadoInscripciones = listadoInscripciones.map((u) =>
      u.id === inscripcion.id ? { ...u, ...inscripcion } : u
    )
    //listadoEstudiantes=listadoEstudiantes.map((u: { id: number; })=>u.id===estudiante.id ? {...u,...listadoEstudiantes} : u);
    return of(listadoInscripciones).pipe(delay(500));
  }

  eliminarInscripcion(id_eliminar: number): Observable<IInscription[]>{

    return of(listadoInscripciones = listadoInscripciones.filter((u: { id: number; })=>u.id!=id_eliminar)).pipe(delay(500));
  }

  obtenerInscripcionesPorCodigoCurso(codigo_curso: number): IInscription[]{
    let inscripciones: IInscription[] = [];
    inscripciones=listadoInscripciones.filter((u) => u.curso?.codigo === codigo_curso);
    return inscripciones;
  }

}
