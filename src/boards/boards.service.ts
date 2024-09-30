import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards:Board[] = [];

  getAllBoards():Board[] {
    return this.boards;
  }

  createBoard(createBoardDto:CreateBoardDto){
    const {title, disc} = createBoardDto;
    const board:Board = {
      id:uuid(),
      title,
      disc,
      status:BoardStatus.PUBLIC
    }

    this.boards.push(board);

    return board;
  }

  getBoardById(id:string):Board{
    return this.boards.find((elements) => elements.id===id);
  }

  deleteBoard(id:string):void{
    this.boards = this.boards.filter((element)=>element.id !== id);
  }

  updateBoardStatus(id:string, status:BoardStatus){
    const board = this.getBoardById(id);
    board.status = status;

    return board;
  }

}
