# AutoEscola Pro - Sistema de Gestão de Autoescola

Uma aplicação web moderna e responsiva para conectar alunos e instrutores de direção, desenvolvida com React, TypeScript e Tailwind CSS.

## 🚗 Sobre o Projeto

AutoEscola Pro é uma plataforma completa que facilita o agendamento de aulas de direção, permitindo que alunos encontrem instrutores qualificados e gerenciem suas aulas de forma prática e segura.

## ✨ Funcionalidades

### Para Alunos
- 📱 Dashboard personalizado com visão geral do progresso
- 🔍 Busca e filtragem de instrutores por categoria, avaliação e preço
- 📅 Agendamento de aulas com seleção de data, horário e veículo
- ⭐ Sistema de avaliações e comentários
- ❤️ Lista de instrutores favoritos
- 📊 Acompanhamento de progresso e horas de prática
- 💳 Gestão de pagamentos

### Para Instrutores
- 📊 Dashboard com estatísticas e ganhos mensais
- 📅 Gestão de agenda e disponibilidade
- 🚗 Gerenciamento de veículos
- 👥 Visualização de alunos ativos
- ⭐ Acompanhamento de avaliações

## 🛠 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS utilitário
- **Lucide React** - Ícones modernos
- **date-fns** - Manipulação de datas
- **Context API** - Gerenciamento de estado global

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.tsx       # Navegação principal
│   │   ├── Footer.tsx       # Rodapé
│   │   ├── InstructorCard.tsx
│   │   ├── VehicleCard.tsx
│   │   ├── LessonCard.tsx
│   │   └── ...
│   ├── pages/               # Páginas da aplicação
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── StudentDashboard.tsx
│   │   ├── InstructorDashboard.tsx
│   │   ├── SearchInstructors.tsx
│   │   └── BookLessonPage.tsx
│   ├── contexts/            # Contextos React
│   │   └── AuthContext.tsx
│   ├── types/               # Definições TypeScript
│   │   └── index.ts
│   ├── data/                # Dados mock
│   │   └── mockData.ts
│   ├── utils/               # Funções utilitárias
│   │   └── formatters.ts
│   └── App.tsx              # Componente principal
└── styles/                  # Estilos globais
    └── theme.css
```

## 🎨 Componentes Principais

### Components
- **Header** - Navegação responsiva com menu mobile
- **Footer** - Rodapé com links e informações
- **InstructorCard** - Card de apresentação de instrutor
- **VehicleCard** - Card de veículo com especificações
- **LessonCard** - Card de aula com detalhes e ações
- **StatCard** - Card de estatísticas
- **EmptyState** - Estado vazio com ação
- **LoadingSpinner** - Indicador de carregamento

### Pages
- **HomePage** - Landing page com apresentação
- **LoginPage** - Autenticação com demo rápida
- **StudentDashboard** - Dashboard do aluno
- **InstructorDashboard** - Dashboard do instrutor
- **SearchInstructors** - Busca e filtros de instrutores
- **BookLessonPage** - Agendamento de aulas

## 🔐 Autenticação

O sistema possui um mock de autenticação para demonstração:

**Acesso como Aluno:**
- Email: `aluno@email.com`
- Senha: qualquer

**Acesso como Instrutor:**
- Email: `instrutor@email.com`
- Senha: qualquer

## 📱 Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🎯 Modelo de Dados

O projeto segue o MER (Modelo Entidade-Relacionamento) fornecido, incluindo:

- **Users** - Usuários (alunos e instrutores)
- **Instructors** - Detalhes de instrutores
- **Vehicles** - Veículos dos instrutores
- **Lessons** - Aulas agendadas
- **Reviews** - Avaliações
- **Addresses** - Endereços
- **Classifier** - Tabela de classificação para tipos

## 🚀 Próximos Passos

Para integração com Supabase (backend real):

1. Sistema de autenticação real
2. Persistência de dados no banco
3. Upload de imagens (perfil, documentos, veículos)
4. Notificações em tempo real
5. Sistema de pagamento integrado
6. Chat entre aluno e instrutor
7. Verificação de documentos

## 💡 Boas Práticas Implementadas

- ✅ Componentização adequada
- ✅ Tipagem TypeScript forte
- ✅ Código limpo e organizado
- ✅ Separação de responsabilidades
- ✅ Reutilização de componentes
- ✅ Design system consistente
- ✅ Acessibilidade básica
- ✅ Performance otimizada

## 📝 Notas de Desenvolvimento

- Os dados são mockados para demonstração
- As imagens são obtidas via Unsplash
- O sistema de autenticação é simulado
- Pronto para integração com backend real (Supabase recomendado)

---

Desenvolvido com ❤️ para AutoEscola Pro
