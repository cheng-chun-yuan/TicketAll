import React from 'react';

// Metamask integration

async function connectMetamask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request user's permission to connect
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const selectedAccount = accounts[0];

            // Handle successful wallet connection
            console.log('Connected with Metamask');
            console.log('Selected account:', selectedAccount);
            const p = new Passwordless.Client({
                apiKey: API_KEY,
            });
            const { token, error } = await p.signinWithAlias(selectedAccount);
            if (error) {
                alert("Sign in failed, received the error");
                return;
            }
            const user = await fetch(BACKEND_URL + "/verify-signin?token=" + token).then((r) => r.json());
            if (user.success === true) {
                alert("User is logged in!");
            } else {
                alert("User is not logged in!", error);
            }
            // You can perform additional operations after successful connection
            // For example, interact with a smart contract or retrieve account balance

        } catch (error) {
            // Handle connection error or user denied permission
            console.error('Metamask connection error:', error);
        }
    } else {
        // Metamask not detected
        // Display an error message or alternative connection method
        console.error('Metamask extension not detected');
    }
}

const WalletButton = () => {
    const handleConnectWallet = async () => {
        await connectMetamask();
    };

    return (
        <button id="connect-wallet-btn" onClick={handleConnectWallet}>
            Connect Wallet
        </button>
    );
};

export default WalletButton;
