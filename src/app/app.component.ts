import { Component } from '@angular/core';
import { StandaloneShellModule } from '@onecx/standalone-shell';

@Component({
  selector: 'app-standalone-root',
  standalone: true,
  imports: [StandaloneShellModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
