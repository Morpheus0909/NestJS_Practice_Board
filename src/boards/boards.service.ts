import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { DeleteResult } from 'typeorm';
import { BoardStatus } from './board.model';

@Injectable()
export class BoardsService {
  // private boards:Board[] = [];

  // getAllBoards():Board[] {
  //   return this.boards;
  // }

  // createBoard(createBoardDto:CreateBoardDto){
  //   const {title, disc} = createBoardDto;
  //   const board:Board = {
  //     id:uuid(),
  //     title,
  //     disc,
  //     status:BoardStatus.PUBLIC
  //   }

  //   this.boards.push(board);

  //   return board;
  // }

  // getBoardById(id:string):Board{
  //   const res =  this.boards.find((board) => board.id===id);
  //   if(!res){
  //     throw new NotFoundException();
  //   }

  //   return res;
  // }

  // deleteBoard(id:string):void{
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board)=>board.id !== found.id);
  // }

  // updateBoardStatus(id:string, status:BoardStatus){
  //   const board = this.getBoardById(id);
  //   board.status = status;

  //   return board;
  // }
  constructor(private boardsRepository:BoardRepository){}

  async getBoardById(id:number):Promise<Board>{
    const found = await this.boardsRepository.findBoardById(id);

    return found;
  }

  createBoard(createBoardDto:CreateBoardDto):Promise<Board>{
    // Entity 생성
    return this.boardsRepository.createBoard(createBoardDto);
  }

  deleteBoard(id:number):Promise<void>{
    const res = this.boardsRepository.deleteBoard(id);

    return res;
  }

  async updateBoardStatus(id:number, status:BoardStatus):Promise<Board>{

    const target = this.boardsRepository.updateBoardStatus(id,status);

    return target;
  }

  async getAllBoards():Promise<Board[]>{
    return this.boardsRepository.getAllBoards();
  }

}
