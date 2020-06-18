import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Bet } from './bet.model';

const BACKEND_URL = environment.apiUrl + '/bets/';

@Injectable({providedIn: 'root'})
export class BetsService {
  private bets: Bet[] = [];
  private betsUpdated = new Subject<Bet[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getBets() {
    this.http
      .get<{ message: string, bets: any }>(BACKEND_URL)
      .pipe(
        map(betData => {
        return betData.bets.map(bet => {
          return {
            title: bet.title,
            content: bet.content,
            id: bet._id,
            creator: bet.creator,
            type: bet.type,
            endDate: bet.endDate,
            imagePath: bet.imagePath,
            dateEnd: bet.dateEnd,
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
      creator: string,
      imagePath: string,
      type: string,
      dateEnd: Date
    }>(BACKEND_URL + id);
  }

  addBet(title: string, content: string, type: string, dateEnd: Date, image: File) {
    const betData = new FormData();
    const date = (new Date(dateEnd)).toUTCString();
    betData.append('title', title);
    betData.append('content', content);
    betData.append('type', type);
    betData.append('image', image, title);
    betData.append('dateEnd', date);

    this.http.post(BACKEND_URL, betData)
    .toPromise()
    .then( apiResponse => {
      console.log(apiResponse);
      this.router.navigate(['/']);
    })
    .catch( apiError => { console.log(apiError); });
  }

  updateBet(id: string, title: string, content: string, type: string, dateEnd: Date, image: File | string) {
    let betData: Bet | FormData;
    if (typeof(image) === 'object') {
      betData = new FormData();
      const date = (new Date(dateEnd)).toISOString();
      betData.append('id', id);
      betData.append('title', title);
      betData.append('type', type);
      betData.append('content', content);
      betData.append('image', image, title);
      betData.append('dateEnd', date);
    } else {
      betData = {
        id,
        title,
        content,
        creator: null,
        type,
        dateEnd,
        imagePath: image
      };
    }
    this.http
      .put(BACKEND_URL + id, betData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      });
  }

  deleteBet(betId: string) {
    this.http
      .delete(BACKEND_URL + betId)
      .subscribe(() => {
        const updatedBets = this.bets.filter(bet => bet.id !== betId);
        this.bets = updatedBets;
        this.betsUpdated.next([...this.bets]);
      });
  }
}
