import { Component, OnInit } from '@angular/core';
import { HeaderMenuService } from '../../services/header.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    constructor(private headerMenuService: HeaderMenuService) {}

    ngOnInit(): void {}

    toggleMenu() {
        this.headerMenuService.toggleMenu();
    }
}
