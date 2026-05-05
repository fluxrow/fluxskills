# Validação automática de schemas no CI

O workflow `.github/workflows/validate.yml` já existe e tenta rodar `node scripts/validate-schema.js`, mas o script **não existe** — então qualquer PR que toque em `skills/`, `workflows/` ou `schema/` falha no CI por arquivo ausente. Vou criar o script e reforçar o workflow.

## Arquivos

### `scripts/validate-schema.js` (novo)
Script Node.js que:
1. Carrega `schema/skill.schema.json` e `schema/workflow.schema.json` com Ajv (draft-07).
2. Faz glob de `skills/**/skill.json` e `workflows/**/workflow.json`.
3. Valida cada arquivo contra o schema correspondente.
4. Para cada falha imprime caminho do arquivo + erros formatados (path do campo + mensagem).
5. Verificações extras além do JSON Schema:
   - `id` do arquivo bate com o nome da pasta pai (ex: `skills/dev/mcp-builder/skill.json` → `id: "mcp-builder"`).
   - `id`s únicos entre todas as skills, e entre todos os workflows.
   - Em workflows, todo item de `skills_used` referencia uma skill existente (`name` `SKILL-...`).
   - JSON parseável (mensagem clara em caso de erro de sintaxe).
6. Imprime resumo `✓ N skills, M workflows válidos` e sai com `process.exit(1)` se houver qualquer erro.

Sem dependências extras além de `ajv` (já instalado pelo workflow). Glob feito com `fs.readdirSync` recursivo nativo para evitar dependências.

### `.github/workflows/validate.yml` (ajustes)
- Adicionar `push` na branch `main` além de `pull_request`, para detectar regressões.
- Incluir `scripts/**` nos `paths` (assim mudanças no validador também rodam o CI).
- Instalar `ajv` e `ajv-formats` com versão pinada via `npm install --no-save ajv@8 ajv-formats@3`.
- Adicionar passo opcional `Validate JSON syntax` rodando `node -e` em cada arquivo antes do schema (mensagem mais amigável).
- Adicionar `permissions: contents: read` (boa prática de segurança).

### `CONTRIBUTING.md` (atualização leve, se já existir; senão criar)
Seção curta "Validação local":
```
node scripts/validate-schema.js
```
para contribuintes rodarem antes de abrir PR.

## Notas técnicas

- Ajv com `allErrors: true` e `strict: false` para reportar todos os erros de uma vez sem falhar em keywords desconhecidas.
- Saída usa códigos ANSI simples (vermelho/verde) só quando `process.stdout.isTTY` for falso usa texto plano — facilita leitura nos logs do GitHub Actions.
- O script é idempotente e roda em < 1s mesmo com centenas de arquivos.
- Nenhum código da app React é alterado.