# 🚀 Zenttry - Sistema de Controle de Acesso

Um sistema completo e moderno de controle de acesso desenvolvido em **HTML**, **CSS** e **JavaScript ES6+** para gerenciar pessoas, LABs e permissões de acesso.

## ✨ Características

- **Interface Moderna**: Design responsivo com paleta de cores personalizada (#22c58f)
- **JavaScript ES6+**: Código moderno e organizado usando classes e async/await
- **Página Inicial Interativa**: Estatísticas em tempo real e gráficos de acesso
- **Gerenciamento de Pessoas**: CRUD completo para usuários do sistema
- **Gerenciamento de LABs**: Configuração de laboratórios e equipamentos
- **Controle de Acesso**: Sistema de permissões granular
- **Logs de Acesso**: Histórico completo de todas as tentativas de acesso
- **Persistência Local**: Dados salvos no localStorage do navegador
- **Notificações**: Sistema de alertas visuais para feedback do usuário
- **Atalhos de Teclado**: Navegação rápida com Ctrl+K e ESC

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com CSS Grid, Flexbox e animações
- **JavaScript ES6+**: Classes, módulos, async/await, localStorage
- **Fontes**: Inter, Poppins, Roboto, Playfair Display, Montserrat

## 🚀 Como Executar

### Opção 1: Servidor Local (Recomendado)
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Ou usar serve
npm start
```

### Opção 2: Abrir Diretamente
```bash
# Simplesmente abrir o index.html no navegador
# (Algumas funcionalidades podem não funcionar devido a restrições CORS)
```

### Opção 3: Live Server (VS Code)
- Instale a extensão "Live Server" no VS Code
- Clique com botão direito no `index.html`
- Selecione "Open with Live Server"

## 🔐 Credenciais de Acesso

- **Usuário**: `admin`
- **Senha**: `admin123`

## 📱 Funcionalidades

### 🏠 Página Inicial
- Visão geral do sistema
- Estatísticas em tempo real
- Gráfico de acessos dos últimos 7 dias
- Ações rápidas para principais funcionalidades

### 👥 Gerenciar Pessoas
- Lista de pessoas cadastradas
- Adicionar novas pessoas
- Editar informações existentes
- Excluir pessoas
- Busca e filtros
- Exportação para CSV

### 🏢 Gerenciar LABs
- Lista de laboratórios
- Configuração de localização
- Capacidade e equipamentos
- Status ativo/inativo

### 📋 Logs de Acesso
- Histórico completo de acessos
- Filtros por status, data e pessoa
- Detalhes de cada tentativa

### 🔑 Controle de Acesso
- Configuração de permissões
- Toggles para permitir/negar acesso
- Controle granular por pessoa

## 🎨 Paleta de Cores

- **Cor Principal**: `#22c58f` (Verde-azulado)
- **Cor Secundária**: `#1ea085` (Verde mais escuro)
- **Cor Terciária**: `#1a8f7a` (Verde ainda mais escuro)
- **Sombras**: `rgba(34, 197, 143, 0.3)` (Com transparência)

## ⌨️ Atalhos de Teclado

- **Ctrl + K**: Busca rápida
- **ESC**: Fechar modais e sidebar
- **Enter**: Submeter formulários

## 📁 Estrutura do Projeto

```
zenttry/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript principal
├── package.json        # Configurações do projeto
├── README.md           # Documentação
└── demo.html           # Página de demonstração
```

## 🔧 Configuração

### Personalizar Cores
As cores podem ser facilmente alteradas editando as variáveis CSS no arquivo `styles.css`:

```css
/* Exemplo de personalização */
:root {
    --primary-color: #22c58f;
    --secondary-color: #1ea085;
    --accent-color: #1a8f7a;
}
```

### Adicionar Novos LABs
```javascript
// No console do navegador
zenttry.labs.push({
    id: Date.now(),
    name: 'Novo LAB',
    location: 'Localização',
    capacity: 25,
    equipment: ['Equipamento 1', 'Equipamento 2'],
    status: 'active',
    createdAt: new Date().toISOString()
});
zenttry.saveData('labs');
```

## 🚧 Funcionalidades Futuras

- [ ] Autenticação com múltiplos usuários
- [ ] Sincronização com banco de dados
- [ ] Relatórios avançados
- [ ] Integração com sistemas de controle de acesso físicos
- [ ] API REST para integrações
- [ ] Sistema de backup e restauração
- [ ] Logs em tempo real via WebSocket

## 🐛 Solução de Problemas

### Dados não persistem
- Verifique se o localStorage está habilitado no navegador
- Limpe o cache e cookies se necessário

### Interface não carrega
- Verifique o console do navegador para erros JavaScript
- Certifique-se de que todos os arquivos estão na mesma pasta

### Funcionalidades não funcionam
- Verifique se está logado como admin
- Recarregue a página e tente novamente

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

- Abra uma issue no GitHub
- Verifique a documentação
- Consulte o console do navegador para erros

---

**Desenvolvido com ❤️ usando tecnologias web modernas**
