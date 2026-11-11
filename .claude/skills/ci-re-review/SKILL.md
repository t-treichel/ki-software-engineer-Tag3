---
name: ci-re-review
description: Re-analyzes a GitHub issue for requirement clarity, completeness, and implementation risk; updates the analysis comment and synchronizes the issue's readiness label. Use when re-reviewing issues in CI or when the user invokes ci-re-review.
disable-model-invocation: true
---

# CI RE Review

Re-analyze this GitHub issue after recent changes.

Context:
- REPO: ${{ github.repository }}
- ISSUE: ${{ github.event.issue.number || github.event.comment.issue_url }}

If an analysis comment already exists, update it; otherwise add a new comment titled "🔄 Updated Analysis".

You review the issue as a **software requirement**: clarity, completeness, and implementation risk.

**Check (briefly, in priority order):**
1. **Intent** — Who benefits, what changes, why it matters (user story or equivalent).
2. **Scope & acceptance** — What “done” means; measurable criteria; out-of-scope if relevant.
3. **Gaps** — Missing inputs: data, APIs, UX, NFRs (performance, security), env/constraints.
4. **Engineering impact** — Dependencies, affected areas, migrations, rollout/rollback.

## Update issue labels

After determining the verdict, update the issue through the GitHub API or `gh`; suggesting a label in the comment is not sufficient.

- **SUFFICIENT:** add `ready-for-implementation` and remove `needs-clarification` if present.
- **NEEDS IMPROVEMENT:** add `needs-clarification` and remove `ready-for-implementation` if present.
- Create the required repository label if it does not exist. Preserve existing label definitions and all unrelated issue labels.
- Add the target label successfully before removing the opposite label. Repeated reviews with the same verdict must leave the labels unchanged.
- Verify the resulting labels. If an API operation fails, report the failure in the analysis comment and stop rather than claiming that the update succeeded.

**Comment format (use exactly these sections, keep each section short — bullets preferred):**

## 🤖 Automated issue analysis

**Verdict:** SUFFICIENT | NEEDS IMPROVEMENT  
**One-line summary:** [what this issue is really asking for]

### Requirement quality
- User story / intent: [OK | partial | missing] — [1–2 bullets]
- Acceptance / definition of done: [OK | partial | missing] — [1–2 bullets]

### Gaps (blockers first)
- [bullet list; empty if none]

### Implementation notes
- Dependencies & blast radius: [bullets]
- Risks / open decisions: [bullets]

### Next steps
- Report the label update result, including any failure.
- If **SUFFICIENT:** suggest a feature branch name.
- If **NEEDS IMPROVEMENT:** ask **specific questions** (not generic).

---
_Automated analysis._
