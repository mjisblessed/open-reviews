// import rateLimit from '../config/upstash.js';

// const rateLimiter = async (req, res, next) => {
//     try {
//         const {success} = await rateLimit.limit("my-limit-key");
//         if (!success) {
//             return res.status(429).json({error: "Rate limit exceeded"});
//         }
//         next();
//     }   catch (error) {
//         console.error("Rate limiter error:", error);
//         res.status(500).json({error: "Internal Server Error"});
//     }
    
// }
// export default rateLimiter;