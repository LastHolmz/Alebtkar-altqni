const uri =
  process.env.NODE_ENV === "production"
    ? "https://alebtkar-altqni.vercel.app"
    : "http://localhost:3000";
export default uri;
