import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  
  private addUrl = '/api/calculator/add';
  private gameStateObject: any

  constructor(private http: HttpClient) {}

  // gameState, cellNumber -> gameState, cellNumber, winCode
  usersTurn(gameStateId: number, cellNumber: number) {

    console.log('GameStateId:' + gameStateId + " CellNumber:" + cellNumber);
    
    // pull GameState for current game.
    const params = new HttpParams().set('gameStateId', gameStateId);
    this.http.get(this.addUrl, { params }).subscribe({
      next: (response) => {
        this.gameStateObject = response;
      },
      error: (err) => console.error('Error fetching data', err)
    });

    // obtain GameStateId for users move.
    let gameStateId0 = this.gameStateObject.children[cellNumber];

    // pull GameState for users choice
    const params0 = new HttpParams().set('gameStateId', gameStateId0);
    this.http.get(this.addUrl, { params0 }).subscribe({
      next: (response) => {
        this.gameStateObject = response;
      },
      error: (err) => console.error('Error fetching data', err)
    });

    let p = {
      winCode: this.gameStateObject.WinCode,
      gameState: this.gameStateObject.GameStateId,
      cellNumber: cellNumber,
    };

    return p;
  }

  // gameState -> gameState, cellNumber, winCode
  machinesTurn(gameState: number) {
    
    // machine will take the first open cell.
    let cellNumber = this.getFirstZeroExponent(gameState);

    let p = {
      winCode: '-',
      gameState: gameState + 2 ** cellNumber,
      cellNumber: cellNumber,
    };

    console.log("GameStater:" + p.gameState);

    // for the mock, when the last open cell is taken return X won.
    if (p.gameState == 511) {
      p.winCode = 'X';
    }

    return p;
  }

  getFirstZeroExponent(n: number): number {
    return Math.log2(~n & -~n);
  }
}
