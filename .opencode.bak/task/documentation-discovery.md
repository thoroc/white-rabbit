---
title: Documentation Discovery Task
description: Comprehensive discovery of existing documentation at any depth in
    the project tree
type: task
category: Documentation
version: 1.0.0
tags:
    - documentation
    - discovery
    - readme
    - docs
    - conventions
mode: task
temperature: 0.3
last_updated: 2025-11-19
estimated_duration: 2-4 minutes
---

This task provides comprehensive discovery of existing documentation at any depth in the project tree. Use this task before creating or updating documentation to avoid duplicates and respect existing conventions.

## Purpose

- **Discover ALL existing documentation** at any depth in the project
- **Identify documentation patterns** (monorepo, centralized, scattered, etc.)
- **Prevent duplicate documentation** by finding existing files first
- **Respect existing conventions** (naming, location, format)

## When to Use This Task

- Before creating ANY new documentation
- Before updating existing documentation (to find what exists)
- When assessing documentation coverage and gaps
- When planning documentation restructuring

## Related Resources

- **Checklist**: `.opencode/checklist/documentation-discovery.md` - 85+ verification points for complete analysis
- **Commands**: `/document`, `/documentalist` - Use this task for discovery phase

## Comprehensive Documentation Discovery Command

**IMPORTANT**: This discovery searches the ENTIRE project tree with NO DEPTH LIMITS. Review ALL results before proceeding.

```bash
echo "=== COMPREHENSIVE Documentation Discovery (All Depths) ==="
echo ""

# 1. README Files (all locations)
echo "## README Files (all locations):"
find . -name "README*" -type f \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  ! -path "*/venv/*" \
  ! -path "*/.venv/*" \
  ! -path "*/target/*" \
  ! -path "*/build/*" \
  ! -path "*/dist/*" \
  2>/dev/null | sort
echo ""

# 2. Documentation Directories (all depths)
echo "## Documentation Directories (all depths):"
find . -type d \( \
  -name "docs" -o \
  -name "doc" -o \
  -name "documentation" -o \
  -name "wiki" -o \
  -name ".github" -o \
  -name ".gitlab" \
  \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  2>/dev/null | sort
echo ""

# 3. All Markdown Files in Documentation Directories
echo "## All Markdown Files in Documentation Directories:"
find . \( \
  -path "*/docs/*" -o \
  -path "*/doc/*" -o \
  -path "*/documentation/*" -o \
  -path "*/wiki/*" \
  \) -name "*.md" \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  2>/dev/null | sort
echo ""

# 4. API Documentation (all locations)
echo "## API Documentation (all locations):"
find . -type f \( \
  -iname "*api*.md" -o \
  -iname "api.rst" -o \
  -iname "api.txt" -o \
  -iname "openapi*.yml" -o \
  -iname "openapi*.yaml" -o \
  -iname "swagger*.yml" -o \
  -iname "swagger*.yaml" \
  \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  ! -path "*/build/*" \
  ! -path "*/dist/*" \
  ! -path "*/target/*" \
  2>/dev/null | sort
echo ""

# 5. Architecture Documentation (all locations)
echo "## Architecture Documentation (all locations):"
find . -type f \( \
  -iname "*arch*.md" -o \
  -iname "*design*.md" -o \
  -iname "*architecture*.md" \
  \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  ! -path "*/build/*" \
  ! -path "*/dist/*" \
  ! -path "*/target/*" \
  2>/dev/null | sort
echo ""

# 6. Development & Contributing Docs (all locations)
echo "## Development & Contributing Docs (all locations):"
find . -type f \( \
  -iname "*dev*.md" -o \
  -iname "*contributing*.md" -o \
  -iname "development.md" -o \
  -iname "contributing.md" -o \
  -iname "developer*.md" \
  \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  ! -path "*/build/*" \
  ! -path "*/dist/*" \
  ! -path "*/target/*" \
  2>/dev/null | sort
echo ""

# 7. Deployment & Operations Docs (all locations)
echo "## Deployment & Operations Docs (all locations):"
find . -type f \( \
  -iname "*deploy*.md" -o \
  -iname "*ops*.md" -o \
  -iname "*install*.md" -o \
  -iname "*setup*.md" -o \
  -iname "deployment.md" -o \
  -iname "operations.md" \
  \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  ! -path "*/build/*" \
  ! -path "*/dist/*" \
  ! -path "*/target/*" \
  2>/dev/null | sort
echo ""

# 8. Testing Documentation (all locations)
echo "## Testing Documentation (all locations):"
find . -type f \( \
  -iname "*test*.md" -o \
  -iname "*testing*.md" -o \
  -iname "qa.md" \
  \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  ! -path "*/build/*" \
  ! -path "*/dist/*" \
  ! -path "*/target/*" \
  ! -path "*/__tests__/*" \
  ! -path "*/test/*" \
  ! -path "*/tests/*" \
  2>/dev/null | sort
echo ""

# 9. Security Documentation (all locations)
echo "## Security Documentation (all locations):"
find . -type f \( \
  -iname "*security*.md" -o \
  -iname "security.txt" -o \
  -iname "*sec-*.md" \
  \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  2>/dev/null | sort
echo ""

# 10. Other Documentation Formats (RST, AsciiDoc, TXT)
echo "## Other Documentation Formats (RST, AsciiDoc, TXT):"
find . -type f \( \
  -name "*.rst" -o \
  -name "*.adoc" -o \
  -name "*.asciidoc" \
  \) \( \
  -iname "*readme*" -o \
  -iname "*doc*" -o \
  -iname "*guide*" -o \
  -iname "*api*" -o \
  -iname "*arch*" \
  \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  ! -path "*/build/*" \
  ! -path "*/dist/*" \
  2>/dev/null | sort
echo ""

# 11. SUMMARY - Total Documentation Files Found
echo "## SUMMARY - Total Documentation Files Found:"
find . -type f \( \
  -name "*.md" -o \
  -name "*.rst" -o \
  -name "*.adoc" -o \
  -name "*.asciidoc" \
  \) \( \
  -iname "*readme*" -o \
  -iname "*doc*" -o \
  -iname "*guide*" -o \
  -iname "*api*" -o \
  -iname "*arch*" -o \
  -iname "*deploy*" -o \
  -iname "*contributing*" -o \
  -iname "*dev*" -o \
  -path "*/docs/*" -o \
  -path "*/doc/*" -o \
  -path "*/documentation/*" \
  \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/vendor/*" \
  ! -path "*/build/*" \
  ! -path "*/dist/*" \
  ! -path "*/target/*" \
  2>/dev/null | wc -l
```

## Output Interpretation

### Categories Explained

1. **README Files**: All README files at any location (root, subdirectories, packages)
2. **Documentation Directories**: All directories dedicated to documentation
3. **Markdown Files in Doc Directories**: All .md files within documentation directories
4. **API Documentation**: API specs, endpoint docs, OpenAPI/Swagger definitions
5. **Architecture Documentation**: System design, architecture diagrams, design docs
6. **Development & Contributing**: Dev setup, contribution guidelines, workflows
7. **Deployment & Operations**: Deployment guides, operational procedures
8. **Testing Documentation**: Test guides, QA procedures (excludes test code)
9. **Security Documentation**: Security policies, guidelines, best practices
10. **Other Formats**: Non-markdown documentation (RST, AsciiDoc)
11. **SUMMARY**: Total count of all documentation files found

### What to Look For

- **High count**: Project has significant existing documentation
- **Zero count**: No existing documentation of that type
- **Scattered locations**: Documentation may need consolidation
- **Multiple formats**: Project uses mixed documentation formats
- **Subdirectory docs**: Likely a monorepo or component-specific documentation

## Analysis After Discovery

After running the discovery command, you MUST:

1. **Review ALL discovered files** - Don't skip any results
2. **Note the SUMMARY count** - Tells you how much documentation exists
3. **Read existing documentation** - Use Read tool to examine each file
4. **Identify patterns**:
    - Monorepo pattern: `./packages/*/docs/`, `./services/*/docs/`
    - Centralized pattern: All docs in `./docs/` or `./documentation/`
    - Root pattern: Docs in project root (small projects)
    - Mixed pattern: Some docs in root, some in subdirectories
    - Platform-specific: `./.github/`, `./.gitlab/`

5. **Analyze conventions**:
    - File naming: README vs readme, UPPERCASE vs lowercase
    - File extensions: .md, .rst, .adoc preferences
    - Directory names: docs vs doc vs documentation
    - Section structure: How existing docs are organized

6. **Determine action**:
    - **If docs exist**: UPDATE them in place (don't create duplicates)
    - **If docs missing**: CREATE following existing patterns
    - **If docs outdated**: ENHANCE with new information
    - **If docs scattered**: Consider if consolidation adds value

## Integration with Commands

This task is used by:

- `/document` - Quick documentation generation (uses this for discovery phase)
- `/documentalist` - Comprehensive documentation suites (uses this for discovery phase)
- All specialized doc commands (`/api-docs`, `/arch-docs`, etc.)

## Best Practices

### DO

- ✅ Run discovery BEFORE any documentation work
- ✅ Review ALL results, not just first few
- ✅ Read discovered files to understand existing structure
- ✅ Respect existing file locations and naming conventions
- ✅ Update existing documentation instead of creating duplicates
- ✅ Follow discovered organizational patterns

### DON'T

- ❌ Skip discovery assuming no docs exist
- ❌ Limit search to shallow depths (maxdepth)
- ❌ Truncate results with head/tail commands
- ❌ Create duplicate documentation
- ❌ Move existing documentation without reason
- ❌ Ignore subdirectory documentation patterns

## Performance Notes

- **Fast**: Discovery typically completes in < 5 seconds even for large projects
- **Efficient**: Single-pass find commands with optimized exclusions
- **Safe**: Read-only operation, makes no changes to filesystem
- **Comprehensive**: Searches entire tree without depth limits

## Example Usage in Commands

### In `/document` command

```markdown
2. **Discover Existing Documentation**:

    **📋 Discovery Task**: See `.opencode/task/documentation-discovery.md`

    !`[paste discovery command from task]`

    **After discovery, you MUST:**
    - Review the COMPLETE list of discovered files
    - Note the SUMMARY count
    - Read all discovered files before proceeding
```

### In `/documentalist` command

```markdown
1. **Discover Existing Documentation**:

    **📋 Complete Discovery Process**:
    - Discovery Command: `.opencode/task/documentation-discovery.md`
    - Analysis Checklist: `.opencode/checklist/documentation-discovery.md`

    Run discovery task to find ALL documentation at ANY DEPTH.

    **After discovery, you MUST:**
    - Review ALL discovered files
    - Identify documentation organization pattern
    - Note exact file paths for updates
```

## Troubleshooting

### No Results Found

- **Cause**: Project may have no documentation, or files use non-standard names
- **Solution**: Check for non-standard formats or locations, consider creating new docs

### Too Many Results

- **Cause**: Large project with extensive documentation
- **Solution**: Normal - review categories systematically, focus on relevant types

### Unexpected Locations

- **Cause**: Project uses non-standard organization
- **Solution**: Respect the discovered pattern, don't impose standard structure

### Mixed Formats

- **Cause**: Project history or team preferences
- **Solution**: Follow majority format, or ask about preferred format before creating new docs

## Related Tasks

- **Technology Detection**: `.opencode/task/technology-detection.md` - For understanding project tech stack
- **Infrastructure Analysis**: `.opencode/task/infrastructure-analysis.md` - For architecture documentation needs
- **Deployment Strategy**: `.opencode/task/deployment-strategy.md` - For deployment documentation needs

## Version History

- **v1.0.0** (2025-11-13): Initial comprehensive discovery task extracted from command duplicates
