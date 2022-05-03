module.exports.signUpErrors = (err) => {
    let errors = {pseudo: '', email: '', password: ''};

    if (err.message.includes('pseudo')){
        if (err.code == 11000)
            errors.pseudo = "pseudo deja pris";
        else
            errors.pseudo = "pseudo inccorect";
    };

    if (err.message.includes('email')){
        if (err.code == 11000)
            errors.email = "email deja pris";
        else
            errors.email = "email inccorect";
    };

    if (err.message.includes('password')){
        errors.password = "le mot de passe doit faire 6 caracteres minimum";
    };

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = {email: '', password: ''};

    if (err.message.includes('email')) {
        errors.email = "email inconnu";
    }
    if (err.message.includes('password')) {
        errors.password = "password incorrect";
    }

    return errors;
}