# 🌱 EcoContent AI - Generator treści AI dla produktów ekologicznych

![EcoContent AI Banner](https://via.placeholder.com/1200x400/22c55e/ffffff?text=EcoContent+AI)

## 🚀 Opis projektu

**EcoContent AI** to pierwszy w Polsce generator treści AI specjalnie zaprojektowany dla firm ekologicznych. Aplikacja wykorzystuje sztuczną inteligencję do tworzenia profesjonalnych opisów produktów, postów na social media i artykułów blogowych w języku polskim.

### 💡 Dlaczego EcoContent AI?

- **Specjalizacja w ekologii** - Szablony i prompty dostosowane do produktów ekologicznych
- **Polski rynek** - Treści generowane w języku polskim, dostosowane do lokalnego rynku
- **Oszczędność czasu** - Generowanie treści w sekundach zamiast godzin
- **Wysoka jakość** - Treści SEO-friendly i optymalizowane pod konwersję
- **Łatwe monetyzowanie** - Gotowy system płatności i subskrypcji

## 🛠️ Stos technologiczny

- **Frontend/Backend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Baza danych**: Supabase (PostgreSQL)
- **Autentykacja**: Supabase Auth
- **AI**: OpenAI API (GPT-3.5-turbo)
- **Płatności**: Stripe
- **Hosting**: Vercel
- **Język**: TypeScript

## 🎯 Funkcje

### ✅ Zaimplementowane
- ✅ Autentykacja użytkowników (email/password + Google OAuth)
- ✅ Generator treści AI w 3 kategoriach:
  - Opisy produktów
  - Posty na social media
  - Artykuły blogowe
- ✅ Piękny, responsywny interfejs
- ✅ System płatności Stripe
- ✅ 4 plany cenowe (Free, Basic, Premium, Pro)
- ✅ Historia generowanych treści
- ✅ Kopiowanie i pobieranie treści
- ✅ Specjalizacja w produktach ekologicznych

### 🔄 Do zaimplementowania
- [ ] Dashboard z analitykami
- [ ] API dla integracji zewnętrznych
- [ ] Bulk generowanie treści
- [ ] Eksport do różnych formatów
- [ ] Integracja z platformami e-commerce
- [ ] System rekomendacji

## 🚀 Szybki start

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/e1washere/ai-content-gen.git
cd ai-content-gen
```

### 2. Instalacja zależności
```bash
npm install
```

### 3. Konfiguracja zmiennych środowiskowych
Skopiuj `.env.local.example` do `.env.local` i wypełnij:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Konfiguracja Supabase

1. Utwórz projekt na [supabase.com](https://supabase.com)
2. Wykonaj migracje bazy danych:

```sql
-- Tabela użytkowników (rozszerzona)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscription_status TEXT DEFAULT 'free',
  credits_remaining INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela wygenerowanych treści
CREATE TABLE public.generated_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('product_description', 'social_media', 'blog_post')),
  input_data JSONB NOT NULL,
  generated_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indeksy
CREATE INDEX idx_generated_content_user_id ON public.generated_content(user_id);
CREATE INDEX idx_generated_content_created_at ON public.generated_content(created_at);

-- RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;

-- Polityki RLS
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own content" ON public.generated_content
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content" ON public.generated_content
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 5. Konfiguracja Stripe

1. Utwórz konto na [stripe.com](https://stripe.com)
2. Stwórz produkty i ceny dla planów:
   - Basic: 49 PLN/miesiąc
   - Premium: 99 PLN/miesiąc
   - Pro: 199 PLN/miesiąc
3. Zaktualizuj `PRICE_IDS` w `lib/stripe.ts`

### 6. Uruchomienie aplikacji
```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`

## 🌐 Deployment na Vercel

### 1. Automatyczne wdrożenie
```bash
# Zaloguj się do Vercel
npx vercel login

# Wdróż aplikację
npx vercel --prod
```

### 2. Konfiguracja zmiennych środowiskowych
W panelu Vercel dodaj wszystkie zmienne z `.env.local`

### 3. Konfiguracja domeny
1. Dodaj domenę w panelu Vercel
2. Skonfiguruj DNS
3. Zaktualizuj `NEXT_PUBLIC_APP_URL`

## 💰 Strategia monetyzacji

### Plany cenowe

| Plan | Cena | Kredyty | Funkcje |
|------|------|---------|---------|
| **Free** | 0 zł | 5/miesiąc | Podstawowe szablony, Email support |
| **Basic** | 49 zł | 100/miesiąc | Wszystkie szablony, Priority support, Historia |
| **Premium** | 99 zł | 500/miesiąc | API dostęp, Bulk generowanie, Dedykowane wsparcie |
| **Pro** | 199 zł | 2000/miesiąc | White-label, Dedykowany manager |

### Przewidywane przychody

- **Miesiąc 1-3**: 10-50 użytkowników → 1,000-5,000 zł/miesiąc
- **Miesiąc 4-6**: 50-200 użytkowników → 5,000-20,000 zł/miesiąc
- **Miesiąc 7-12**: 200-1000 użytkowników → 20,000-100,000 zł/miesiąc

### Strategia pozyskiwania klientów

1. **Freelance platforms** (Upwork, Fiverr)
2. **LinkedIn outreach** do firm ekologicznych
3. **Content marketing** (blog, SEO)
4. **Partnerstwa** z agencjami marketingowymi
5. **Targi ekologiczne** i wydarzenia branżowe

## 📈 Marketing i sprzedaż

### Grupa docelowa
- Małe i średnie firmy ekologiczne
- Sklepy internetowe z produktami eco
- Agencje marketingowe
- Freelancerzy i copywriterzy
- Blogerzy lifestyle

### Kanały sprzedaży
1. **Bezpośrednia sprzedaż** przez stronę
2. **Partnerstwa B2B** z agencjami
3. **Marketplace** (jako usługa)
4. **White-label** dla większych firm

### Materiały marketingowe

#### Cold email template:
```
Temat: Zwiększ sprzedaż produktów eko o 40% dzięki AI

Cześć [Imię],

Widzę, że [Nazwa firmy] oferuje świetne produkty ekologiczne. 

Czy wiesz, że 73% klientów kupuje produkty eko na podstawie opisu?

Stworzałem EcoContent AI - pierwszą w Polsce platformę do generowania treści AI specjalnie dla firm ekologicznych.

Nasi klienci zwiększają sprzedaż średnio o 40% dzięki lepszym opisom produktów.

Chcesz zobaczyć demo? Odpowiedz na tego maila.

Pozdrawiam,
[Twoje imię]
```

#### LinkedIn outreach:
```
Cześć [Imię]! 

Widzę, że zajmujesz się marketingiem produktów ekologicznych w [Firma]. 

Czy zmagasz się z tworzeniem angażujących opisów produktów eko?

Stworzałem narzędzie AI, które generuje profesjonalne treści w języku polskim specjalnie dla branży ekologicznej.

Może być przydatne dla [Firma] - chcesz zobaczyć demo?
```

## 🔧 Rozwój i wsparcie

### Roadmapa funkcji
- **Q1 2024**: API, integracje e-commerce
- **Q2 2024**: Bulk generowanie, analytics
- **Q3 2024**: Mobile app, white-label
- **Q4 2024**: AI asystent, automatyzacja

### Wsparcie techniczne
- **Email**: support@ecocontent.ai
- **Discord**: [Link do serwera]
- **Dokumentacja**: [Link do docs]

## 📊 Metryki sukcesu

### KPI do śledzenia
- **MRR** (Monthly Recurring Revenue)
- **Churn rate** (wskaźnik rezygnacji)
- **CAC** (Customer Acquisition Cost)
- **LTV** (Lifetime Value)
- **Conversion rate** (konwersja free → paid)

### Narzędzia analityczne
- Google Analytics 4
- Stripe Dashboard
- Supabase Analytics
- Mixpanel (opcjonalnie)

## 🤝 Wkład w projekt

1. Fork repozytorium
2. Stwórz branch funkcji (`git checkout -b feature/AmazingFeature`)
3. Commit zmian (`git commit -m 'Add some AmazingFeature'`)
4. Push do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📄 Licencja

Ten projekt jest objęty licencją MIT. Zobacz plik `LICENSE` dla szczegółów.

## 🙏 Podziękowania

- [OpenAI](https://openai.com) za API
- [Supabase](https://supabase.com) za backend
- [Vercel](https://vercel.com) za hosting
- [Stripe](https://stripe.com) za płatności

---

**Stworzone z ❤️ dla polskich firm ekologicznych**

[🌐 Demo](https://ecocontent-ai.vercel.app) | [📧 Kontakt](mailto:contact@ecocontent.ai) | [💬 Discord](https://discord.gg/ecocontent)
