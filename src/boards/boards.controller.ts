import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardService:BoardsService){  }

  @Get()
  getAllBoards() :Board[] {
    return this.boardService.getAllBoards();
  }

  @Post()
  createBoard(@Body() createBoardDto:CreateBoardDto):Board{
    return this.boardService.createBoard(
      createBoardDto
    )
  }

  @Get('/board')
  getBoardById(@Query('id') id:string):Board{
    return this.boardService.getBoardById(id);
  }

  @Delete('/board')
  deleteBoard(@Query('id') id:string):void{
    this.boardService.deleteBoard(id);
  }

  @Patch('/board')
  updateBoardStatus(
    @Query('id') id:string,
    @Query('status') status:BoardStatus
  ){
    return  this.boardService.updateBoardStatus(id, status);
  }
  
}
