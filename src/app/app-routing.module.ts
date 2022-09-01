import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockPageComponent } from './pages/block/block.component';
import { BlocksPageComponent } from './pages/blocks/blocks.component';
import { InfoPageComponent } from './pages/info/info.component';
import { NotFoundPageComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: 'info', component: InfoPageComponent },
  { path: 'blocks', component: BlocksPageComponent },
  { path: 'blocks/:level', component: BlockPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
