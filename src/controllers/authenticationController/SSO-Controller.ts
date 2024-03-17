// import { Request, Response } from "express";
// import SSOService from "../../services/authentication/SSO-Service";

// const SSOController = async (req: Request,res: Response ) => {
//     try {

//         const {msAccessToken} = req.body;
//         if (!msAccessToken) {
//           return res
//             .status(401)
//             .json({ error: "Unauthorized - Token not provided" });
//         }
    
//         const result = await SSOService( msAccessToken );
    
//         return res.status(200).json(result);
//       } catch (error) {
//         console.error("Authorization error:", error);
//         return res.status(500).json({ error: "Internal server error" });
//       }
// }

// export default SSOController;