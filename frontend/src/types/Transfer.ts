export interface Transfer {
  operationNumber: number;
  copyId: number|null;
  transferDate: Date;
  originOfficeId: number|null;
  destinationOfficeId: number|null;
  comments: string;
}
