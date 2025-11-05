import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TransactionResponse, TransactionRequest, TransactionType } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/transactions`;

  // Signals para ESTADO COMPARTIDO
  private _transactions = signal<TransactionResponse[]>([]);
  transactions = this._transactions.asReadonly();

  // GET - Obtener todas mis transacciones
  getMyTransactions(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(this.apiUrl).pipe(
      tap(data => this._transactions.set(data))
    );
  }

  // GET - Obtener transacción por ID
  getById(id: string): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(`${this.apiUrl}/${id}`);
  }

  // GET - Obtener transacciones por cuenta
  getByAccount(accountNumber: string): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(`${this.apiUrl}/account/${accountNumber}`).pipe(
      tap(data => this._transactions.set(data))
    );
  }

  // POST - Crear transacción (depósito o retiro)
  create(data: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(this.apiUrl, data).pipe(
      tap(newTransaction => {
        this._transactions.update(current => [newTransaction, ...current]);
      })
    );
  }

  // POST - Realizar depósito
  deposit(accountNumber: string, amount: number, description?: string): Observable<TransactionResponse> {
    const data: TransactionRequest = {
      accountNumber,
      type: TransactionType.DEPOSIT,
      amount,
      description
    };
    return this.create(data);
  }

  // POST - Realizar retiro
  withdraw(accountNumber: string, amount: number, description?: string): Observable<TransactionResponse> {
    const data: TransactionRequest = {
      accountNumber,
      type: TransactionType.WITHDRAW,
      amount,
      description
    };
    return this.create(data);
  }

  // ===== MÉTODOS ALIAS PARA COMPONENTES =====

  getAllTransactions(): Observable<TransactionResponse[]> {
    return this.getMyTransactions();
  }

  getTransactionById(id: string): Observable<TransactionResponse> {
    return this.getById(id);
  }

  getTransactionsByAccount(accountNumber: string): Observable<TransactionResponse[]> {
    return this.getByAccount(accountNumber);
  }
}
