import { Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider } from '@angular/fire/auth';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from '@firebase/auth';
import { setDoc } from '@firebase/firestore';
import { from, tap } from 'rxjs';
// Firebase versao modular
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth, //servicos do farebase authotication
    private db: Firestore, //servições de banco firestore do Firebase
    private router : Router, //mudar a rota de forma imperativa
  ) {}


  uid?: string; //guarda o id unico do usuario logado;

  get logged(){ // Se nulo, o usuario não está logado
    return authState(this.auth).pipe(
      tap((user)=> {
        // conforme o usuario loga/desloga
        //é atualizado o valor do id
        this.uid = user?.uid;
      })
    );
  }

  usuarios = collection(this.db, 'usuarios'); //referencia uma possível coleção

  signupEmail(email: string, password: string, nome: string, nick: string){ //essa função sera chamda no componente
    //se comunica com auth  e cria uma usuario a partir do email e senha
    //
    return from(createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(tap((creds) => {
      const user = creds.user; //informações do usuario logado
      const userDoc = doc(this.usuarios, user.uid); //referencia um documento de usuario no firebase
      setDoc(userDoc, {
        uid: user.uid,
        email: email,
        nome: nome,
        nick: nick,
       });
       this.emailVerificacao(creds.user)
    }));
  }

  loginEmail(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((creds)=> {
        this.emailVerificacao(creds.user)
      })
    )
  }


  logout(rota: '/login' | '/confirmar-email'){
    return from(this.auth.signOut()).pipe(
      tap(() => {
        this.router.navigate([rota]);
      })
    )
  }

  emailVerificacao(user: any){
    if(!user.emailVerified){
      sendEmailVerification(user);
      this.logout('/confirmar-email').subscribe();
    }else{
      this.router.navigate(['/']);
    }
  }

  loginGoogle(){
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      tap((creds) => {
        const user = creds.user;
        const userDoc = doc(this.usuarios, user.uid);

        setDoc(userDoc, {
          uid: user.uid,
          email: user.email,
          nome: user.displayName,
          nick: 'Um usuario do Google',

        });
        this.router.navigate(['/']);
      })
    );
  }

  recoverPassword(email: string){
    //
    return from(sendPasswordResetEmail(this.auth, email));
  }

}

