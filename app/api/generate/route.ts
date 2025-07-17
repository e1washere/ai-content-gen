import { NextRequest, NextResponse } from 'next/server'
import { generateContent, ContentGenerationRequest } from '@/lib/openai'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productName, productCategory, keyFeatures, targetAudience, contentType } = body

    // Validate required fields
    if (!productName || !productCategory || !contentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Generate content
    const contentRequest: ContentGenerationRequest = {
      productName,
      productCategory,
      keyFeatures: keyFeatures || [],
      targetAudience: targetAudience || 'Ogólna publiczność',
      contentType
    }

    const generatedContent = await generateContent(contentRequest)

    // Save to database
    const { error: dbError } = await supabase
      .from('generated_content')
      .insert({
        user_id: user.id,
        content_type: contentType,
        input_data: {
          productName,
          productCategory,
          keyFeatures,
          targetAudience
        },
        generated_content: generatedContent
      })

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue even if database save fails
    }

    return NextResponse.json({ content: generatedContent })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 