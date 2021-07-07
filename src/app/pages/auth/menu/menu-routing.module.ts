import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: MenuPage,
    children: [
    	{
		    path: 'home',
		    loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
		},
		{
		    path: 'segmentos',
		    loadChildren: () => import('../segmentos/segmentos.module').then( m => m.SegmentosPageModule)
		},/*
		{
		    path: 'busca',
		    loadChildren: () => import('../busca/busca.module').then( m => m.BuscaPageModule)
		},
		{
		    path: 'loja',
		    loadChildren: () => import('../loja/loja.module').then( m => m.LojaPageModule)
		},
		{
		    path: 'mapa',
		    loadChildren: () => import('../mapa/mapa.module').then( m => m.MapaPageModule)
		},*/
		{
		    path: 'perfil',
		    loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
		},
		{
		    path: 'pontos',
		    loadChildren: () => import('../pontos/pontos.module').then( m => m.PontosPageModule)
		},/*
		{
		    path: 'cupom',
		    loadChildren: () => import('../cupom/cupom.module').then( m => m.CupomPageModule)
  		},
  		{
		    path: 'comprovante',
		    loadChildren: () => import('../comprovante/comprovante.module').then( m => m.ComprovantePageModule)
		},
	  	{
	    	path: 'resgate-detalhes',
	    	loadChildren: () => import('../resgate-detalhes/resgate-detalhes.module').then( m => m.ResgateDetalhesPageModule)
	  	},*/
		{
			path: 'saude',
			loadChildren: () => import('../web-segmento/web-segmento.module').then( m => m.WebSegmentoPageModule)
		},
		{
			path: 'hospedagem',
			loadChildren: () => import('../web-segmento/web-segmento.module').then( m => m.WebSegmentoPageModule)
		},
		{
			path: 'pacotes',
			loadChildren: () => import('../web-segmento/web-segmento.module').then( m => m.WebSegmentoPageModule)
		},
		{
			path: 'experiencias',
			loadChildren: () => import('../web-segmento/web-segmento.module').then( m => m.WebSegmentoPageModule)
		},
		{
		  path: 'pacotes/contato',
		  loadChildren: () => import('../pacote/pacote.module').then( m => m.PacotePageModule)
		},
		{
		    path: 'historico',
		    loadChildren: () => import('../pontos/pontos.module').then( m => m.PontosPageModule)
		},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
