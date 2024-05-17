export function splitByNewline(text: string): string[] {
  return text.split('\n');
}

export function replaceAllBy(text: string, searchValue: string, replaceValue: string): string {
  const regex = new RegExp(`${searchValue}+`, 'g');
  return text.replaceAll(regex, replaceValue);
}
