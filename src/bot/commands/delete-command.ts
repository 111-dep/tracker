import TelegramBot from "node-telegram-bot-api";
import { PrismaWalletRepository } from "../../repositories/prisma/wallet";
import { DeleteWalletMessage } from "../messages/delete-wallet-message";
import { SUB_MENU } from "../../config/bot/menus";
import { PublicKey } from "@solana/web3.js";

export class DeleteCommand {
    private prismaWalletRepository: PrismaWalletRepository
    private deleteWalletMessage: DeleteWalletMessage
    constructor(
        private bot: TelegramBot
    ) {
        this.bot = bot
        this.prismaWalletRepository = new PrismaWalletRepository()
        this.deleteWalletMessage = new DeleteWalletMessage()
    }

    public deleteCommandHandler() {
        this.bot.onText(/\/delete/, async (msg) => {
            const userId = msg.from?.id;
      
            if (!userId) return;

            this.delete({ message: msg, isButton: false })
        })
    } 

    public deleteButtonHandler(msg: TelegramBot.Message) {
       this.delete({ message: msg, isButton: true})
    }

    private delete({ message, isButton }: { message: TelegramBot.Message, isButton: boolean }) {
        const deleteMessage = this.deleteWalletMessage.sendDeleteWalletMessage()
        if (isButton) {
            this.bot.editMessageText(deleteMessage, {
                chat_id: message.chat.id,
                message_id: message.message_id,
                reply_markup: SUB_MENU,
                parse_mode: 'HTML'
           })
        } else if (!isButton) {
            this.bot.sendMessage(message.chat.id, deleteMessage, { reply_markup: SUB_MENU, parse_mode: 'HTML' })
        }

        const userId = message.chat.id.toString()

        const listener = async (responseMsg: TelegramBot.Message) => {

        const walletAddress = responseMsg.text;

          // validate the wallet before using the database
          const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

          const isValid = base58Regex.test(walletAddress as string) && PublicKey.isOnCurve(new PublicKey(walletAddress as string).toBytes());
 
          if (!isValid) {
            this.bot.sendMessage(message.chat.id, "Address provided is not a valid Solana wallet");
            return;
          }

        const deletedAddress = await this.prismaWalletRepository.deleteWallet(userId, walletAddress!)

        if (!deletedAddress?.walletId) {
            this.bot.sendMessage(message.chat.id, "You're not tracking this wallet at the time");
            return
        }

         this.bot.sendMessage(message.chat.id, "Wallet deleted succesfully");

         this.bot.removeListener('message', listener);
        }

        this.bot.once('message', listener);
    }
}