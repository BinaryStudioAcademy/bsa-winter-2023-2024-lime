import { UserReferralModel } from './user-referral.model.js';
import { UserReferralRepository } from './user-referral.repository.js';
import { UserReferralService } from './user-referral.service.js';

const userRepository = new UserReferralRepository(UserReferralModel);
const userService = new UserReferralService(userRepository);

export { userService };
export { UserReferralEntity } from './user-referral.entity.js';
export { UserReferralModel } from './user-referral.model.js';
export { UserReferralService } from './user-referral.service.js';
