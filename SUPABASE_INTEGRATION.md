# Guia de Integração com Supabase

Este guia descreve como integrar a aplicação AutoMatch com Supabase para adicionar persistência de dados real, autenticação e outras funcionalidades backend.

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase
3. Credenciais do projeto (URL e anon key)

## 🗄️ Configuração do Banco de Dados

### 1. Criar as Tabelas

Execute os seguintes comandos SQL no editor SQL do Supabase:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Classifier table
CREATE TABLE classifier (
  id SERIAL PRIMARY KEY,
  type VARCHAR NOT NULL,
  value VARCHAR NOT NULL,
  description VARCHAR,
  UNIQUE(type, value)
);

-- Addresses table
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  street VARCHAR,
  number VARCHAR,
  neighborhood VARCHAR,
  city VARCHAR,
  state VARCHAR,
  zip_code VARCHAR,
  country VARCHAR DEFAULT 'Brasil',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phone VARCHAR,
  user_type_id INTEGER REFERENCES classifier(id),
  is_active BOOLEAN DEFAULT true,
  profile_image_url VARCHAR,
  address_id UUID REFERENCES addresses(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Instructors table
CREATE TABLE instructors (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  hourly_rate DECIMAL(10,2) NOT NULL,
  bio TEXT,
  years_experience INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- User documents table
CREATE TABLE user_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_type_id INTEGER NOT NULL REFERENCES classifier(id),
  document_number VARCHAR NOT NULL,
  document_image_url VARCHAR NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  is_verified BOOLEAN DEFAULT false,
  verified_by_user_id UUID REFERENCES users(id),
  verified_at TIMESTAMP,
  verification_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  UNIQUE(user_id, document_type_id),
  UNIQUE(document_number)
);

CREATE INDEX idx_user_documents_user_id ON user_documents(user_id);
CREATE INDEX idx_user_documents_verified ON user_documents(is_verified);

-- Instructor license types
CREATE TABLE instructor_license_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instructor_id UUID REFERENCES instructors(user_id) ON DELETE CASCADE,
  license_type_id INTEGER REFERENCES classifier(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(instructor_id, license_type_id)
);

-- Vehicles table
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instructor_id UUID NOT NULL REFERENCES instructors(user_id) ON DELETE CASCADE,
  license_plate VARCHAR UNIQUE NOT NULL,
  model VARCHAR NOT NULL,
  brand VARCHAR,
  year INTEGER,
  color VARCHAR,
  vehicle_image_url VARCHAR,
  transmission_type_id INTEGER REFERENCES classifier(id),
  category_id INTEGER REFERENCES classifier(id),
  has_dual_controls BOOLEAN DEFAULT true,
  has_air_conditioning BOOLEAN DEFAULT true,
  is_approved BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  last_maintenance_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_vehicles_instructor ON vehicles(instructor_id);
CREATE INDEX idx_vehicles_available ON vehicles(is_available);

-- Lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instructor_id UUID REFERENCES instructors(user_id),
  student_id UUID REFERENCES users(id),
  vehicle_id UUID REFERENCES vehicles(id),
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INTEGER NOT NULL,
  status_id INTEGER REFERENCES classifier(id),
  address_id UUID REFERENCES addresses(id),
  price DECIMAL(10,2),
  payment_status_id INTEGER REFERENCES classifier(id),
  payment_method_id INTEGER REFERENCES classifier(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID UNIQUE REFERENCES lessons(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Instructor availability
CREATE TABLE instructor_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instructor_id UUID REFERENCES instructors(user_id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  CHECK (start_time < end_time)
);

-- Student favorites
CREATE TABLE student_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES instructors(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, instructor_id)
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID UNIQUE REFERENCES lessons(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  status_id INTEGER REFERENCES classifier(id),
  payment_method_id INTEGER REFERENCES classifier(id),
  transaction_id VARCHAR UNIQUE,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);
```

### 2. Popular Dados Iniciais (Classifier)

```sql
-- User types
INSERT INTO classifier (type, value, description) VALUES
  ('USER_TYPE', 'STUDENT', 'Aluno'),
  ('USER_TYPE', 'INSTRUCTOR', 'Instrutor');

-- Lesson status
INSERT INTO classifier (type, value, description) VALUES
  ('LESSON_STATUS', 'SCHEDULED', 'Agendada'),
  ('LESSON_STATUS', 'COMPLETED', 'Concluída'),
  ('LESSON_STATUS', 'CANCELLED', 'Cancelada');

-- License types
INSERT INTO classifier (type, value, description) VALUES
  ('LICENSE_TYPE', 'A', 'Categoria A - Motocicleta'),
  ('LICENSE_TYPE', 'B', 'Categoria B - Automóvel'),
  ('LICENSE_TYPE', 'C', 'Categoria C - Caminhão'),
  ('LICENSE_TYPE', 'D', 'Categoria D - Ônibus'),
  ('LICENSE_TYPE', 'E', 'Categoria E - Combinação');

-- Vehicle transmission
INSERT INTO classifier (type, value, description) VALUES
  ('VEHICLE_TRANSMISSION', 'MANUAL', 'Manual'),
  ('VEHICLE_TRANSMISSION', 'AUTOMATIC', 'Automático');

-- Vehicle category
INSERT INTO classifier (type, value, description) VALUES
  ('VEHICLE_CATEGORY', 'HATCH', 'Hatch'),
  ('VEHICLE_CATEGORY', 'SEDAN', 'Sedan'),
  ('VEHICLE_CATEGORY', 'SUV', 'SUV');

-- Payment status
INSERT INTO classifier (type, value, description) VALUES
  ('PAYMENT_STATUS', 'PENDING', 'Pendente'),
  ('PAYMENT_STATUS', 'PAID', 'Pago'),
  ('PAYMENT_STATUS', 'REFUNDED', 'Reembolsado');

-- Payment method
INSERT INTO classifier (type, value, description) VALUES
  ('PAYMENT_METHOD', 'PIX', 'PIX'),
  ('PAYMENT_METHOD', 'CREDIT_CARD', 'Cartão de Crédito'),
  ('PAYMENT_METHOD', 'DEBIT_CARD', 'Cartão de Débito'),
  ('PAYMENT_METHOD', 'CASH', 'Dinheiro');

-- Document types
INSERT INTO classifier (type, value, description) VALUES
  ('DOCUMENT_TYPE', 'CPF', 'CPF'),
  ('DOCUMENT_TYPE', 'RG', 'RG'),
  ('DOCUMENT_TYPE', 'CNH', 'Carteira de Habilitação');
```

### 3. Configurar Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Instructors policies
CREATE POLICY "Anyone can view verified instructors" ON instructors
  FOR SELECT USING (is_verified = true);

CREATE POLICY "Instructors can update their own data" ON instructors
  FOR UPDATE USING (auth.uid() = user_id);

-- Lessons policies
CREATE POLICY "Users can view their own lessons" ON lessons
  FOR SELECT USING (
    auth.uid() = student_id OR 
    auth.uid() = instructor_id
  );

CREATE POLICY "Students can create lessons" ON lessons
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Students can create reviews for their lessons" ON lessons
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM lessons 
      WHERE lessons.id = lesson_id 
      AND lessons.student_id = auth.uid()
    )
  );
```

## 🔧 Instalação do Cliente Supabase

```bash
npm install @supabase/supabase-js
```

## 📝 Configuração no Código

### 1. Criar arquivo de configuração

Crie `/src/app/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2. Criar arquivo .env

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Atualizar AuthContext

```typescript
// Exemplo de login real
const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Buscar dados do usuário
  const { data: userData } = await supabase
    .from('users')
    .select('*, instructors(*)')
    .eq('id', data.user.id)
    .single();
    
  setUser(userData);
  setIsAuthenticated(true);
};
```

## 🔒 Funcionalidades de Segurança

1. **Autenticação de Email**: Use `supabase.auth.signUp()`
2. **Magic Links**: Use `supabase.auth.signInWithOtp()`
3. **OAuth**: Google, Facebook, etc.
4. **Verificação de Email**: Configurar no painel do Supabase
5. **Reset de Senha**: Use `supabase.auth.resetPasswordForEmail()`

## 📸 Upload de Imagens

```typescript
const uploadImage = async (file: File, bucket: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);
    
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);
    
  return publicUrl;
};
```

## 🔄 Realtime (Opcional)

```typescript
// Escutar mudanças em tempo real
supabase
  .channel('lessons')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'lessons' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();
```

## 📊 Queries Úteis

### Buscar Instrutores

```typescript
const { data: instructors } = await supabase
  .from('instructors')
  .select(`
    *,
    users (
      full_name,
      email,
      phone,
      profile_image_url,
      addresses (*)
    ),
    vehicles (*),
    instructor_license_types (
      license_type:classifier (value, description)
    )
  `)
  .eq('is_verified', true)
  .order('average_rating', { ascending: false });
```

### Criar Aula

```typescript
const { data, error } = await supabase
  .from('lessons')
  .insert({
    instructor_id: instructorId,
    student_id: studentId,
    vehicle_id: vehicleId,
    scheduled_at: scheduledAt,
    duration_minutes: durationMinutes,
    status_id: statusId,
    price: price
  });
```

## 🎯 Próximos Passos

1. Implementar autenticação real
2. Substituir dados mock por queries reais
3. Adicionar upload de imagens
4. Implementar notificações
5. Adicionar sistema de pagamento (Stripe)
6. Implementar chat em tempo real
7. Adicionar analytics

---

**Nota**: Este é um guia básico. Para produção, considere:
- Implementar rate limiting
- Adicionar logging
- Configurar backups automáticos
- Implementar testes
- Adicionar monitoramento
- Configurar CI/CD
