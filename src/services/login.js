import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";

export async function login(email, senha) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      return { user: dadosDoUsuario.user, message: "sucesso" };
    })
    .catch((error) => {
      console.log(error);
      return { user: null, message: error.message };
    });
  return resultado;
}
