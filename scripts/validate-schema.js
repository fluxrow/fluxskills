#!/usr/bin/env node
/**
 * Validates every skills/**\/skill.json and workflows/**\/workflow.json
 * against the JSON schemas in schema/. Exits non-zero on any failure.
 */
const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const ROOT = path.resolve(__dirname, "..");
const useColor = process.stdout.isTTY;
const c = (code, s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);
const red = (s) => c("31", s);
const green = (s) => c("32", s);
const yellow = (s) => c("33", s);
const dim = (s) => c("2", s);

function walk(dir, filename, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, filename, out);
    else if (entry.isFile() && entry.name === filename) out.push(full);
  }
  return out;
}

function loadJson(file) {
  const raw = fs.readFileSync(file, "utf8");
  try {
    return { ok: true, data: JSON.parse(raw) };
  } catch (e) {
    return { ok: false, error: `Invalid JSON: ${e.message}` };
  }
}

function rel(p) {
  return path.relative(ROOT, p);
}

function formatAjvErrors(errors) {
  return errors
    .map((e) => {
      const loc = e.instancePath || "(root)";
      let msg = `${loc} ${e.message}`;
      if (e.params) {
        const extras = Object.entries(e.params)
          .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
          .join(", ");
        if (extras) msg += `  ${dim(`[${extras}]`)}`;
      }
      return `    - ${msg}`;
    })
    .join("\n");
}

function validateAll() {
  const ajv = new Ajv({ allErrors: true, strict: false });

  const skillSchema = JSON.parse(
    fs.readFileSync(path.join(ROOT, "schema/skill.schema.json"), "utf8"),
  );
  const workflowSchema = JSON.parse(
    fs.readFileSync(path.join(ROOT, "schema/workflow.schema.json"), "utf8"),
  );
  const validateSkill = ajv.compile(skillSchema);
  const validateWorkflow = ajv.compile(workflowSchema);

  const skillFiles = walk(path.join(ROOT, "skills"), "skill.json");
  const workflowFiles = walk(path.join(ROOT, "workflows"), "workflow.json");

  const errors = [];
  const skillIds = new Map();
  const skillNames = new Set();
  const workflowIds = new Map();

  for (const file of skillFiles) {
    const parsed = loadJson(file);
    if (!parsed.ok) {
      errors.push(`${red("✗")} ${rel(file)}\n    - ${parsed.error}`);
      continue;
    }
    const data = parsed.data;
    if (!validateSkill(data)) {
      errors.push(
        `${red("✗")} ${rel(file)}\n${formatAjvErrors(validateSkill.errors)}`,
      );
      continue;
    }
    const folder = path.basename(path.dirname(file));
    if (data.id !== folder) {
      errors.push(
        `${red("✗")} ${rel(file)}\n    - id "${data.id}" does not match folder "${folder}"`,
      );
    }
    if (skillIds.has(data.id)) {
      errors.push(
        `${red("✗")} ${rel(file)}\n    - duplicate skill id "${data.id}" (also in ${rel(skillIds.get(data.id))})`,
      );
    } else {
      skillIds.set(data.id, file);
    }
    skillNames.add(data.name);
  }

  for (const file of workflowFiles) {
    const parsed = loadJson(file);
    if (!parsed.ok) {
      errors.push(`${red("✗")} ${rel(file)}\n    - ${parsed.error}`);
      continue;
    }
    const data = parsed.data;
    if (!validateWorkflow(data)) {
      errors.push(
        `${red("✗")} ${rel(file)}\n${formatAjvErrors(validateWorkflow.errors)}`,
      );
      continue;
    }
    const folder = path.basename(path.dirname(file));
    if (data.id !== folder) {
      errors.push(
        `${red("✗")} ${rel(file)}\n    - id "${data.id}" does not match folder "${folder}"`,
      );
    }
    if (workflowIds.has(data.id)) {
      errors.push(
        `${red("✗")} ${rel(file)}\n    - duplicate workflow id "${data.id}" (also in ${rel(workflowIds.get(data.id))})`,
      );
    } else {
      workflowIds.set(data.id, file);
    }
    if (Array.isArray(data.skills_used)) {
      for (const ref of data.skills_used) {
        if (!skillNames.has(ref)) {
          errors.push(
            `${red("✗")} ${rel(file)}\n    - skills_used references unknown skill "${ref}"`,
          );
        }
      }
    }
  }

  console.log(
    `Scanned ${skillFiles.length} skill file(s) and ${workflowFiles.length} workflow file(s).`,
  );

  if (errors.length) {
    console.log("");
    for (const e of errors) console.log(e);
    console.log("");
    console.log(red(`✗ ${errors.length} validation error(s)`));
    process.exit(1);
  }

  console.log(
    green(
      `✓ ${skillFiles.length} skills, ${workflowFiles.length} workflows valid`,
    ),
  );
}

try {
  validateAll();
} catch (e) {
  console.error(red("Validator crashed:"), e.stack || e.message);
  process.exit(2);
}