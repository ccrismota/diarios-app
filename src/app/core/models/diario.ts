import { Converter } from "./converter";

export interface Diario {
  //serão preenchidos pelo Firestore
  id?: string, //string aleatoria
  titulo: string,
  corpo: string,
  local: string,
  data: Date, //data da viagem relizada
  imagem?: string,//link da imagem
  // serão preenchidos programaticamente
  createdAt: string, //guarda quando o diario foi criado
  usuarioId?: string,
  usuarioNick: string,
  usuarioNome: string;
}

export const DiarioConverter: Converter<Diario> = {
  toFirestore: (data) => data, //ao enviar eu não quero alterar o obj
  fromFirestore: (snapshot, options) => {
    //extrai o objeto de dados do documento
    const obj = snapshot.data(options)!;
    return {
      ...obj,// spread => adiciona todas as propriedades do obj
      data: obj['data']?.data(),
      createdAt: obj['createdAt']?.data(),
    } as Diario;
  },
}
