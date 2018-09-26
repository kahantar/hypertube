export const checkValidLogin = (user) => {
    const errors = []
    let regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    let pass = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    if (!(regex).test(user.email) || !(pass).test(user.password))  
        errors.push({msg: "Incorrect combination"});
    return errors;
}