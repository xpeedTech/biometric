
import { Router } from "express";
import PaginateHelper from "./../../../lib/PaginateHelper";
import AccessHistory from "./../../../models/schemas/AccessHistory";
export const options = {
    isSecure: true,
    role: "user",
}

const router = Router({ mergeParams: true });

router.get("/", async (req: any, res) => {
    const _id = req.params._id;
    const accessHistory = await AccessHistory.findById(_id);
    return res.json({
        result: {
            resultCode: "SUCCESS",
            message: "Successful",
            device: accessHistory
        }
    })
})

router.put("/", async (req: any, res) => {
    const _id = req.params._id;
    const accessHistory = await AccessHistory.findOneAndUpdate({ _id: _id }, { $set: { ...req.body } }, { new: true });

    return res.json({
        result: {
            resultCode: "SUCCESS",
            message: "Successful",
            device: accessHistory
        }
    })
})


export default router;
