import bcrypt from 'bcryptjs';

const generateSalt = async (rounds: number | undefined = 10) => {
  const salt = await bcrypt.genSalt(rounds);
  return salt;
};

const hashPassword = async (password: string, salt: string) => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (password: string, hash: string) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};

export { generateSalt, hashPassword, comparePassword };
