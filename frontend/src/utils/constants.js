var host = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  host = "http://localhost:4000";
}
export const BASE_API_URL = host;