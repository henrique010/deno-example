import TransactionsRepository from "../repositories/TransactionsRepository.ts";
import { CreateTransactionDTO } from "../dtos/CreateTransactionDTO.ts";
import AppError from "../errors/AppError.ts";

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public async execute({ type, value, title }: CreateTransactionDTO) {
    const { total } = await this.transactionsRepository.getBalance();

    if (type !== "income" && type !== "outcome") {
      throw new AppError("Tipo de transação informada está inválido.");
    }

    if (type === "outcome" && total < value) {
      throw new AppError("Saldo insuficiente para fazer essa retirada.", 403);
    }

    const transcationId = await this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transcationId;
  }
}

export default CreateTransactionService;
