import aj from '../config/arcjet.js';

const arcjetmiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { request: 1 });

    if (decision.isDenied()) {
      if (decision.isRateLimited()) { 
        
        return res.status(429).json({ error: "Access limit exceeded" });
      }
      if (decision.isBot()) {
        return res.status(403).json({ error: "Bot detected" });
      }
      return res.status(403).json({ error: "Access denied! Please try again" });
    }

    next(); 
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error}`);
    next(error); 
  }
};

export default arcjetmiddleware;
