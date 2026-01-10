# @pague-dev/sdk-node

SDK oficial do [pague.dev](https://pague.dev) para Node.js e browsers.

## Instalacao

```bash
npm install @pague-dev/sdk-node
```

## Uso

```typescript
import { Pdev } from '@pague-dev/sdk-node';

// Opção 1: Passar a API key diretamente
const pdev = new Pdev('pd_live_sua_api_key');

// Opção 2: Usar variável de ambiente PDEV_API_KEY
const pdev = new Pdev();
```

## Recursos

- **PIX** - Cobranças instantâneas
- **Charges** - Links de pagamento
- **Customers** - Gestão de clientes
- **Projects** - Organização por projetos
- **Transactions** - Consulta de transações
- **Webhooks** - Notificações em tempo real

## Documentacao

Exemplos e guias de integração: **[docs.pague.dev](https://docs.pague.dev)**

## Licenca

MIT
