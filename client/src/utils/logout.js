const Logout = () => {
    localStorage.clear();
    window.location.reload();
    
    // localStorage.setItem("already_login", true);

    // const resetTimer = () => {
    //     localStorage.setItem("countdownSeconds", 120);
    // };
}

export default Logout;