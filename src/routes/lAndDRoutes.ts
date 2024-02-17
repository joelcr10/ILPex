import { Router, Request, Response } from "express";
import getTrainess from '../controllers/lAndDControllers/getTrainees';


const router = Router();

router.get("/getTrainees", async (req: Request, res: Response) => {
    getTrainess(req, res);
});

export default router;
