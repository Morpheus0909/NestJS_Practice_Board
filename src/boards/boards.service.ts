import { Injectable, NotFoundException, UsePipes } from '@nestjs/common';
import { Board } from '@prisma/client';
import { PrismaService } from 'src/prisma.client';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';


@Injectable()
export class BoardsService {

  constructor (private prismaService:PrismaService){ }

  async getBoardById(id:number){
    const find = await this.prismaService.board.findUnique({
      where: {
        id
      }
    })

    return find;
  }

  async createBoard(createBoardDto:CreateBoardDto):Promise<Board>{
    const {title, disc} = createBoardDto;
    
    const newBoard = await this.prismaService.board.create({
      data:{
          title:title,
          disc:disc
      }
    });

    return newBoard;
  }

  async deleteBoard(id:number):Promise<Board>{
    const del = await this.prismaService.board.delete({where:{
      id
    }})

    return del;
  }

  async updateBoardStatus(id:number, status:BoardStatus):Promise<Board>{
    const updateBoard = await this.prismaService.board.update({
      where : {
        id
      },
      data : {
        status:status
      }
    });

    return updateBoard;
  }

  async getAllBoards():Promise<Board[]>{
    const find = await this.prismaService.board.findMany();
    return find;
  }

}
