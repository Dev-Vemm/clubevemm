import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/public/start/start.module').then( m => m.StartPageModule), 
    canActivate: [LoginGuard]
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/public/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/public/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset-senha',
    loadChildren: () => import('./pages/public/reset-senha/reset-senha.module').then( m => m.ResetSenhaPageModule)
  },
  {
    path: 'planos',
    loadChildren: () => import('./pages/auth/planos/planos.module').then( m => m.PlanosPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/auth/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./pages/auth/pagamento/pagamento.module').then( m => m.PagamentoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
