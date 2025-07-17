# EcoContent AI

**Professional AI Content Generator for Eco-Commerce**

A sophisticated Next.js application that leverages OpenAI's GPT models to generate high-quality, SEO-optimized content in Polish for eco-friendly products and sustainable businesses.

## Overview

EcoContent AI is a specialized content generation platform designed for the growing eco-commerce market in Poland. The platform combines artificial intelligence with domain expertise to create compelling product descriptions, social media content, and blog articles that resonate with environmentally conscious consumers.

## Key Features

- **AI-Powered Content Generation**: Advanced prompts optimized for eco-friendly products
- **Multi-Format Support**: Product descriptions, social media posts, and blog articles
- **Polish Language Optimization**: Native Polish content generation with local market understanding
- **User Authentication**: Secure login with email/password and Google OAuth
- **Subscription Management**: Flexible pricing tiers with Stripe integration
- **Content History**: Save and manage previously generated content
- **Responsive Design**: Modern UI optimized for all devices

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI Integration**: OpenAI API
- **Payments**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/e1washere/ai-content-gen.git
cd ai-content-gen
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your environment variables in `.env.local`

5. Run the development server:
```bash
npm run dev
```

## Environment Configuration

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## Database Setup

Execute the following SQL commands in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscription_status TEXT DEFAULT 'free',
  credits_remaining INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated content table
CREATE TABLE public.generated_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  input_data JSONB NOT NULL,
  generated_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own content" ON public.generated_content
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content" ON public.generated_content
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Configure environment variables in the Vercel dashboard

## API Documentation

### Content Generation Endpoint

```typescript
POST /api/generate
Content-Type: application/json
Authorization: Bearer <token>

{
  "productName": "Bamboo Toothbrush",
  "productCategory": "Personal Care",
  "keyFeatures": ["biodegradable", "sustainable", "vegan"],
  "targetAudience": "eco-conscious consumers",
  "contentType": "product_description"
}
```

### Response Format

```typescript
{
  "content": "Generated content string...",
  "success": true
}
```

## Subscription Plans

| Plan | Price | Credits | Features |
|------|-------|---------|----------|
| Free | €0 | 5/month | Basic templates |
| Basic | €19 | 100/month | All templates, Priority support |
| Premium | €39 | 500/month | API access, Analytics |
| Pro | €79 | 2000/month | White-label, Custom integrations |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For technical support and business inquiries:
- Email: support@ecocontent.ai
- Documentation: [docs.ecocontent.ai](https://docs.ecocontent.ai)

---

Built with modern web technologies for the sustainable future of e-commerce.
