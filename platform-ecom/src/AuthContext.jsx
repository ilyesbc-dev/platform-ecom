
import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch, lireJson } from "./api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem("user");
      return sauvegarde ? JSON.parse(sauvegarde) : null;
    } catch {
      return null;
    }
  });

  function sauvegarder(donnees) {
    localStorage.setItem("token", donnees.token);
    localStorage.setItem("user", JSON.stringify(donnees.user));
    setUser(donnees.user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  useEffect(() => {
    const tokenInitial = localStorage.getItem("token");

    if (!tokenInitial) return;

    let annule = false;

    async function verifierSession() {
      try {
        const reponse = await apiFetch("/api/auth/me");

        if (annule) return;

        // Si le token n'est plus le même, ne pas restaurer la session.
        if (localStorage.getItem("token") !== tokenInitial) return;

        if (reponse.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          return;
        }

        const data = await lireJson(reponse);

        if (annule) return;

        if (localStorage.getItem("token") !== tokenInitial) return;

        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } catch (erreur) {
        // Une erreur réseau ne doit pas restaurer une ancienne session.
        console.error("Erreur de vérification de session :", erreur);
      }
    }

    verifierSession();

    return () => {
      annule = true;
    };
  }, []);

  async function login(email, password) {
    const reponse = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await lireJson(reponse);
    sauvegarder(data);

    return data.user;
  }

  async function loginGoogle(credential) {
    const reponse = await apiFetch("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    });

    const data = await lireJson(reponse);
    sauvegarder(data);

    return data.user;
  }

  async function register(nom, email, password) {
    const reponse = await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ nom, email, password }),
    });

    const data = await lireJson(reponse);
    sauvegarder(data);

    return data.user;
  }

  return (
    <AuthContext.Provider
      value={{ user, login, loginGoogle, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
