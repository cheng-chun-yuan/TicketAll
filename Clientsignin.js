async function handleSigninClick(e) {
    e.preventDefault();
    const alias = document.getElementById("alias").value;


    /**
     * Initiate the Passwordless client with your public api key
     */
    const p = new Passwordless.Client({
        apiKey: API_KEY,
    });

    try {
        /**
         * Sign in - The Passwordless API and the browser initiates a sign in based on the alias
         */

        //var userId = await fetch("user/id").then(r => r.json()); // get user id from database

        const { token, error } = await p.signinWithAlias(alias);
        //const token = await p.signinWithId(486761564);

        console.log("Received token", token);
        /**
         * Verify the sign in - Call your node backend to verify the token created from the sign in
         */
        const user = await fetch(BACKEND_URL + "/verify-signin?token=" + token).then((r) => r.json());

        /**
         * Done - you can now check the user result for status, userid etc
         */

        console.log("User", user);
    } catch (e) {
        console.error("Things went really bad: ", e);
    }
}
document
    .getElementById("passwordless-signin")