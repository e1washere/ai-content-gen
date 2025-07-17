import { NextRequest, NextResponse } from 'next/server'
import { stripe, createCheckoutSession, createCustomer, PRICE_IDS } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { planKey, userId } = await request.json()

    if (!planKey || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get user from Supabase
    const { data: user, error: userError } = await supabase.auth.admin.getUserById(userId)
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Skip checkout for free plan
    if (planKey === 'FREE') {
      return NextResponse.json(
        { message: 'Free plan activated' },
        { status: 200 }
      )
    }

    // Get or create Stripe customer
    let customerId = user.user.user_metadata?.stripe_customer_id

    if (!customerId) {
      const customer = await createCustomer(user.user.email!, user.user.user_metadata?.full_name)
      customerId = customer.id

      // Update user metadata with customer ID
      await supabase.auth.admin.updateUserById(userId, {
        user_metadata: {
          ...user.user.user_metadata,
          stripe_customer_id: customerId
        }
      })
    }

    // Get price ID for the plan
    const priceId = PRICE_IDS[planKey as keyof typeof PRICE_IDS]
    
    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

    // Create checkout session
    const session = await createCheckoutSession(
      customerId,
      priceId,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`
    )

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 