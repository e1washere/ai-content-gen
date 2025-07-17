import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export const PRICE_IDS = {
  BASIC: 'price_basic_monthly', // Replace with actual Stripe price ID
  PREMIUM: 'price_premium_monthly', // Replace with actual Stripe price ID
  PRO: 'price_pro_monthly', // Replace with actual Stripe price ID
}

export const PLANS = {
  FREE: {
    name: 'Darmowy',
    price: 0,
    credits: 5,
    features: ['5 generacji miesięcznie', 'Podstawowe szablony', 'Email support']
  },
  BASIC: {
    name: 'Podstawowy',
    price: 49,
    credits: 100,
    features: ['100 generacji miesięcznie', 'Wszystkie szablony', 'Priority support', 'Historia generacji']
  },
  PREMIUM: {
    name: 'Premium',
    price: 99,
    credits: 500,
    features: ['500 generacji miesięcznie', 'Wszystkie szablony', 'API dostęp', 'Bulk generowanie', 'Dedykowane wsparcie']
  },
  PRO: {
    name: 'Pro',
    price: 199,
    credits: 2000,
    features: ['2000 generacji miesięcznie', 'Wszystkie szablony', 'API dostęp', 'White-label', 'Dedykowany manager']
  }
}

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return session
}

export async function createCustomer(email: string, name?: string) {
  const customer = await stripe.customers.create({
    email,
    name,
  })

  return customer
}

export async function getCustomerSubscriptions(customerId: string) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
  })

  return subscriptions
} 