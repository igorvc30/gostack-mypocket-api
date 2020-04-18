import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

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
    const {total} = this.transactionsRepository.getBalance()
    if(type === 'outcome' && value > total){
      throw Error('Insufficient balance for the transaction.')
    }
    
    const transaction = this.transactionsRepository.create({title, value, type})
    return transaction
  }
}

export default CreateTransactionService;
