import { Routes } from '@angular/router';
import { TransactionsPageComponent } from './pages/transaction-page.component/transactions-page.component';

export const TRANSACTIONS_ROUTES: Routes = [
  {
    path: '',
    component: TransactionsPageComponent,
  },
];