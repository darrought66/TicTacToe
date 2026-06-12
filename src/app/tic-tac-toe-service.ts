import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  
  // for the mock, the binary digits of the gameState map to the taken cells.

  // gameState, cellNumber -> gameState, cellNumber, winCode
  usersTurn(gameState: number, cellNumber: number) {

    // all we need to do here is mark the taken cell.
    let p = {
      winCode: '-',
      gameState: gameState + 2 ** cellNumber,
      cellNumber: cellNumber,
    };

    console.log('GameStater:' + p.gameState);
    
    // for the mock, when the last open cell is taken return X won.
    if (p.gameState == 511) {
      p.winCode = 'X';
    } 
    
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
