'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { PLANS } from '@/lib/stripe'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Sparkles, Zap, Crown, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function PricingPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()
  }, [])

  const handleSubscribe = async (planKey: string) => {
    if (!user) {
      router.push('/login')
      return
    }

    setLoading(planKey)
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planKey,
          userId: user.id,
        }),
      })

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      } else {
        toast.error('Błąd podczas tworzenia sesji płatności')
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas procesu płatności')
    } finally {
      setLoading(null)
    }
  }

  const getPlanIcon = (planKey: string) => {
    switch (planKey) {
      case 'FREE':
        return <Sparkles className="h-6 w-6" />
      case 'BASIC':
        return <Zap className="h-6 w-6" />
      case 'PREMIUM':
        return <Crown className="h-6 w-6" />
      case 'PRO':
        return <Star className="h-6 w-6" />
      default:
        return <Sparkles className="h-6 w-6" />
    }
  }

  const getPlanColor = (planKey: string) => {
    switch (planKey) {
      case 'FREE':
        return 'text-gray-600'
      case 'BASIC':
        return 'text-blue-600'
      case 'PREMIUM':
        return 'text-purple-600'
      case 'PRO':
        return 'text-orange-600'
      default:
        return 'text-gray-600'
    }
  }

  const getButtonVariant = (planKey: string) => {
    switch (planKey) {
      case 'PREMIUM':
        return 'gradient'
      case 'PRO':
        return 'default'
      default:
        return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">EcoContent AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Button onClick={() => router.push('/dashboard')} variant="outline">
                  Dashboard
                </Button>
              ) : (
                <Button onClick={() => router.push('/login')} variant="outline">
                  Zaloguj się
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Wybierz plan idealny dla Twojego biznesu
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Generuj profesjonalne treści AI dla produktów ekologicznych. 
            Oszczędzaj czas i zwiększaj sprzedaż dzięki naszym narzędziom.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(PLANS).map(([planKey, plan]) => (
            <Card 
              key={planKey} 
              className={`relative ${planKey === 'PREMIUM' ? 'border-2 border-purple-500 shadow-lg' : ''}`}
            >
              {planKey === 'PREMIUM' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Najpopularniejszy
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${getPlanColor(planKey)} bg-opacity-10 mb-4`}>
                  {getPlanIcon(planKey)}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-3xl font-bold text-gray-900">
                  {plan.price === 0 ? 'Darmowy' : `${plan.price} zł/mies`}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <span className="text-sm text-gray-600">
                    {plan.credits} generacji miesięcznie
                  </span>
                </div>
                
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleSubscribe(planKey)}
                  disabled={loading === planKey || (planKey === 'FREE' && user)}
                  variant={getButtonVariant(planKey)}
                  className="w-full mt-6"
                >
                  {loading === planKey ? 'Przetwarzanie...' : 
                   planKey === 'FREE' ? (user ? 'Aktualny plan' : 'Zacznij za darmo') : 
                   'Wybierz plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">Często zadawane pytania</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold mb-2">Czy mogę zmienić plan w dowolnym momencie?</h4>
              <p className="text-gray-600">Tak, możesz zmienić plan w dowolnym momencie. Zmiany wchodzą w życie natychmiast.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Czy oferujecie zwrot pieniędzy?</h4>
              <p className="text-gray-600">Tak, oferujemy 30-dniową gwarancję zwrotu pieniędzy bez zadawania pytań.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Jak działa system kredytów?</h4>
              <p className="text-gray-600">Każda generacja treści kosztuje 1 kredyt. Kredyty odnawiają się co miesiąc.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Czy treści są unikalne?</h4>
              <p className="text-gray-600">Tak, każda treść jest generowana specjalnie dla Twojego produktu i jest unikalna.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 