# AutoEscola Pro - Documentação Técnica

## 📊 Visão Geral da Arquitetura

### Estrutura de Pastas
```
src/app/
├── components/          # Componentes reutilizáveis da UI
├── pages/              # Páginas completas da aplicação
├── contexts/           # Context API para gerenciamento de estado
├── hooks/              # Custom React hooks
├── types/              # Definições TypeScript
├── utils/              # Funções utilitárias
├── data/               # Dados mock para demonstração
└── App.tsx             # Componente raiz da aplicação
```

## 🎨 Componentes Criados

### Layout
- **Header** - Navegação principal responsiva com menu mobile
- **Footer** - Rodapé com links e informações de contato
- **DemoSwitcher** - Alternador entre visualização de aluno e instrutor

### Cartões (Cards)
- **InstructorCard** - Exibe informações do instrutor
- **VehicleCard** - Mostra detalhes do veículo
- **LessonCard** - Apresenta aula agendada com ações
- **StatCard** - Card de estatística reutilizável

### Utilitários
- **LoadingSpinner** - Indicador de carregamento
- **EmptyState** - Estado vazio com call-to-action

## 📄 Páginas Implementadas

1. **HomePage** - Landing page com apresentação do serviço
2. **LoginPage** - Autenticação com demo rápido
3. **StudentDashboard** - Dashboard do aluno com progresso
4. **InstructorDashboard** - Dashboard do instrutor com estatísticas
5. **SearchInstructors** - Busca e filtros de instrutores
6. **BookLessonPage** - Agendamento de aulas completo

## 🔧 Contextos

### AuthContext
Gerencia autenticação e dados do usuário:
- `user` - Dados do usuário atual
- `isAuthenticated` - Status de autenticação
- `isInstructor` - Tipo de usuário
- `login()` - Função de login
- `logout()` - Função de logout
- `switchToInstructor()` / `switchToStudent()` - Demo

### NotificationContext
Sistema de notificações toast:
- `success()` - Notificação de sucesso
- `error()` - Notificação de erro
- `warning()` - Notificação de aviso
- `info()` - Notificação informativa

## 🎣 Custom Hooks

- **useLocalStorage** - Persistência em localStorage
- **useDebounce** - Debounce para inputs de busca

## 🛠 Utilitários

### Formatadores (formatters.ts)
- `formatCurrency()` - Formata valores monetários
- `formatPhone()` - Formata números de telefone
- `formatDate()` - Formata datas
- `formatTime()` - Formata horários

### Validadores (validators.ts)
- `validateEmail()` - Valida email
- `validatePhone()` - Valida telefone
- `validateCPF()` - Valida CPF
- `validateCNH()` - Valida CNH
- `validateLicensePlate()` - Valida placa de veículo
- `validatePassword()` - Valida senha com requisitos

## 📱 Responsividade

A aplicação usa breakpoints do Tailwind CSS:
- **Mobile**: < 768px
- **Tablet**: >= 768px
- **Desktop**: >= 1024px

Todos os componentes são totalmente responsivos.

## 🎨 Sistema de Design

### Cores Principais
- **Primary**: Blue 600 (#2563eb)
- **Success**: Green 600 (#16a34a)
- **Error**: Red 600 (#dc2626)
- **Warning**: Yellow 600 (#ca8a04)

### Tipografia
Usando classes Tailwind padrão com customizações em `/src/styles/theme.css`

## 🔒 Segurança

### Implementações Atuais
- Validação de inputs no frontend
- Sanitização básica de dados
- Proteção de rotas autenticadas

### Recomendações para Produção
- [ ] Implementar autenticação JWT real
- [ ] Adicionar CSRF protection
- [ ] Rate limiting nas APIs
- [ ] Validação server-side
- [ ] Criptografia de dados sensíveis
- [ ] HTTPS obrigatório
- [ ] Sanitização avançada (XSS protection)

## 📊 Modelo de Dados

O sistema segue o MER fornecido com as seguintes entidades principais:

### Tabelas Principais
- **users** - Usuários do sistema
- **instructors** - Dados específicos de instrutores
- **vehicles** - Veículos dos instrutores
- **lessons** - Aulas agendadas
- **reviews** - Avaliações
- **addresses** - Endereços
- **classifier** - Tabela de classificação

### Relacionamentos
- Um usuário pode ser instrutor
- Um instrutor pode ter vários veículos
- Uma aula relaciona aluno, instrutor e veículo
- Uma aula pode ter uma avaliação

## 🚀 Performance

### Otimizações Implementadas
- Lazy loading de imagens
- Componentes React otimizados
- Memoização com useMemo/useCallback (onde necessário)
- Code splitting por rota

### Melhorias Futuras
- [ ] Implementar React.lazy() para code splitting
- [ ] Virtual scrolling para listas longas
- [ ] Service Worker para cache
- [ ] Optimistic UI updates
- [ ] Image optimization (WebP, etc)

## 🧪 Testes (Recomendado)

### Ferramentas Sugeridas
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Cypress ou Playwright
- **Component Tests**: Storybook

### Áreas Críticas para Teste
1. Fluxo de autenticação
2. Agendamento de aulas
3. Sistema de pagamento
4. Validações de formulário
5. Responsividade mobile

## 📈 Analytics (Futuro)

### Métricas Recomendadas
- Taxa de conversão (cadastro → agendamento)
- Tempo médio de agendamento
- Taxa de cancelamento
- Avaliação média por instrutor
- Tempo de sessão
- Páginas mais visitadas

## 🌐 SEO (Futuro)

### Melhorias Recomendadas
- [ ] Meta tags dinâmicas
- [ ] Open Graph para redes sociais
- [ ] Sitemap XML
- [ ] Schema.org markup
- [ ] Server-side rendering (Next.js)
- [ ] URLs semânticas

## 🔄 CI/CD (Futuro)

### Pipeline Sugerido
1. **Commit** → Lint + Type check
2. **PR** → Tests + Build
3. **Merge** → Deploy para staging
4. **Tag** → Deploy para produção

### Ferramentas Sugeridas
- GitHub Actions
- Vercel / Netlify
- Sentry (Error tracking)

## 📝 Convenções de Código

### Nomenclatura
- **Componentes**: PascalCase (ex: `InstructorCard`)
- **Funções**: camelCase (ex: `handleSubmit`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `API_URL`)
- **Interfaces**: PascalCase com I prefix opcional

### Estrutura de Arquivos
- Um componente por arquivo
- Arquivos de tipos separados
- Utils agrupados por funcionalidade

## 🐛 Troubleshooting

### Problemas Comuns

**Erro: date-fns locale não funciona**
```typescript
import { ptBR } from 'date-fns/locale';
// Use: locale: ptBR nas funções de formatação
```

**Erro: Imagens não carregam**
- Verifique se o Unsplash está acessível
- Use fallback images

**Erro: Context não encontrado**
- Verifique se o Provider está envolvendo o componente
- Verifique a ordem dos Providers no App.tsx

## 📞 Suporte

Para questões técnicas:
- Consulte a documentação do React
- Veja exemplos no código existente
- Consulte o guia de integração Supabase

---

**Versão**: 1.0.0  
**Última atualização**: Janeiro 2026  
**Mantido por**: Equipe AutoEscola Pro
