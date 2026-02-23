# @pague-dev/sdk-node

SDK oficial do [pague.dev](https://pague.dev) para Node.js e browsers.

## Instalação

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

// PIX Dinâmico
await pdev.pix.create({ amount, description, customer });

// PIX QR Code Estático
await pdev.pix.createStaticQrCode({ amount, description });

// Charges
await pdev.charges.create({ projectId, name, amount, paymentMethods });
await pdev.charges.list({ page, limit });
await pdev.charges.get(id);

// Customers
await pdev.customers.create({ name, document });
await pdev.customers.list({ page, limit, search });

// Projects
await pdev.projects.create({ name, color });
await pdev.projects.list({ page, limit });

// Withdrawals (Saques PIX)
await pdev.withdrawals.create({ amount, pixKey, pixKeyType, holderName, holderDocument });
await pdev.withdrawals.create({ amount, bankAccountId });

// Transactions
await pdev.transactions.get(id);

// Webhooks
import { parseWebhook } from '@pague-dev/sdk-node';
const event = parseWebhook(req.body);
```

## Recursos

- **PIX** - Cobranças instantâneas (dinâmico e estático)
- **Charges** - Links de pagamento
- **Customers** - Gestão de clientes
- **Projects** - Organização por projetos
- **Withdrawals** - Saques via PIX (avulso ou conta salva)
- **Transactions** - Consulta de transações
- **Webhooks** - Notificações em tempo real

## Exemplo

Veja uma aplicação completa usando o SDK: **[github.com/pague-dev/sdk-example](https://github.com/pague-dev/sdk-example)**

## Documentação

Guias e exemplos completos: **[docs.pague.dev](https://docs.pague.dev)**

## Licença

MIT
