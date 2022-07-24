import React, { useState } from "react";
import axios from "axios";
import SignInFrom from "./SignInFrom";

function SignUpForm() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPasword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfError = document.querySelector(".password-conf.error");
    const termsError = document.querySelector(".terms.error");

    passwordConfError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfError.innerHTML = "les mots de pass ne correspondent pas";
      if (!terms.checked)
        termsError.innerHTML = "Veuillew valider les conditions generales";
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        withCredentials: true,
        data: {
          pseudo: pseudo,
          email: email,
          password: password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInFrom />
          <span></span>
          <h4 className="success">
            Enregistrement reussi, Veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <br />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            vlaue={email}
          />
          <br />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot De Pass</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer le Mot de Pass</label>
          <br />
          <input
            type="password"
            name="password-conf"
            id="password-conf"
            onChange={(e) => setControlPasword(e.target.value)}
            value={controlPassword}
          />
          <br />
          <div className="password-conf error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accept les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              Conditions
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" vlaue="Valider l'inscreption" />
        </form>
      )}
    </>
  );
}

export default SignUpForm;
