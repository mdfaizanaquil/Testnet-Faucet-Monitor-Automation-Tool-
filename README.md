# Testnet Faucet Monitor

A Node.js script that monitors the balances of specified testnet faucet contracts. When a faucet's balance goes above a certain threshold, it sends an alert to a Telegram chat.

## Features
- Monitors multiple faucet addresses on multiple networks.
- Configurable balance threshold.
- Sends alerts directly to your Telegram.
- Remembers which faucets it has notified about to prevent spam.

## Setup
1.  **Clone & Install:** `npm install ethers dotenv axios chalk`
2.  **Create a Telegram Bot:** Talk to the **BotFather** on Telegram to get a bot token. Then, find your chat ID using a bot like **@userinfobot**.
3.  **Configure `.env` file:** Create `.env` and fill it out:
    ```env
    # Comma-separated list of RPC URLs
    RPC_URLS="[https://sepolia.infura.io/v3/YOUR_ID,https://rpc.ankr.com/polygon_mumbai](https://sepolia.infura.io/v3/YOUR_ID,https://rpc.ankr.com/polygon_mumbai)"
    # Comma-separated list of Faucet contract addresses to watch
    FAUCET_ADDRESSES="0x...,0x..."
    TELEGRAM_BOT_TOKEN="YOUR_TELEGRAM_BOT_TOKEN"
    TELEGRAM_CHAT_ID="YOUR_TELEGRAM_CHAT_ID"
    # Notify if balance is above this amount in native ETH
    MIN_BALANCE_ETH="0.5"
    ```
4.  **Run:** `node faucet-monitor.js`
