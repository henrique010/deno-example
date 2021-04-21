import { Transaction, TransactionSchema } from "../models/Transacation.ts";
import { CreateTransactionDTO } from "../dtos/CreateTransactionDTO.ts";

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  public getAll(): Promise<TransactionSchema[]> {
    return Transaction.find({}).toArray();
  }

  public async create({ title, value, type }: CreateTransactionDTO) {
    const transactionId = await Transaction.insertOne({
      title,
      value,
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return transactionId;
  }

  public async getBalance(): Promise<Balance> {
    const [input, output]: any[] = await Transaction.aggregate([
      { $match: { $or: [{ type: "income" }, { type: "outcome" }] } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$value" },
          count: { $sum: 1 },
        },
      },
    ]).toArray();

    const income = input?.total || 0
    const outcome = output?.total || 0

    const total = income - outcome;

    return {
      total,
      income,
      outcome,
    };
  }
}

export default TransactionsRepository;
