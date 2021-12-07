// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

const secret = process.env.JWT_SECRET;

const jwtHandler = async (req, res) => {
  const token = await getToken({ req, secret });
  res.send(JSON.stringify(token, null, 2));
};

const sessionHandler = async (req, res) => {
  const session = await getSession({ req });
  res.send(JSON.stringify(session, null, 2));
};

const protectedHandler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};

export default protectedHandler;
