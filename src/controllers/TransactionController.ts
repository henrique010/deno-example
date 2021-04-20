import { Context } from "https://deno.land/x/oak/mod.ts";
import TransactionsRepository from '../repositories/TransactionsRepository.ts';
import CreateTransactionService from '../services/CreateTransactionService.ts';

class TransactionController {
    public async index({ request, response }:Context) {
        try {
          const transactionsRepository = new TransactionsRepository();
          
          const transactions = await transactionsRepository.getAll();
    
          response.status = 200
          response.body = { transactions }
        } catch (err) {
          response.status = err.status || 500
          response.body = {
              message: err.message || "Internal Server Error"
          }
        }
    }

    public async create({ request, response }:Context) {
        try {
          const { title, type, value } = await request.body().value;

          const transactionsRepository = new TransactionsRepository();
          
          const createTransaction = new CreateTransactionService(
            transactionsRepository,
          );
        
          const transactionId = await createTransaction.execute({ value, title, type });
    
          response.status = 200
          response.body = { transactionId }
        
          return response;
        } catch (err) {
          response.status = err.status || 500
          response.body = {
              message: err.message || "Internal Server Error"
          }

          return response
        }
    }
}

export default new TransactionController();