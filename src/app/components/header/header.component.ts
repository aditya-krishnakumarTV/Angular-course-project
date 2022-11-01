import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { DataStorageService } from 'src/app/services/data-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private user: Subscription

  isLogedin: boolean = false

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.user.subscribe(user => {
      this.isLogedin = !!user
    })
  }

  onSave() {
    this.dataStorageService.storeRecipies()
  }

  onFetch() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy(): void {
    this.user.unsubscribe()
  }

}
