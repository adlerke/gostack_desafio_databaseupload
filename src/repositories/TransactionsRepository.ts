import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transaction = await this.find();

    const { income, outcome } = transaction.reduce(
      (acumulator, trans) => {
        switch (trans.type) {
          case 'income':
            acumulator.income += Number(trans.value);
            break;
          case 'outcome':
            acumulator.outcome += Number(trans.value);
            break;

          default:
            break;
        }
        return acumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
