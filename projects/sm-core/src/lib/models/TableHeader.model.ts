export interface TableHeader {
  key: string;
  name: string;
  func?: (data: any) => any;
}
