import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentification requise",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token manquant",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Utilisateur introuvable",
      });
    }

    req.user = user;

    next();
  } catch (erreur) {
    console.error("Erreur authentification :", erreur.message);

    return res.status(401).json({
      message: "Token invalide ou expiré",
    });
  }
}