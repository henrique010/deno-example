import { database } from "../database/mongodb.ts";

interface TransactionSchema {
  title: string;

  value: number;

  type: 'income' | 'outcome';

  createdAt: Date

  updateAt: Date
}

const Transaction = database.collection<TransactionSchema>("transactions");

export { Transaction };
export type { TransactionSchema };
