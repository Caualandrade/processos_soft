# Painel de Estoque de Remédios - OldTech

Este projeto é um painel web para gerenciamento de estoque de medicamentos, pacientes e administração de remédios, desenvolvido para fins acadêmicos.

## Funcionalidades

- **Visão Geral do Estoque:** Exibe total de remédios, quantidade de itens acabando e próximos do vencimento.
- **Lista de Medicamentos:** Visualização, busca e filtros por nome, validade e quantidade. Permite editar e remover medicamentos.
- **Adicionar Remédio:** Formulário para cadastrar novos medicamentos no estoque.
- **Pacientes e Medicamentos:** Vincula medicamentos a pacientes, registra administração e permite editar/remover vínculos.
- **Relatórios:** Opções para exportar relatórios (PDF/Excel) de remédios em falta, vencendo e administrados (funcionalidade simulada).

## Estrutura do Projeto

```
index.html
css/
  style.css
  dashboard.css
js/
  main.js
  dashboard.js
  patient_medication.js
.vscode/
  settings.json
```

## Como Executar

1. **Pré-requisitos:** Navegador moderno (Chrome, Firefox, Edge, etc.).
2. **Abrir o Projeto:** Basta abrir o arquivo [`index.html`](index.html) no navegador.
3. **Live Server (opcional):** Para melhor experiência, utilize a extensão Live Server do VS Code.

## Tecnologias Utilizadas

- HTML5, CSS3 (com uso de variáveis e responsividade)
- JavaScript (puro, sem frameworks)


## Observações

- Os dados são simulados no frontend, sem backend ou persistência real.
- As funcionalidades de exportação de relatórios são apenas ilustrativas.
- O projeto é totalmente responsivo e adaptado para dispositivos móveis.

---

Desenvolvido para fins didáticos.