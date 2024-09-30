import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.model";

export class BoardStatusValidationPipe implements PipeTransform{
	
	//class 외부 접근 가능 but 수정 불가
	readonly StatusOption = [
		BoardStatus.PRIVATE,
		BoardStatus.PUBLIC
	]
	
	transform(value:any, metadata:ArgumentMetadata){
		value = value.toUpperCase();
	
		if(!this.isStatus(value)){
			throw new BadRequestException("뭐시기뭐시기")
		}
	}
	
	isStatus(target:any){
		const index = this.StatusOption.indexOf(target);
		
		return index!==-1;
	}
}