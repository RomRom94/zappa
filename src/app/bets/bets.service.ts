import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Bet } from './bet.model';

@Injectable({providedIn: 'root'})
export class BetsService {
  private bets: Bet[] = [];
  private betsUpdated = new Subject<Bet[]>();

  constructor(private http: HttpClient) {}

  getBets() {
    this.http
      .get<{ message: string, bets: any }>(
      'http://localhost:3000/api/bets'
      )
      .pipe(map((betData) => {
        return betData.bets.map(bet => {
          return {
            id: bet._id,
            title: bet.title,
            content: bet.content,
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

  addBet(title: string, content: string) {
    const bet: Bet = { id: null, title: title, content: content };
    this.http
      .post<{ message: string, betId: string }>('http://localhost:3000/api/bets', bet)
      .subscribe(responseData => {
        const id = responseData.betId;
        bet.id = id;
        this.bets.push(bet);
        this.betsUpdated.next([...this.bets]);
      });
  }

  deleteBet(betId: string) {
    this.http.delete('http://localhost:3000/api/bets/' + betId)
      .subscribe(() => {
        const updatedBets = this.bets.filter(bet => bet.id !== betId);
        this.bets = updatedBets;
        this.betsUpdated.next([...this.bets]);
      });
  }
}
