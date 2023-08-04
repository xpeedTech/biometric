import { Router } from "express";

const router = Router({mergeParams: true});

router.get("/", (req : any, res : any)=>{
    console.log("message", "Hello I'm running....");
    res.json({
        resultCode: "SUCCESS",
        message: "Application is runniing...."
    })
})

export default router;
