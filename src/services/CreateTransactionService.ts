import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Transaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Omit<Transaction, 'id'>): Transaction {
    if(value < 0){
      throw Error('The value should be greater than zero.')
    }
    if(type !== 'income' && type !== 'outcome'){
      throw Error('The type should be income or outcome.')
    }
    
    const transaction = this.transactionsRepository.create({title, value, type})
    return transaction
  }
}

export default CreateTransactionService;
