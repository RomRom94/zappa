import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Bet } from './bet.model';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class BetsService {
  private bets: Bet[] = [];
  private betsUpdated = new Subject<Bet[]>();

  constructor(private http: HttpClient) {}

  getBets() {
    this.http.get<{message: string, bets: Bet[]}>('http://localhost:3000/api/bets').subscribe((betData) => {
      this.bets = betData.bets;
      this.betsUpdated.next([...this.bets]);
    });
  }

  getBetUpdateListener() {
    return this.betsUpdated.asObservable();
  }

  addBet(title: string, content: string) {
    const bet: Bet = {id: null, title: title, content: content};
    this.bets.push(bet);
    this.betsUpdated.next([...this.bets]);
  }
}
