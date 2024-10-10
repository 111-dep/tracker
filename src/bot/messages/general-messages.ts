import { SubscriptionPlan } from '@prisma/client'
import { MAX_HOBBY_WALLETS, MAX_PRO_WALLETS, MAX_WHALE_WALLETS } from '../../constants/pricing'

export class GeneralMessages {
  constructor() {}

  public sendStartMessage(): string {
    const messageText = `
🐱 Handi Cat | Wallet Tracker\n\n 🆙 For more features, you can upgrade to PRO, which allows tracking ${MAX_HOBBY_WALLETS}+ wallets.
`

    return messageText
  }

  public sendPlanUpgradedMessage(plan: SubscriptionPlan, subscriptionEnd: string): string {
    const planWallets: { [key: string]: number } = {
      HOBBY: MAX_HOBBY_WALLETS,
      PRO: MAX_PRO_WALLETS,
      WHALE: MAX_WHALE_WALLETS,
    }

    const planWallet = planWallets[plan]

    const messageText = `
😸 Success! Your plan has been upgraded to <b>${plan}</b>.

You can now track up to <b>${planWallet}</b> wallets at the time

Your plan will be renewed at <b>${subscriptionEnd}</b>
`

    return messageText
  }

  public sendInsufficientBalanceMessage(): string {
    const messageText = `
😿 Ooops it seems that you don't have sufficient balance to perform this transaction.

You can try by adding some <b>SOL</b> to your Handi Cat personal wallet 😺
`

    return messageText
  }

  public sendUserAlreadyPaidMessage(action: 'CODE' | 'PLAN'): string {
    const messageText = `
🤝 You already purchased this ${action.toLowerCase()} 
`

    return messageText
  }

  public sendWalletLimitMessageError(
    walletName: string | undefined,
    walletAddress: string,
    planWallets: number,
  ): string {
    const messageText = `
😾 Could not add wallet: <code>${walletName ? walletName : walletAddress}</code>, 

Wallet limit reached: <b>${planWallets}</b>

You can try by upgrading your <b>plan</b> for more wallets 💎
`

    return messageText
  }

  public sendGeneralMessageError(): string {
    const messageText = `
😿 Ooops it seems that something went wrong while processing the transaction.

You probaly don't have sufficient balance in your wallet

Maybe try adding some <b>SOL</b> to your Handi Cat personal wallet 😺
`

    return messageText
  }
}
