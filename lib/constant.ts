const uri =
  process.env.NODE_ENV === "production"
    ? "https://ebtkar.tech"
    : "http://localhost:3000";
export default uri;
