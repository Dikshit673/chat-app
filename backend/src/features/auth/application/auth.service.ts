import {
  type SanitizedUser,
  sanitizeUser,
} from '@/features/user/domain/user.sanitizer.js';
import { type UserId } from '@/features/user/domain/user.types.js';
import { type UserRepo } from '@/features/user/infra/interface/user.repo.js';
import { bcryptLib } from '@/lib/bcrypt/index.js';

export class AuthService {
  constructor(private readonly userRepo: UserRepo) {}

  async register(
    email: string,
    password: string,
    name: string
  ): Promise<SanitizedUser> {
    const exists = await this.userRepo.findByEmail(email);
    if (exists) throw new Error('User already exists');

    const user = await this.userRepo.create({ email, name, password });
    return sanitizeUser(user);
  }

  async login(email: string, password: string): Promise<SanitizedUser> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const ok = await bcryptLib.compare(password, user.password);
    if (!ok) throw new Error('Invalid credentials');

    return sanitizeUser(user);
  }

  async getMe(userId: UserId): Promise<SanitizedUser> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    return sanitizeUser(user);
  }
}
