# 06-defects/recommendations/

Use this folder for findings that violate no business rule: technical debt, usability,
clarity, accessibility, testability, latent risk. They are recommendations, not defects.

- Before filing here, confirm that no source (spec, business rule, functional document,
  code) requires the behavior. If one does, it is a defect: file it in open/.
- Identifier: REC-{PREFIX}-NNN, with its own numbering. Never reuse a DEF number.
- A recommendation never justifies a test.fail() or a defect marker in automation, and
  it is not opened as a Bug in the work tracker.
- If a finding filed as a defect turns out to be a recommendation, move it here with a
  new REC id and leave the old DEF number retired, with a note pointing to the REC.
- If a source later defines the rule, move the file back to open/ as a defect, citing
  that source.
