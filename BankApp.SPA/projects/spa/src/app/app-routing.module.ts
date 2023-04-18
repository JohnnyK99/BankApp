import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './shared/constants/routes/app-routes.constants';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NoAccessComponent } from './layout/no-access/no-access.component';

const routes: Routes = [
  {
    path: AppRoutes.dashboard,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.transactions,
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.login,
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.noAccess,
    component: NoAccessComponent,
  },
  {
    path: AppRoutes.register,
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.base,
    redirectTo: AppRoutes.dashboard,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
