import { DocumentSnapshot } from "@angular/fire/firestore";

export interface Converter<T> { // T é uma tipo generico
   // Converter antes de enviar para o Firestore
  toFirestore(data:T):any;
  // conversão quando recebe para o Firestore
  fromFirestore(snapshot: DocumentSnapshot, options: any):T;
}
