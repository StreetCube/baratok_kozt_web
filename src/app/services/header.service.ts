import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderMenuService {
    public openedMenu: boolean = false;

    constructor() {}

    toggleMenu() {
        this.openedMenu = !this.openedMenu;
    }
}
