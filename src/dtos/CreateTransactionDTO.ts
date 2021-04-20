interface CreateTransactionDTO {
    value: number;
    title: string;
    type: 'income' | 'outcome';
}

export type { CreateTransactionDTO }