import { Router } from "https://deno.land/x/oak/mod.ts";
import TransactionController from "../controllers/TransactionController.ts";
import BalanceController from "../controllers/BalanceController.ts";

const router = new Router();

router.get("/api/transactions", TransactionController.index);
router.post("/api/transactions", TransactionController.create);

router.get("/api/balances", BalanceController.show);

export { router };
