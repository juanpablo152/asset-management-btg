import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'funds',
    },
    {
      path: 'funds',
      loadChildren: () =>
        import('./features/funds/funds.routes').then((m) => m.FUNDS_ROUTES),
    },
    {
      path: 'transactions',
      loadChildren: () =>
        import('./features/transactions/transactions.routes').then(
          (m) => m.TRANSACTIONS_ROUTES
        ),
    },
    {
      path: '**',
      redirectTo: 'funds',
    },
  ];
