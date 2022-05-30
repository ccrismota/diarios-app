import { Injectable } from '@angular/core';
import { collectionData, doc, docData, Firestore, query, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Diario, DiarioConverter } from '../../models/diario';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiariosService {
  constructor(
    private db: Firestore, private authService: AuthService) { }
  //referencia a uma possivel colição do firestore
  diarios = collection(this.db, 'diarios').withConverter(DiarioConverter);

  getTodosDiarios(): Observable<Diario[]>{
    return collectionData(this.diarios, {idField:'id'});
  }

  getDiariosUsuario(): Observable<Diario[]>{
    return collectionData(
      query(this.diarios, where('usuarioId', '==',this.authService.uid)), {idField:'id'}
    )
  }

  getDiarioById(id: string): Observable<Diario>{
    const diarioDoc = doc(this.diarios, id); //Indica o nome do usuario
    return docData(diarioDoc, {idField: 'id'});
  }

}
/**
 * LISTAR OS DIARIOS (TODOS)
 * LISTAR OS DIARIOS (DIARIOS LOGADOS)
 * DIARIO POR ID
 * ADICIONAR NOVO DIARIO
 * ATUALIZAR DIARIO
 * DELETAR DIARIO
 */
