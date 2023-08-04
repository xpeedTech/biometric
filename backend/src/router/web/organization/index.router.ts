
import { Router } from "express";
import PaginateHelper from "./../../../lib/PaginateHelper";
import Device from "./../../../models/schemas/Device";
export const options = {
    isSecure: true,
    role: "user",
}

const router = Router({ mergeParams: true });

router.post("/", async (req : any, res)=>{
    const query = PaginateHelper.query(req);
    const options = PaginateHelper.options(req);

    const devices = await Device.find(query, null, options);
    const count = await Device.count(query);
    return res.json({
        result: {
            records: devices,
            count: count,
            page: req.params.page || 1
        }
    })
})

router.put("/", async (req: any, res) => {
    const device = new Device({...req.body});
    await device.save();

    return res.json({
        result: {
            resultCode: "SUCCESS",
            message: "Successful",
            device: device
        }
    });
})


export default router;
