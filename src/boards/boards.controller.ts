import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';
import { Board } from '@prisma/client';
import { BigintTransformInterceptor } from 'src/interceptors/bigint.interceptor';

@UseInterceptors(BigintTransformInterceptor)
@Controller('boards')
export class BoardsController {

  constructor(private boardService:BoardsService){  }


  @Get()
  getAllBoards():Promise<Board[]>{
    return this.boardService.getAllBoards();
  }


  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto:CreateBoardDto){
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id:number){
    return this.boardService.getBoardById(id);
  }


  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id){
    return this.boardService.deleteBoard(id);
  }


  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id, 
    @Body('status', ValidationPipe)status:BoardStatus
  ){
    return this.boardService.updateBoardStatus(id, status);
  }


}