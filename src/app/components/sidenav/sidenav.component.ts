import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { HeaderMenuService } from '../../services/header.service';
import { NAV_ITEMS } from '../../constants/header.constants';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    animations: [
        trigger('slideIn', [
            transition(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('0.5s ease-in', style({ transform: 'translateX(0)' })),
            ]),
        ]),
    ],
})
export class SidenavComponent implements OnInit {
    public navItems = NAV_ITEMS;
    public filteredNavItems = this.navItems;
    public loggedIn = this.authService.authStateChanged$.value
    private destroyed$ = new Subject<void>();
    constructor(
        private router: Router,
        private headerMenuService: HeaderMenuService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.authStateChanged$.pipe(takeUntil(this.destroyed$)).subscribe((state) => {
            this.loggedIn = state;
            this.filterNavItems();
        })
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    navigate(path: string) {
        this.headerMenuService.toggleMenu();
        this.router.navigate([path]);
    }

    filterNavItems(): void {
        this.filteredNavItems = this.navItems.filter(item => !item.loginRequired || this.loggedIn);
        console.log(this.filteredNavItems)
        console.log(this.loggedIn)
      }
}
