export function fixOriginalName(name: string) {
  return Buffer.from(name, 'latin1').toString('utf8');
}
