import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { auth } from '@/auth'

export async function POST() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-03-25.dahlia',
  })

  const userId = (session.user as { id?: string }).id ?? session.user.email ?? ''

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = process.env.STRIPE_PRICE_ID
    ? [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }]
    : [
        {
          price_data: {
            currency: 'gbp',
            unit_amount: 499,
            recurring: { interval: 'month' },
            product_data: { name: 'Billdrop Pro' },
          },
          quantity: 1,
        },
      ]

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: lineItems,
    success_url: `${process.env.NEXTAUTH_URL}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/upgrade`,
    metadata: { userId },
    customer_email: session.user.email ?? undefined,
  })

  return NextResponse.json({ url: checkoutSession.url })
}
