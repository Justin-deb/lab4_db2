export interface Transfer {
  operationNumber: number;
  copyId: number;
  transferDate: Date;
  originOfficeId: number;
  destinationOfficeId: number;
  comments: string;
}
