import { NextApiRequest, NextApiResponse } from "next";
import { getPaginatedCars } from "../../database/getCars";

export default async function cars(req: NextApiRequest, res: NextApiResponse) {
    const cars = await getPaginatedCars(req.query)
    res.json(cars)
}