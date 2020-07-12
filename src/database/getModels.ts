import { openDB } from "../openDB";

export interface Model {
    make: string
    count: number
  }
  

export async function getModels(make: string){
    const db = await openDB();
    const models = await db.all<Model[]>(`
        select model, count(*) as count 
        from car 
        WHERE make = @make
        group by model 
    `, {'@make' : make}) 
    return models;
}