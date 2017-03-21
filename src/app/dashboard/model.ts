export class Company {
  id: number;
  alias_name: string;
  name: string;
  address: string;
  country: string;
  city: string;
  pin_code: number;
  telephone_number: number;
  email: string;
  currency_symbols: string;
  maintain_only: string;
  Accounts: string;
  accounts_with_inventory: string;
  financial_year_from: Date;
  books_beginning_from: Date;
  show_amounts_in_millions: boolean;
  admin: number;
}

export class Profile {
  number: number;
  birth_date: Date;
}

export class Balance {
  company: number;
  type: string;
  amount: number;
}

export class Voucher {
  company: number;
  firstAccount: number;
  secondAccount: number;
  amount: number;
  addedBy: number;
  date: Date;
  narration: string;
}

export class Ledgers {
  id: number;
  company: number;
  name: string;
  groups: number;
  opening_balance: number;
  type: string;
  inventory: boolean
  date: Date;
}

export class Activity {
  name: string;
  date: Date;
  added_by: number;
  amount: number;
  company: number;
}

export class TrialBalance {
  particular: string;
  debitAmount: number;
  creditAmount: number;
  ledger: number;
  company: number;
}

class ProfitLossData {
  particular: string;
  amount: number;
}

export class ProfitLoss {
  export: ProfitLossData;
  import: ProfitLossData;
}

