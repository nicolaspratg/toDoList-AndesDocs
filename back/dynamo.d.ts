declare module "dynamo" {
    export function getAllItems(): Promise<any[]>;
    export function getItemById(id: string): Promise<any>;
    export function addOrUpdateItem(item: any): Promise<any>;
    export function deleteItemById(id: string): Promise<any>;
  }
  