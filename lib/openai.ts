import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ContentGenerationRequest {
  productName: string
  productCategory: string
  keyFeatures: string[]
  targetAudience: string
  contentType: 'product_description' | 'social_media' | 'blog_post'
}

export async function generateContent(request: ContentGenerationRequest): Promise<string> {
  const { productName, productCategory, keyFeatures, targetAudience, contentType } = request

  const prompts = {
    product_description: `Napisz profesjonalny opis produktu po polsku dla produktu ekologicznego "${productName}" z kategorii "${productCategory}". 
    Kluczowe cechy: ${keyFeatures.join(', ')}. 
    Grupa docelowa: ${targetAudience}. 
    Opis powinien być SEO-friendly, przekonujący i podkreślać korzyści ekologiczne. Długość: 150-200 słów.`,
    
    social_media: `Stwórz angażujący post na media społecznościowe po polsku dla produktu ekologicznego "${productName}". 
    Kategoria: ${productCategory}. Cechy: ${keyFeatures.join(', ')}. 
    Grupa docelowa: ${targetAudience}. 
    Dodaj odpowiednie hashtagi związane z ekologią i zrównoważonym rozwojem. Maksymalnie 280 znaków.`,
    
    blog_post: `Napisz wprowadzenie do artykułu na blogu po polsku o produkcie ekologicznym "${productName}" z kategorii "${productCategory}". 
    Kluczowe cechy: ${keyFeatures.join(', ')}. 
    Grupa docelowa: ${targetAudience}. 
    Artykuł powinien być edukacyjny, inspirujący i promować zrównoważony styl życia. Długość: 300-400 słów.`
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Jesteś ekspertem od marketingu produktów ekologicznych w Polsce. Tworzysz treści w języku polskim, które są profesjonalne, przekonujące i zgodne z trendami zrównoważonego rozwoju.'
        },
        {
          role: 'user',
          content: prompts[contentType]
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || 'Nie udało się wygenerować treści.'
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Błąd podczas generowania treści')
  }
}

export const ecoProductCategories = [
  'Kosmetyki naturalne',
  'Produkty zero waste',
  'Żywność ekologiczna',
  'Odzież zrównoważona',
  'Produkty do domu',
  'Zabawki ekologiczne',
  'Akcesoria wielokrotnego użytku',
  'Produkty dla dzieci',
  'Suplementy naturalne',
  'Produkty do pielęgnacji'
] 