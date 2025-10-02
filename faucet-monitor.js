const { ethers } = require("ethers");
const axios = require("axios");
const chalk = require("chalk");
require("dotenv").config();

// Load configuration
const RPC_URLS = process.env.RPC_URLS.split(',');
const FAUCET_ADDRESSES = process.env.FAUCET_ADDRESSES.split(',');
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const MIN_BALANCE_ETH = parseFloat(process.env.MIN_BALANCE_ETH);

const notifiedFaucets = new Set(); // To prevent spamming notifications

async function sendTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
        await axios.post(url, { chat_id: TELEGRAM_CHAT_ID, text: message });
        console.log(chalk.green("✅ Notification sent!"));
    } catch (error) {
        console.error(chalk.red("❌ Error sending Telegram notification:", error.message));
    }
}

async function checkFaucets() {
    console.log(chalk.blue("\nChecking faucet balances..."));
    for (const address of FAUCET_ADDRESSES) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(RPC_URLS[Math.floor(Math.random() * RPC_URLS.length)]);
            const balance = await provider.getBalance(address);
            const balanceInEth = parseFloat(ethers.utils.formatEther(balance));

            console.log(`- Faucet ${address.slice(0, 8)}... has ${balanceInEth.toFixed(2)} ETH`);

            if (balanceInEth > MIN_BALANCE_ETH) {
                if (!notifiedFaucets.has(address)) {
                    const message = `💧 Faucet Alert! 💧\n\nFaucet ${address} has been refilled!\n\nBalance: ${balanceInEth.toFixed(2)} ETH`;
                    await sendTelegram(message);
                    notifiedFaucets.add(address); // Remember we notified for this one
                }
            } else {
                notifiedFaucets.delete(address); // Reset if balance drops, so we can notify again later
            }
        } catch (error) {
            console.error(chalk.red(`❌ Could not check balance for ${address}: ${error.message}`));
        }
    }
}

console.log("🚀 Faucet Monitor Started.");
checkFaucets();
setInterval(checkFaucets, 5 * 60 * 1000); // Check every 5 minutes
