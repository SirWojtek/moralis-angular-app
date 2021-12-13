import { Component } from '@angular/core';
import Moralis from 'moralis/types';
import { MoralisService } from './moralis.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title = 'moralis-angular-app';
  public userOb = this.moralisService.observeUser();

  constructor(private moralisService: MoralisService) {
    this.moralisService.startMoralis().subscribe(() => console.log('Started Moralis'));
    this.userOb.subscribe(console.log);
  }

  public login(provider: Moralis.Web3ProviderType): void {
    this.moralisService.login({ provider });
  }

  public logout(): void {
    this.moralisService.logout();
  }
}
