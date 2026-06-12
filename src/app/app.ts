import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicTacToe } from './tic-tac-toe/tic-tac-toe';

@Component({
  selector: 'app-root',
  imports: [TicTacToe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TicTacToe');
}
