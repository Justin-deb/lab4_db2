export interface Rental {
  sequence: number;
  clientId: string;
  copyId: number|null;
  loanDate: Date;
  days: number|null;
  returnDate: Date;
  returnDetails: string;
}
