import { Subject } from 'rxjs';
import { Bet } from './bet.model';


export class BetsService {
  private bets: Bet[] = [];
  private betsUpdated = new Subject<Bet[]>();

  getBets() {
    return [...this.bets];
  }

  getBetUpdateListener() {
    return this.betsUpdated.asObservable();
  }

  addBet(title: string, content: string) {
    const bet: Bet = {title: title, content: content};
    this.bets.push(bet);
    this.betsUpdated.next([...this.bets]);
  }
}
