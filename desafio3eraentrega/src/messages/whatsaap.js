import twilio from "twilio";
import { envConfig } from "../envConfig.js";

const accountId = envConfig.IDTWILIO;
const tokenTwilio = envConfig.TOKENTWILIO;

const twilioPhone = envConfig.TWILIOPHONEWHATSAPP;
const adminPhone = envConfig.ADMINPHONE;

const twilioClient = twilio(accountId, tokenTwilio);

export { twilioClient,  twilioPhone, adminPhone}
