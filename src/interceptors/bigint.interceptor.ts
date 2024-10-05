import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { title } from 'process';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardStatus } from 'src/boards/board.model';

export interface Response<T> {
  id:string;
  title:string;
  disc:string;
  status:BoardStatus;
}

// @Injectable()
// export class BigintTranformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  
//   constructor(private reflector:Reflector){  }

//   intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    
//     const stringId = this.reflector.
//         get<string>('stringId', 
//             context.getHandler());
    
//     console.log(stringId);

//     return next.handle().pipe(map(data => ({
//         id: stringId,
//         title: data.title,
//         disc: data.disc,
//         status: data.status
//       })));
//   }
// }

@Injectable()
export class BigintTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

    return next.handle().pipe(map(data => {
      console.log('Response data:', data);

      let res;

      // 데이터가 배열인지 확인
      if (Array.isArray(data)) {
        res = data.map(item => ({
          id: item.id.toString(),  // BigInt를 문자열로 변환
          title: item.title,
          disc: item.disc,
          status: item.status
        }))

        return res;
      }
      else{
        res = {
          id: data.id.toString(),
          title: data.title,
          disc: data.disc,
          status: data.status
        }
        return res;
      }
      
    }));
  }
}


// Json은 BigInt 타입이 존재 하지 않으므로 response할때 toString 로직 필요
// const updatedData = JSON.stringify(find, (key, value) => (typeof value === "bigint" ? value = Number(value.toString()) : value));