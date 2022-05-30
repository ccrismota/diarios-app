import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  signupForm = this.fb.group({
    nome: ['', [Validators.required]],
    nick: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    confirma_senha: [''],
  },
  { validators: [this.matchPasswords] }
  );

  matchPasswords(control: AbstractControl): ValidationErrors | null {
    return control.get('senha')!.value !== control.get('confirma_senha')!.value
      ? { matchPasswords: true }
      : null;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: HotToastService
  ) { }

  onSubmit() {
    // vai capturar os valores de email, senha, nick e nome
    const { email, senha, nome, nick } = this.signupForm.value;
    this.authService
      .signupEmail(email, senha, nome, nick)
      .pipe(
        this.toast.observe({
          success: 'Usuario criado com sucesso',
          error: 'Um erro ocorreu!',
          loading: 'Criando usuário...'
        })
      )
      .subscribe();
  }

  onLoginGoogle() {
    this.authService
    .loginGoogle()
    .pipe(
      this.toast.observe({
        success: 'Login Efetuado com sucesso',
        error: 'Operação cancelada',
        loading: 'Fazendo login'
      })
    )
    .subscribe();

  }

  ngOnInit(): void {}

}
