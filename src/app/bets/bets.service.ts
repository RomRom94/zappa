import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Bet } from './bet.model';

@Injectable({providedIn: 'root'})
export class BetsService {
  private bets: Bet[] = [];
  private betsUpdated = new Subject<Bet[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getBets() {
    this.http
      .get<{ message: string, bets: any }>('http://localhost:3000/api/bets')
      .pipe(
        map(betData => {
        return betData.bets.map(bet => {
          return {
            title: bet.title,
            content: bet.content,
            id: bet._id,
          };
        });
      }))
      .subscribe(transformedBets => {
      this.bets = transformedBets;
      this.betsUpdated.next([...this.bets]);
    });
  }

  getBetUpdateListener() {
    return this.betsUpdated.asObservable();
  }

  getBet(id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
    }>('http://localhost:3000/api/bets/' + id);
  }

  addBet(title: string, content: string) {
    const betData = new FormData();
    betData.append('title', title);
    betData.append('content', content);
    this.http
      .post<{ message: string; bet: Bet }>(
        'http://localhost:3000/api/bets',
        betData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updateBet(id: string, title: string, content: string) {
    let betData: Bet | FormData;
    betData = {
      id: id,
      title: title,
      content: content,
    };
    this.http
      .put('http://localhost:3000/api/bets/' + id, betData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteBet(betId: string) {
    this.http
      .delete('http://localhost:3000/api/bets/' + betId)
      .subscribe(() => {
        const updatedBets = this.bets.filter(bet => bet.id !== betId);
        this.bets = updatedBets;
        this.betsUpdated.next([...this.bets]);
      });
  }
}
