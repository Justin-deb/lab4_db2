export interface Rental {
  sequence: number;
  clientId: string;
  copyId: number;
  loanDate: Date;
  days: number;
  returnDate: Date;
  returnDetails: string;
}
