import twilio from "twilio";
import { options } from "../config/config.js"

const accountId = options.twilio.idTwilio;
const tokenTwilio = options.twilio.tokenTwilio;

const twilioPhone = options.twilio.twilioPhone;
const adminPhone = options.twilio.adminPhone;

const twilioClient = twilio(accountId, tokenTwilio);

export { twilioClient,  twilioPhone, adminPhone}
