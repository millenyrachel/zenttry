# 🚀 Zenttry - Sistema de Controle de Acesso para LABs

Um sistema completo e moderno de controle de acesso desenvolvido em HTML, CSS e JavaScript para gerenciar pessoas, LABs e permissões de acesso.

## ✨ Funcionalidades

### 👥 Gerenciamento de Pessoas
- **Criar, editar e excluir pessoas**
- **Definir acessos** às portas de cada LAB
- Cadastro com nome, documento e senha/PIN

### 🏢 Gerenciamento de LABs
- **Criar, editar e excluir LABs**
- **Associar portas/fechaduras** a cada LAB
- **Visualizar logs de acesso** de cada LAB

### 🔑 Controle de Acesso
- **Permitir ou negar entrada** com base nas permissões
- **Registrar logs de acesso** (quem entrou, quando e em qual LAB)
- Sistema de autenticação por senha/PIN

### 👨‍💼 Administração
- **Apenas usuários autorizados** podem gerenciar o sistema
- Interface intuitiva e responsiva
- Dados persistidos no localStorage

## 🚀 Como Usar

### 1. Acesso ao Sistema
- **Usuário:** `admin`
- **Senha:** `admin123`

### 2. Dashboard Principal
Após o login, você terá acesso a 4 módulos principais:

#### 👥 Gerenciar Pessoas
- Visualizar lista de pessoas cadastradas
- Adicionar novas pessoas
- Editar informações existentes
- Excluir pessoas
- Gerenciar permissões de acesso por LAB

#### 🏢 Gerenciar LABs
- Visualizar lista de LABs cadastrados
- Adicionar novos LABs
- Editar informações existentes
- Excluir LABs
- Visualizar logs de acesso específicos

#### 📊 Logs de Acesso
- Visualizar todos os registros de acesso
- Filtrar por pessoa, data e status
- Histórico completo de tentativas de acesso

#### 🔑 Controle de Acesso
- Testar o sistema em tempo real
- Simular tentativas de acesso
- Verificar permissões e autenticação

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos e responsivos com Glass Morphism
- **JavaScript ES6+** - Lógica de negócio orientada a objetos
- **LocalStorage** - Persistência de dados
- **CSS Grid & Flexbox** - Layout responsivo
- **Fontes Modernas** - Inter e Poppins para tipografia elegante

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Smartphone

## 🔧 Estrutura do Projeto

```
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Documentação
```

## 📊 Dados de Exemplo

O sistema vem com dados de exemplo pré-cadastrados:

### Pessoas
- João Silva (123.456.789-00) - Senha: 1234
- Maria Santos (987.654.321-00) - Senha: 5678
- Pedro Costa (456.789.123-00) - Senha: 9012

### LABs
- LAB de Informática (Porta A-101)
- LAB de Eletrônica (Porta B-205)
- LAB de Mecatrônica (Porta C-310)

### Permissões
- João: Acesso aos LABs 1 e 2
- Maria: Acesso aos LABs 1 e 3
- Pedro: Acesso aos LABs 2 e 3

## 🚀 Instalação e Uso

1. **Baixe os arquivos** para uma pasta
2. **Abra o `index.html`** em um navegador moderno
3. **Faça login** com as credenciais: admin / admin123
4. **Explore as funcionalidades** do sistema

## 🔒 Segurança

- **Autenticação obrigatória** para acesso ao sistema
- **Validação de permissões** antes de conceder acesso
- **Logs detalhados** de todas as tentativas de acesso
- **Senhas criptografadas** (em produção, usar hash)

## 📈 Funcionalidades Futuras

- [ ] Integração com banco de dados
- [ ] Sistema de usuários com diferentes níveis de acesso
- [ ] Relatórios e estatísticas
- [ ] Notificações em tempo real
- [ ] API REST para integração
- [ ] Sistema de backup automático

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma issue no repositório
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ pela Zenttry para controle de acesso em laboratórios**
