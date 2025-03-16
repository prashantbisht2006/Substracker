import { config } from "dotenv";


// here it is the way to dynamically alllocate the or the env file which i want to use "chat gpt ==> This line dynamically loads an environment file (.env.production, .env.development, etc.) based on the value of NODE_ENVThis line dynamically loads an environment file (.env.production, .env.development, etc.) based on the value of NODE_ENV"
config({path: `.env.${process.env.NODE_ENV || 'development'}.local`}); // this define the path with which we can access the anv variables fromm diff ebv.

export const { PORT,Node_ENV ,DB_URI } = process.env;
/*If NODE_ENV is "production", it loads .env.production.
If NODE_ENV is "development", it loads .env.development.
If NODE_ENV is not set, it defaults to .env.development (|| 'development').*/
console.log("Loaded PORT:", process.env.PORT);
export const {port, NODE_ENV,jwt_secret,jwt_expires_in,arcjet_key,arcjet_environment}=process.env;



