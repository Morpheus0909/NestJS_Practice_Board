import { Injectable, NotFoundException } from '@nestjs/common';
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
    const res =  this.boards.find((board) => board.id===id);
    if(!res){
      throw new NotFoundException();
    }

    return res;
  }

  deleteBoard(id:string):void{
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board)=>board.id !== found.id);
  }

  updateBoardStatus(id:string, status:BoardStatus){
    const board = this.getBoardById(id);
    board.status = status;

    return board;
  }

}
