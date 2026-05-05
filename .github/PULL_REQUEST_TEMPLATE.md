# Pull Request

## Type of change
<!-- Check all that apply -->
- [ ] 🐛 Bug fix (existing skill or workflow correction)
- [ ] 🧠 New skill
- [ ] 🔄 New workflow
- [ ] 📖 Documentation
- [ ] 🔧 Refactor / tooling

## Description
<!-- A clear summary of what this PR does -->

## Related issue
<!-- Link the issue this PR closes -->
Closes #

## What was changed
<!-- List the files added or modified -->
- `skills/[category]/[name]/skill.json`
- `workflows/[name]/workflow.json`

## How to test
<!-- Steps to verify this works correctly -->
1. Copy the command from the skill.json or workflow.json
2. Paste into [platform]
3. Verify the AI behavior matches the skill description

## Screenshots
<!-- If this affects the FluxSkills app UI, add screenshots -->

## Checklist
- [ ] My skill.json / workflow.json follows the schema in `schema/`
- [ ] CI schema validation passes (`npm test`)
- [ ] The command was tested on at least one supported AI platform
- [ ] Description is under 200 chars (skills) or 300 chars (workflows)
- [ ] Tags are accurate and searchable
- [ ] Documentation updated if needed
- [ ] No breaking changes to existing skills or workflows
