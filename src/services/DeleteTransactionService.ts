import { getCustomRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    const transaction = transactionRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Repository not found', 404);
    }

    await transactionRepository.delete({ id });
  }
}

export default DeleteTransactionService;
