export interface Board{
  id:string,
  title:string,
  disc:string,
  status: BoardStatus
}

export enum BoardStatus{
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}