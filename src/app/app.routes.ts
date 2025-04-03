import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DetailsComponent } from './features/shows/details/details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'show/:id',
        component: DetailsComponent,
    }
];
