import { openDB } from "../openDB";

export interface Make {
    make: string
    count: number
  }
  

export async function getMakes(){
    const db = await openDB();
    const makes = await db.all<Make[]>(`
        select make, count(*) as count 
        from car 
        group by make 
    `) 
    return makes;
}