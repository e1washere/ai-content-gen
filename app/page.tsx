'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Zap, Globe, Users, ArrowRight, Check, Star, Leaf, Target, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-green-600" />,
      title: "AI w języku polskim",
      description: "Specjalizujemy się w generowaniu treści w języku polskim, dostosowanych do lokalnego rynku"
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Fokus na ekologię",
      description: "Szablony i prompty specjalnie zaprojektowane dla produktów ekologicznych i zrównoważonych"
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Różne typy treści",
      description: "Opisy produktów, posty na social media, artykuły blogowe - wszystko w jednym miejscu"
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "Oszczędność czasu",
      description: "Generuj profesjonalne treści w sekundach zamiast godzin ręcznego pisania"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "SEO-friendly",
      description: "Wszystkie treści są optymalizowane pod kątem wyszukiwarek i konwersji"
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Wsparcie 24/7",
      description: "Nasz zespół jest zawsze gotowy pomóc w rozwoju Twojego biznesu"
    }
  ]

  const testimonials = [
    {
      name: "Anna Kowalska",
      role: "Właścicielka sklepu EcoLife",
      content: "Dzięki EcoContent AI mogę generować profesjonalne opisy produktów w kilka sekund. Moja sprzedaż wzrosła o 40%!",
      rating: 5
    },
    {
      name: "Piotr Nowak",
      role: "Marketing Manager, GreenTech",
      content: "Najlepsze narzędzie dla polskich firm ekologicznych. Treści są wysokiej jakości i zawsze trafne.",
      rating: 5
    },
    {
      name: "Magdalena Wiśniewska",
      role: "Blogerka lifestyle",
      content: "Używam EcoContent AI do tworzenia postów na Instagram. Moje zasięgi wzrosły o 200%!",
      rating: 5
    }
  ]

  const stats = [
    { number: "10,000+", label: "Wygenerowanych treści" },
    { number: "500+", label: "Zadowolonych klientów" },
    { number: "95%", label: "Wskaźnik satysfakcji" },
    { number: "24/7", label: "Wsparcie techniczne" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">EcoContent AI</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-green-600 transition-colors">
                Funkcje
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-green-600 transition-colors">
                Cennik
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors">
                Opinie
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push('/login')} variant="outline">
                Zaloguj się
              </Button>
              <Button onClick={() => router.push('/register')} className="bg-green-600 hover:bg-green-700">
                Rozpocznij za darmo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Generuj profesjonalne treści AI
              <span className="text-green-600 block">dla produktów ekologicznych</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Pierwszy w Polsce generator treści AI specjalnie zaprojektowany dla firm ekologicznych. 
              Twórz opisy produktów, posty na social media i artykuły blogowe w sekundach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => router.push('/register')}
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
              >
                Zacznij za darmo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => router.push('/pricing')}
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4"
              >
                Zobacz cennik
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Darmowy plan • Bez karty kredytowej • Gotowe w 30 sekund
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Dlaczego EcoContent AI?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jedyne narzędzie w Polsce stworzone specjalnie dla firm ekologicznych
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Jak to działa?
            </h3>
            <p className="text-xl text-gray-600">
              Prosta w użyciu, potężna w działaniu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Wypełnij formularz</h4>
              <p className="text-gray-600">Podaj nazwę produktu, kategorię i kluczowe cechy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">AI generuje treść</h4>
              <p className="text-gray-600">Nasz algorytm tworzy profesjonalną treść w sekundach</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Kopiuj i używaj</h4>
              <p className="text-gray-600">Skopiuj gotową treść i użyj w swoim sklepie lub na stronie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Co mówią nasi klienci?
            </h3>
            <p className="text-xl text-gray-600">
              Dołącz do setek zadowolonych przedsiębiorców
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-gray-600 text-base">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Gotowy na zwiększenie sprzedaży?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Dołącz do tysięcy przedsiębiorców, którzy już wykorzystują AI do rozwoju swojego biznesu
          </p>
          <Button 
            onClick={() => router.push('/register')}
            size="lg" 
            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4"
          >
            Rozpocznij za darmo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-8 w-8 text-green-400" />
                <h4 className="text-xl font-bold">EcoContent AI</h4>
              </div>
              <p className="text-gray-400">
                Pierwszy w Polsce generator treści AI dla firm ekologicznych
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Produkt</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white">Funkcje</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Cennik</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Wsparcie</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Pomoc</Link></li>
                <li><Link href="/contact" className="hover:text-white">Kontakt</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Firma</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">O nas</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Prywatność</Link></li>
                <li><Link href="/terms" className="hover:text-white">Regulamin</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EcoContent AI. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
