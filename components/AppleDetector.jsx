// utils/detectAppleDevice.js
import { UAParser } from "ua-parser-js";

export const isAppleDevice = (userAgent) => {
  const parser = new UAParser(userAgent);
  const os = parser.getOS();
  return os.name === "iOS" || os.name === "Mac OS";
};
