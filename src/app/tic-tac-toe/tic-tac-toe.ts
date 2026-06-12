import { Component, viewChild, ElementRef, viewChildren, inject } from '@angular/core';
import { TicTacToeService } from '../tic-tac-toe-service';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [],
  templateUrl: './tic-tac-toe.html',
  styleUrl: './tic-tac-toe.css',
})
export class TicTacToe {
  private ticTacToeService = inject(TicTacToeService);

  // user chooses X or O from a select
  private yourPlayer = viewChild.required<ElementRef<HTMLSelectElement>>('YourPlayer');

  // display status messages to user
  private MsgBox = viewChild.required<ElementRef<HTMLSpanElement>>('MsgBox');

  // the cells of the play surface.
  private cells = viewChildren<ElementRef<HTMLTableCellElement>>('Cell');

  // a single number describes the state of the game completely.
  private gameState: number = 0;

  // taken from the select at the start of the game.
  private usersPlayer: string = '';
  private machinesPlayer: string = '';

  private cellsLocked: boolean = false;

  /*
   * handles button clicks on Start Game button.
   */
  onStartGame() {
    // cells are always initially unlocked.
    this.cellsLocked = false;

    // game state is always initially 0.
    this.gameState = 0;

    // the cells are all initialy empty.
    for (let i = 0; i <= 8; i++) {
      this.cells()[i].nativeElement.innerText = '';
    }

    // usersPlayer comes from the drop down and machinesPlayer is opposite.
    this.usersPlayer = this.yourPlayer().nativeElement.value;
    if (this.usersPlayer == 'X') {
      this.machinesPlayer = 'O';
    } else {
      this.machinesPlayer = 'X';
    }

    // update message box and prompt the machine to take its turn if it goes first.
    if (this.usersPlayer == 'X') {
      // X goes first. if player is X then he has to choose a cell.
      this.MsgBox().nativeElement.innerText = 'Your Turn';
    } else {
      // if player is O then machine has to choose a cell.
      this.MsgBox().nativeElement.innerText = 'My Turn';
      // since this is the first move, win code can be ignored.
      this.machinesTurn();
    }
  }

  /*
   * responds to user clicking on a cell. if the cell is already taken or
   * the cells are locked then the cell flashes. otherwise the cell displays
   * the users player and then calls for the machine to take its turn.
   */
  async onClick(cellNumber: number) {
    console.log('cellNumber:' + cellNumber);
    let cellValue = this.cells()[cellNumber].nativeElement.innerText;

    if (this.cellsLocked || cellValue == 'X' || cellValue == 'O') {
      this.cells()[cellNumber].nativeElement.style = 'background-color: #f9d4db;';
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.cells()[cellNumber].nativeElement.style = 'background-color: #ffffff;';
    } else {
      let winCode = this.usersTurn(cellNumber);
      if (winCode == '-') {
        winCode = this.machinesTurn();
      }
      if (winCode != '-') {
        this.gameOver(winCode);
      }
    }
  }

  /*
   * updates GUI is response to the game ending.
   */
  gameOver(winCode: string) {
    this.cellsLocked = true;
    if (winCode == this.usersPlayer) {
      this.MsgBox().nativeElement.innerText = 'You Won';
    } else if (winCode == this.machinesPlayer) {
      this.MsgBox().nativeElement.innerText = 'You Lost';
    } else if (winCode == 'T') {
      this.MsgBox().nativeElement.innerText = 'We Tied';
    }
  }

  /*
   * calls the service to update gameState based on cell that user picked.
   * play surface is updated with users choice.
   * winCode is returned.
   */
  usersTurn(cellNumber: number): string {
    // gameState, cellNumber -> gameState, cellNumber, winCode
    let p = this.ticTacToeService.usersTurn(this.gameState, cellNumber);
    this.gameState = p.gameState;
    this.cells()[p.cellNumber].nativeElement.innerText = this.usersPlayer;
    if (p.winCode == '-') {
      this.MsgBox().nativeElement.innerText = 'My Turn';
    }
    return p.winCode;
  }

  /*
   * calls the service to pick a cell for the machines turn.
   * play surface is updated with machines choice.
   * gameState is updated.
   * winCode is returned.
   */
  machinesTurn(): string {
    // gameState -> gameState, cellNumber, winCode
    let p = this.ticTacToeService.machinesTurn(this.gameState);
    this.gameState = p.gameState;
    this.cells()[p.cellNumber].nativeElement.innerText = this.machinesPlayer;
    if (p.winCode == '-') {
      this.MsgBox().nativeElement.innerText = 'Your Turn';
    }
    return p.winCode;
  }
}
