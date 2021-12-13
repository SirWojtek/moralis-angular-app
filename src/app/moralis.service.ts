import { Injectable } from '@angular/core';
import { Moralis } from 'moralis';
import { BehaviorSubject, defer, from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoralisService {
  private userBS = new BehaviorSubject<Moralis.User | undefined>(undefined);

  constructor() {}

  public startMoralis(): Observable<void> {
    return defer(() =>
      from(
        Moralis.start({
          ...environment.moralis,
        })
      )
    );
  }

  public observeUser(): Observable<Moralis.User | undefined> {
    return this.userBS.asObservable();
  }

  public login(opt?: Moralis.AuthenticationOptions): void {
    Moralis.Web3.authenticate(opt).then(user => this.userBS.next(user));
  }

  public logout(): void {
    Moralis.User.logOut()
      .then(() => Moralis.Web3.cleanup())
      .then(() => this.userBS.next(undefined));
  }
}
