export interface TableLayoutData<T> {
  getAttribute: (data: T, key: string) => any;
}
