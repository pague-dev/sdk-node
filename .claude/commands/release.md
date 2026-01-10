# Release Command

Executa o fluxo completo de release do SDK:

1. Verifica se há alterações não commitadas
2. Pergunta ao usuário qual tipo de versão (patch, minor, major)
3. Faz commit das alterações pendentes (se houver)
4. Atualiza a versão no package.json usando `npm version`
5. Faz push dos commits e tags para o repositório remoto
6. Cria um release no GitHub com changelog
7. Publica o pacote no npm

## Instruções

- Sempre verifique o estado do git antes de iniciar
- Use mensagens de commit seguindo o padrão commitlint (feat:, fix:, docs:, chore:, etc.)
- Gere notas de release baseadas nos commits desde a última tag
- Confirme com o usuário antes de publicar no npm
