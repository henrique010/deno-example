import { Context } from "https://deno.land/x/oak/mod.ts";
import TransactionsRepository from "../repositories/TransactionsRepository.ts";

class BalanceController {
  public async show({ request, response }: Context) {
    try {
      const transactionsRepository = new TransactionsRepository();

      const balance = await transactionsRepository.getBalance();

      response.status = 200;
      response.body = { balance };
    } catch (err) {
      response.status = err.status || 500;
      response.body = {
        message: err.message || "Internal Server Error",
      };
    }
  }
}

export default new BalanceController();
