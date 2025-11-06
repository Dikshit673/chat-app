const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
// const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

const multipliers: Record<string, number> = {
  s: SECOND,
  m: MINUTE,
  h: HOUR,
  d: DAY,
  w: WEEK,
  y: YEAR,
} as const;

export const parseTokenAge = (age: string): number => {
  const match = /^(\d+)([smhdwy])$/.exec(age.trim());
  if (!match) throw new Error(`Invalid age format: "${age}"`);

  const value = parseInt(match[1], 10);
  const unit = match[2];

  return value * multipliers[unit];
};
