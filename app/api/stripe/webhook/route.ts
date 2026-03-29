import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { setUserPro, getUserByStripeCustomerId } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-03-25.dahlia',
  })

  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId ?? session.customer_email ?? ''
    const customerId = typeof session.customer === 'string' ? session.customer : (session.customer as Stripe.Customer)?.id ?? ''
    if (userId) {
      await setUserPro(userId, true, customerId || undefined)
    }
  } else if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    const customerId = typeof sub.customer === 'string' ? sub.customer : (sub.customer as Stripe.Customer).id
    const user = await getUserByStripeCustomerId(customerId)
    if (user) {
      await setUserPro(String(user.id ?? user.email), false)
    }
  } else if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription
    if (sub.status === 'canceled' || sub.status === 'unpaid') {
      const customerId = typeof sub.customer === 'string' ? sub.customer : (sub.customer as Stripe.Customer).id
      const user = await getUserByStripeCustomerId(customerId)
      if (user) {
        await setUserPro(String(user.id ?? user.email), false)
      }
    }
  }

  return NextResponse.json({ received: true })
}
