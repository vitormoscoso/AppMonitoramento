import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";

function errosFirebase(error) {
  let mensagem = "";
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      mensagem = "Esse email já está em uso";
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      mensagem = "Email inválido";
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      mensagem = "A senha precisa de no minimo 6 caracteres";
      break;
    default:
      mensagem = "Erro desconhecido";
  }
  return mensagem;
}

export async function register(email, password) {
  const resultado = await createUserWithEmailAndPassword(auth, email, password)
    .then((dadosDoUsuario) => {
      return { user: dadosDoUsuario.user, message: "sucesso" };
    })
    .catch((error) => {
      console.log(error);
      const errorCode = errosFirebase(error);
      return { user: null, message: errorCode };
    });

  return resultado;
}
