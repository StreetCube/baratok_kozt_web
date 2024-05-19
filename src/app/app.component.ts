import { Component } from '@angular/core';
import { HeaderMenuService } from './services/header.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(public headerMenuService: HeaderMenuService) {}
}
