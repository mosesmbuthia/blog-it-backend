
import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

async function validation (req, res, next) {
    const {emailAddress, userName} = req.body;
    try {
        const userWithEmail = await client.user.findFirst({
            where: {emailAddress}
        })
        if (userWithEmail) {
         return res.status(400).json({
                status: "Error",
                message: "Email already taken"
            })
        }
        const userWithUserName = await client.user.findFirst({
            where: {userName}
        })
        if (userWithUserName) {
          return res.status(400).json({
                status: "Error",
                message: "Username already taken"
            })
        }

            next();

    } catch(error) {
        res.status(500).json({
            status: "Something went wrong",
            message: "Error validating username and email"
        })

    }
}

export default validation;