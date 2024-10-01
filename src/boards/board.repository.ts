import { DeleteResult, Repository } from "typeorm";
import { Board } from "./board.entity";
import { CustomRepository } from "./customdecoration/typeorm-ex.decorator";
import { NotFoundException } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board.model";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board>{
  async findBoardById(id:number):Promise<Board> {

    const found = await this.findOneBy({id:id});

    if(!found){
      throw new NotFoundException(`${id} is not exist`);
    }

    return found;
  }

  async createBoard(createBoardDto:CreateBoardDto):Promise<Board>{
    const {title, disc} = createBoardDto;
    
    const board =  await this.create({
      title:title,
      disc:disc,
      status:BoardStatus.PUBLIC
    })

    this.save(board);

    return board;
  }

  async deleteBoard(id:number):Promise<void>{
    const res = await this.delete(id);

    if(res.affected===0){
      throw new NotFoundException(`can't find ${id}`);
    }
  }

  async updateBoardStatus(id:number, status:BoardStatus):Promise<Board>{
    const target = await this.findBoardById(id);

    target.status = status;

    await this.save(target);

    return target;
  }

  async getAllBoards():Promise<Board[]>{
    const res = await this.find();

    return res;
  }

}