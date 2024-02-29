import { ReferralTransactionModel } from './referral-transaction.model.js';
import { ReferralTransactionRepository } from './referral-transaction.repository.js';
import { ReferralTransactionService } from './referral-transaction.service.js';

const userRepository = new ReferralTransactionRepository(
    ReferralTransactionModel,
);
const userService = new ReferralTransactionService(userRepository);

export { userService };
export { ReferralTransactionEntity } from './referral-transaction.entity.js';
export { ReferralTransactionModel } from './referral-transaction.model.js';
export { ReferralTransactionService } from './referral-transaction.service.js';
