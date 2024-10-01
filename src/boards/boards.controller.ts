import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { DeleteResult } from 'typeorm';
import { BoardStatus } from './board.model';

@Controller('boards')
export class BoardsController {
  constructor(private boardService:BoardsService){  }

  // @Get()
  // getAllBoards() :Board[] {
  //   return this.boardService.getAllBoards();
  // }
  @Get()
  getAllBoards():Promise<Board[]>{
    return this.boardService.getAllBoards();
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto:CreateBoardDto):Board{
  //   return this.boardService.createBoard(
  //     createBoardDto
  //   )
  // }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto:CreateBoardDto):Promise<Board>{
    return this.boardService.createBoard(createBoardDto);
  }

  // @Get('/board')
  // getBoardById(@Query('id') id:string):Board{
  //   return this.boardService.getBoardById(id);
  // }
  @Get('/:id')
  getBoardById(@Param('id') id:number) : Promise<Board>{
    return this.boardService.getBoardById(id);
  }

  // @Delete('/board')
  // deleteBoard(@Query('id') id:string):void{
  //   this.boardService.deleteBoard(id);
  // }
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id):Promise<void>{
    return this.boardService.deleteBoard(id);
  }

  // @Patch('/board')
  // updateBoardStatus(
  //   @Query('id') id:string,
  //   @Query('status', BoardStatusValidationPipe) status:BoardStatus
  // ){
  //   return  this.boardService.updateBoardStatus(id, status);
  // }
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id, 
    @Body('status', ValidationPipe)status:BoardStatus
  ):Promise<Board>{
    return this.boardService.updateBoardStatus(id, status);
  }

}
