# FiguriPlay: prévia de vitrine

Prévia comercial **demonstrativa** de uma loja de figurinhas (avulsas, pacotes e
álbuns), feita para apresentação a cliente. Mostra a home, o catálogo com três
produtos fictícios, o detalhe de produto, a lista de figurinhas faltantes e um
pedido de demonstração.

**Não há** checkout, login, pagamento, envio de mensagens, estoque nem integração
real. Botões como "Enviar pedido" e "Pagar" só abrem um aviso explicando o que a
versão completa poderia fazer. O pedido fica salvo apenas no navegador
(`localStorage`).

Produtos, preços e imagens são ilustrativos. Não há vínculo com editoras,
fabricantes ou marcas de figurinhas.

## Rodar

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # site estático em out/
npm test             # testes do interpretador de números faltantes
npm run build:single # página única em dist-single/figuriplay.html
```

## Dois formatos de saída

- **Site com rotas** (`npm run build`): `/`, `/produtos/`, `/produtos/<slug>/`,
  `/faltantes/`, `/pedido/`. Exportação estática, pode ir para qualquer
  hospedagem de arquivos estáticos.
- **Página única** (`npm run build:single`): os mesmos componentes em um HTML só,
  com as telas trocadas pelo `#hash` (`#produtos`, `#produto-<slug>`,
  `#faltantes`, `#pedido`). É o formato usado para publicar a prévia de revisão.

## Publicar na Vercel

1. Na Vercel: **Add New → Project → Import** este repositório do GitHub.
2. Não precisa mudar nada: a Vercel detecta o Next.js e o `output: "export"`
   sozinha. Não altere o Output Directory nem defina variáveis de ambiente.
3. Cada push na `main` gera um novo deploy. A prévia vai com `noindex` para não
   aparecer em buscadores. Não conecte domínio do cliente nesta etapa.

## Onde mexer

| O quê | Arquivo |
|---|---|
| Produtos e preços de exemplo | `data/catalog.ts` |
| Cores e fontes | `app/globals.css`, `app/layout.tsx` |
| Ilustrações | `components/art/` |
| Regras da lista de faltantes | `lib/missing-numbers.ts` |
| Textos dos avisos de demonstração | `views/order-view.tsx`, `components/store/demo-action.tsx` |

## Origem e licença

Baseado no [Next.js Ecommerce Starter](https://github.com/thefrontkit/nextjs-ecommerce-starter)
da thefrontkit (MIT). Veja [`LICENSE`](LICENSE) e [`NOTICE.md`](NOTICE.md).
