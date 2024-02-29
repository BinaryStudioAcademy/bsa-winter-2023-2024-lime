import { UserReferralModel } from './user-referral.model.js';
import { UserReferralRepository } from './user-referral.repository.js';
import { ReferralTransactionService } from './user-referral.service.js';

const userRepository = new UserReferralRepository(UserReferralModel);
const userService = new ReferralTransactionService(userRepository);

export { userService };
export { UserReferralEntity } from './user-referral.entity.js';
export { UserReferralModel } from './user-referral.model.js';
export { ReferralTransactionService } from './user-referral.service.js';
