# 🎨 Personalização do Logo Zenttry

## Como Personalizar o Logo do Sistema

### 1. **Substituir o Ícone Emoji**
No arquivo `index.html`, linha 18, você pode substituir o emoji 🔐 por qualquer outro:

```html
<div class="logo-placeholder">
    🔐  <!-- Substitua por: 🏢, 🚪, 🔑, 🏭, etc. -->
</div>
```

### 2. **Substituir o Texto do Logo**
No arquivo `index.html`, linha 20, você pode alterar o texto:

```html
<div class="logo-text">LAB Access Control</div>
<div class="logo-subtitle">Sistema de Controle de Acesso</div>
```

### 3. **Usar uma Imagem Real (Recomendado)**
Para usar uma imagem real como logo:

#### Passo 1: Adicione sua imagem
- Coloque sua imagem na pasta do projeto
- Formatos recomendados: PNG, SVG, JPG
- Tamanho recomendado: 80x80px ou 160x160px (2x para retina)

#### Passo 2: Modifique o HTML
Substitua o conteúdo da div `logo-icon`:

```html
<div class="logo-icon">
    <img src="caminho/para/sua/logo.png" alt="Logo da Empresa" style="width: 100%; height: 100%; object-fit: contain;">
</div>
```

#### Passo 3: Ajuste o CSS (opcional)
No arquivo `styles.css`, você pode ajustar o tamanho:

```css
.logo-icon {
    width: 50px;  /* Aumentar se necessário */
    height: 50px;
}
```

### 4. **Exemplos de Personalização**

#### Logo Corporativo
```html
<div class="logo-icon">
    <img src="logo-empresa.png" alt="Logo Empresa">
</div>
<span class="logo-text">Nome da Empresa</span>
```

#### Logo Institucional
```html
<div class="logo-icon">
    <img src="logo-instituto.png" alt="Logo Instituto">
</div>
<span class="logo-text">Instituto de Tecnologia</span>
```

#### Logo Simples com Ícone
```html
<div class="logo-icon">
    🏢
</div>
<span class="logo-text">Sistema LAB</span>
```

### 5. **Cores do Logo**
As cores do sistema estão na paleta verde. Para alterar:

#### Cores Principais (no arquivo `styles.css`):
- **Verde Principal:** `#10b981`
- **Verde Escuro:** `#059669`
- **Verde Mais Escuro:** `#047857`

#### Para alterar para outra paleta:
```css
body {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%);
}

.logo-placeholder {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

/* E assim por diante para todos os elementos */
```

### 6. **Responsividade**
O logo se adapta automaticamente em dispositivos móveis:
- **Desktop:** 40x40px
- **Mobile:** 35x35px

### 7. **Dicas de Design**
- Use imagens com fundo transparente (PNG/SVG)
- Mantenha o logo simples e legível
- Considere usar versões em branco para fundos escuros
- Teste em diferentes tamanhos de tela

### 8. **Arquivos para Modificar**
- `index.html` - Logo na navbar
- `script.js` - Logo no dashboard
- `styles.css` - Estilos e cores da navbar
- `demo.html` - Título da página de demonstração

---

**💡 Dica:** Para um resultado profissional, use um designer gráfico para criar um logo personalizado que reflita a identidade da sua empresa ou instituição.
