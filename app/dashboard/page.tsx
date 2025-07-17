'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { generateContent, ContentGenerationRequest, ecoProductCategories } from '@/lib/openai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Sparkles, FileText, MessageSquare, PenTool, Copy, Download } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [contentType, setContentType] = useState<'product_description' | 'social_media' | 'blog_post'>('product_description')
  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    keyFeatures: '',
    targetAudience: ''
  })
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
    }
    checkUser()
  }, [router])

  const handleGenerate = async () => {
    if (!formData.productName || !formData.productCategory) {
      toast.error('Wypełnij wszystkie wymagane pola')
      return
    }

    setLoading(true)
    try {
      const request: ContentGenerationRequest = {
        productName: formData.productName,
        productCategory: formData.productCategory,
        keyFeatures: formData.keyFeatures.split(',').map(f => f.trim()),
        targetAudience: formData.targetAudience,
        contentType
      }

      const content = await generateContent(request)
      setGeneratedContent(content)

      // Save to database
      await supabase.from('generated_content').insert({
        user_id: user.id,
        content_type: contentType,
        input_data: formData,
        generated_content: content
      })

      toast.success('Treść została wygenerowana!')
    } catch (error) {
      toast.error('Błąd podczas generowania treści')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedContent)
    toast.success('Skopiowano do schowka!')
  }

  const downloadContent = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${contentType}_${formData.productName}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!user) return <div>Ładowanie...</div>

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
              <span className="text-sm text-gray-600">Witaj, {user.email}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Wyloguj
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PenTool className="h-5 w-5" />
                <span>Generator treści AI</span>
              </CardTitle>
              <CardDescription>
                Wypełnij formularz, aby wygenerować profesjonalną treść dla produktów ekologicznych
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Content Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Typ treści</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={contentType === 'product_description' ? 'default' : 'outline'}
                    onClick={() => setContentType('product_description')}
                    className="text-xs"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Opis produktu
                  </Button>
                  <Button
                    variant={contentType === 'social_media' ? 'default' : 'outline'}
                    onClick={() => setContentType('social_media')}
                    className="text-xs"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Social media
                  </Button>
                  <Button
                    variant={contentType === 'blog_post' ? 'default' : 'outline'}
                    onClick={() => setContentType('blog_post')}
                    className="text-xs"
                  >
                    <PenTool className="h-4 w-4 mr-1" />
                    Blog post
                  </Button>
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Nazwa produktu *</label>
                <Input
                  placeholder="np. Bambusowa szczoteczka do zębów"
                  value={formData.productName}
                  onChange={(e) => setFormData({...formData, productName: e.target.value})}
                />
              </div>

              {/* Product Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Kategoria produktu *</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.productCategory}
                  onChange={(e) => setFormData({...formData, productCategory: e.target.value})}
                >
                  <option value="">Wybierz kategorię</option>
                  {ecoProductCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Key Features */}
              <div>
                <label className="block text-sm font-medium mb-2">Kluczowe cechy (oddzielone przecinkami)</label>
                <Input
                  placeholder="np. biodegradowalny, antybakteryjny, wegański"
                  value={formData.keyFeatures}
                  onChange={(e) => setFormData({...formData, keyFeatures: e.target.value})}
                />
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium mb-2">Grupa docelowa</label>
                <Input
                  placeholder="np. świadomi ekologicznie rodzice"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Generowanie...' : 'Wygeneruj treść AI'}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Wygenerowana treść</span>
              </CardTitle>
              <CardDescription>
                Twoja treść AI gotowa do użycia
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg min-h-[300px] whitespace-pre-wrap">
                    {generatedContent}
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Kopiuj
                    </Button>
                    <Button onClick={downloadContent} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Pobierz
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Wypełnij formularz i kliknij "Wygeneruj treść AI", aby rozpocząć</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 