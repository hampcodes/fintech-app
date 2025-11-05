import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccountResponse, AccountRequest } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/accounts`;

  // Signals para ESTADO COMPARTIDO
  private _accounts = signal<AccountResponse[]>([]);
  accounts = this._accounts.asReadonly();

  // GET - Obtener todas mis cuentas
  getMyAccounts(): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(this.apiUrl).pipe(
      tap(data => this._accounts.set(data))
    );
  }

  // GET - Obtener cuenta por ID
  getById(id: string): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${this.apiUrl}/${id}`);
  }

  // GET - Obtener cuenta por número
  getByAccountNumber(accountNumber: string): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${this.apiUrl}/number/${accountNumber}`);
  }

  // GET - Obtener balance (retorna AccountResponse con el campo balance)
  getBalance(accountNumber: string): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${this.apiUrl}/number/${accountNumber}/balance`);
  }

  // GET - Obtener cuentas activas
  getActiveAccounts(): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(`${this.apiUrl}/active`).pipe(
      tap(data => this._accounts.set(data))
    );
  }

  // POST - Crear cuenta
  create(data: AccountRequest): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(this.apiUrl, data).pipe(
      tap(newAccount => {
        this._accounts.update(current => [...current, newAccount]);
      })
    );
  }

  // PATCH - Activar cuenta
  activate(id: string): Observable<AccountResponse> {
    return this.http.patch<AccountResponse>(`${this.apiUrl}/${id}/activate`, {}).pipe(
      tap(updatedAccount => {
        this._accounts.update(current =>
          current.map(account => account.id === id ? updatedAccount : account)
        );
      })
    );
  }

  // PATCH - Desactivar cuenta
  deactivate(id: string): Observable<AccountResponse> {
    return this.http.patch<AccountResponse>(`${this.apiUrl}/${id}/deactivate`, {}).pipe(
      tap(updatedAccount => {
        this._accounts.update(current =>
          current.map(account => account.id === id ? updatedAccount : account)
        );
      })
    );
  }

  // ===== MÉTODOS ALIAS PARA COMPONENTES =====

  getAccounts(): Observable<AccountResponse[]> {
    return this.getMyAccounts();
  }

  getAccountById(id: string): Observable<AccountResponse> {
    return this.getById(id);
  }

  createAccount(data: AccountRequest): Observable<AccountResponse> {
    return this.create(data);
  }
}
