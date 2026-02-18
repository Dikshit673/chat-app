import bcrypt from 'bcryptjs';

export const bcryptLib = {
  async genSalt(rounds: number | undefined = 10) {
    return await bcrypt.genSalt(rounds);
  },
  async hash(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  },
  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  },
};
