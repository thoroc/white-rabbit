---
description: General frontend development best practices covering TypeScript, framework usage, SEO, caching, and code quality standards
type: checklist
category: Development
tags:
  - frontend
  - development
  - best-practices
  - typescript
  - quality-assurance
version: 1.0.0
last_updated: 2025-11-20
---

# Frontend Development Best Practices Checklist

This checklist ensures high-quality, maintainable frontend code following modern development standards.

## TypeScript Usage

### ✅ DO

- [ ] Use **TypeScript** for all new projects and components
- [ ] Define proper **types and interfaces** for all data structures
- [ ] Use **strict mode** in tsconfig.json
- [ ] Leverage TypeScript's **type inference** where appropriate
- [ ] Use **union types** and **type guards** for flexible typing
- [ ] Define **return types** for all functions
- [ ] Use **enums** for fixed sets of values
- [ ] Implement **generics** for reusable components
- [ ] Use **utility types** (Pick, Omit, Partial, etc.) when appropriate
- [ ] Enable **ESLint** with TypeScript rules

### ❌ DON'T

- [ ] Don't use `any` type - be specific with types
- [ ] Don't ignore TypeScript errors
- [ ] Don't bypass type checking with `@ts-ignore` without good reason
- [ ] Don't use type assertions excessively (`as Type`)
- [ ] Don't skip typing for complex objects
- [ ] Don't use loose tsconfig settings

## Framework Best Practices

### ✅ DO

- [ ] **Detect and adapt** to the project's framework (Astro, Next.js, Nuxt, React, Vue, etc.)
- [ ] Follow framework-specific **best practices** and conventions
- [ ] Use framework's **recommended file structure**
- [ ] Leverage framework's **built-in optimizations**
- [ ] Use framework **dev tools** for debugging
- [ ] Keep framework and dependencies **up to date**
- [ ] Use framework's **recommended state management** approach
- [ ] Follow framework's **component composition** patterns
- [ ] Use framework's **routing solutions**
- [ ] Read and apply framework **documentation** regularly

### ❌ DON'T

- [ ] Don't fight against framework conventions
- [ ] Don't mix incompatible patterns from different frameworks
- [ ] Don't ignore framework-specific warnings
- [ ] Don't use outdated framework versions
- [ ] Don't skip framework documentation
- [ ] Don't over-hydrate components unnecessarily

## SEO and Meta Tags

### ✅ DO

- [ ] Implement proper **meta tags** (title, description, og:tags)
- [ ] Use **semantic HTML** for better SEO
- [ ] Implement **structured data** (JSON-LD)
- [ ] Create proper **sitemap.xml**
- [ ] Implement **robots.txt** appropriately
- [ ] Use **canonical URLs** to avoid duplicate content
- [ ] Implement **Open Graph tags** for social sharing
- [ ] Add **Twitter Card tags**
- [ ] Use descriptive **alt text** for images
- [ ] Implement proper **heading hierarchy** (h1 → h2 → h3)
- [ ] Ensure **mobile-friendly** design
- [ ] Use **HTTPS** everywhere

### ❌ DON'T

- [ ] Don't ignore SEO best practices
- [ ] Don't use duplicate titles across pages
- [ ] Don't skip meta descriptions
- [ ] Don't use generic or missing alt text
- [ ] Don't ignore mobile SEO
- [ ] Don't block search engines unintentionally

## Image and Asset Optimization

### ✅ DO

- [ ] **Optimize all images** before deployment
- [ ] Use appropriate image formats (WebP, AVIF with fallbacks)
- [ ] Implement **responsive images** with srcset
- [ ] Use **lazy loading** for images: `loading="lazy"`
- [ ] Provide proper **alt text** for all images
- [ ] Use **SVG** for icons and simple graphics
- [ ] Compress assets without quality loss
- [ ] Use **CDN** for static asset delivery
- [ ] Implement **image placeholders** (blur, skeleton)
- [ ] Use framework's **image optimization** features when available

### ❌ DON'T

- [ ] Don't use unoptimized images
- [ ] Don't serve oversized images
- [ ] Don't use PNG when WebP/AVIF is better
- [ ] Don't forget lazy loading for below-fold images
- [ ] Don't skip image optimization
- [ ] Don't use images for text

## Content Management

### ✅ DO

- [ ] Use framework-appropriate **content management** solutions
- [ ] Implement **type-safe content** where possible
- [ ] Use content collections or similar patterns
- [ ] Validate content schemas
- [ ] Implement content versioning when needed
- [ ] Use markdown/MDX for content when appropriate
- [ ] Separate content from code
- [ ] Implement content previews
- [ ] Use i18n for internationalization

### ❌ DON'T

- [ ] Don't hard-code content in components
- [ ] Don't skip content validation
- [ ] Don't ignore internationalization requirements
- [ ] Don't mix content with business logic

## Caching Strategies

### ✅ DO

- [ ] Implement proper **cache headers** (Cache-Control, ETag)
- [ ] Use **immutable caching** for versioned assets
- [ ] Cache API responses appropriately
- [ ] Implement **service workers** for offline capability (when appropriate)
- [ ] Use **CDN caching** for static assets
- [ ] Implement **cache invalidation** strategies
- [ ] Use **SWR or stale-while-revalidate** patterns
- [ ] Test caching behavior in different scenarios
- [ ] Document caching strategy

### ❌ DON'T

- [ ] Don't cache frequently changing content aggressively
- [ ] Don't ignore cache headers
- [ ] Don't skip cache testing
- [ ] Don't forget cache busting for updated assets
- [ ] Don't over-cache or under-cache

## Code Quality

### ✅ DO

- [ ] Follow **consistent code style** (use Prettier/ESLint)
- [ ] Write **self-documenting code** with clear naming
- [ ] Add **comments** for complex logic
- [ ] Keep functions **small and focused**
- [ ] Use **meaningful variable names**
- [ ] Follow **DRY principle** (Don't Repeat Yourself)
- [ ] Implement **error handling** properly
- [ ] Use **modern JavaScript/TypeScript** features
- [ ] Write **testable code**
- [ ] Perform **code reviews**

### ❌ DON'T

- [ ] Don't write cryptic code
- [ ] Don't use single-letter variables (except loop counters)
- [ ] Don't create god functions/components
- [ ] Don't skip error handling
- [ ] Don't ignore linter warnings
- [ ] Don't copy-paste code excessively

## Component Architecture

### ✅ DO

- [ ] Design **reusable, composable components**
- [ ] Implement proper **component hierarchy**
- [ ] Use **slots and props** effectively
- [ ] Keep components **focused and small**
- [ ] Separate **presentational** and **container** components
- [ ] Implement **prop validation**
- [ ] Document component **APIs and props**
- [ ] Create **component demos/examples**
- [ ] Use framework's **composition patterns**
- [ ] Test components in isolation

### ❌ DON'T

- [ ] Don't create monolithic components
- [ ] Don't tightly couple components
- [ ] Don't skip prop validation
- [ ] Don't ignore component reusability
- [ ] Don't forget component documentation

## State Management

### ✅ DO

- [ ] Use framework-appropriate **state management**
- [ ] Keep state **as local as possible**
- [ ] Use **global state** only when necessary
- [ ] Implement **proper state updates** (immutability)
- [ ] Use state management patterns consistently
- [ ] Document state structure and flow
- [ ] Handle **async state** properly
- [ ] Avoid **prop drilling** with context or stores
- [ ] Test state changes

### ❌ DON'T

- [ ] Don't overuse global state
- [ ] Don't mutate state directly
- [ ] Don't skip state validation
- [ ] Don't create circular state dependencies
- [ ] Don't ignore state management best practices

## Styling

### ✅ DO

- [ ] Use consistent **styling approach** (CSS Modules, Tailwind, CSS-in-JS)
- [ ] Follow **BEM or similar** naming conventions
- [ ] Use **CSS variables** for theming
- [ ] Implement **responsive design** mobile-first
- [ ] Support **dark mode** when appropriate
- [ ] Use **utility-first CSS** where it makes sense
- [ ] Minimize inline styles
- [ ] Use **scoped styles** to avoid conflicts
- [ ] Implement **consistent spacing** and sizing
- [ ] Test styles across browsers

### ❌ DON'T

- [ ] Don't use excessive inline styles
- [ ] Don't create global CSS conflicts
- [ ] Don't ignore responsive design
- [ ] Don't skip dark mode support
- [ ] Don't use !important excessively
- [ ] Don't forget mobile-first approach

## Build Configuration

### ✅ DO

- [ ] Optimize **build performance**
- [ ] Configure proper **environment variables**
- [ ] Set up **development and production** builds
- [ ] Implement **code splitting**
- [ ] Configure **tree shaking**
- [ ] Set up **source maps** for debugging
- [ ] Optimize **bundle sizes**
- [ ] Configure **hot module replacement** for development
- [ ] Use **TypeScript strict mode**
- [ ] Document build process

### ❌ DON'T

- [ ] Don't use development builds in production
- [ ] Don't expose secrets in client-side code
- [ ] Don't ignore build warnings
- [ ] Don't skip build optimization
- [ ] Don't forget to configure environment variables

## Browser Automation

### ✅ DO

- [ ] **Always use MCP tools** for browser operations
- [ ] Use `playwright_*` and `chrome-devtools_*` tools
- [ ] Test with **browser automation** tools
- [ ] Implement **automated testing**
- [ ] Use **proper locators** (role-based preferred)
- [ ] Test across multiple browsers
- [ ] Test responsive behavior with `playwright_browser_resize`

### ❌ DON'T

- [ ] **Don't use bash commands** for browser automation
- [ ] Don't skip browser testing
- [ ] Don't only test in Chrome
- [ ] Don't ignore cross-browser compatibility
- [ ] Don't skip automated tests

## Accessibility

### ✅ DO

- [ ] Follow **WCAG 2.1 AA** guidelines minimum
- [ ] Use **semantic HTML** elements
- [ ] Implement **keyboard navigation**
- [ ] Provide **proper ARIA** attributes
- [ ] Test with **screen readers**
- [ ] Ensure proper **color contrast**
- [ ] Provide **alt text** for images
- [ ] Test accessibility with `playwright_browser_snapshot`
- [ ] Implement **focus management**

### ❌ DON'T

- [ ] Don't skip accessibility testing
- [ ] Don't use divs for everything
- [ ] Don't ignore keyboard users
- [ ] Don't forget screen reader users
- [ ] Don't use poor color contrast

## Security

### ✅ DO

- [ ] Validate and **sanitize user input**
- [ ] Use **HTTPS** everywhere
- [ ] Implement **Content Security Policy** (CSP)
- [ ] Prevent **XSS** vulnerabilities
- [ ] Use **secure cookies** (HttpOnly, Secure, SameSite)
- [ ] Keep dependencies **up to date**
- [ ] Audit dependencies for vulnerabilities
- [ ] Never expose **secrets** in client code
- [ ] Implement proper **authentication** and authorization
- [ ] Use security headers

### ❌ DON'T

- [ ] Don't trust user input
- [ ] Don't expose API keys or secrets
- [ ] Don't use outdated dependencies
- [ ] Don't skip security audits
- [ ] Don't ignore security warnings
- [ ] Don't forget CORS configuration

## Documentation

### ✅ DO

- [ ] Document **component APIs** and props
- [ ] Create usage **examples and demos**
- [ ] Maintain **README** with setup instructions
- [ ] Document **architectural decisions**
- [ ] Create **troubleshooting guides**
- [ ] Keep **changelog** updated
- [ ] Document **environment variables**
- [ ] Add **JSDoc comments** for functions
- [ ] Document **testing strategies**

### ❌ DON'T

- [ ] Don't skip documentation
- [ ] Don't write outdated documentation
- [ ] Don't assume code is self-documenting
- [ ] Don't forget onboarding documentation
- [ ] Don't skip API documentation

## Testing

### ✅ DO

- [ ] Write **automated tests**
- [ ] Test **critical user flows**
- [ ] Implement **unit tests** for utilities
- [ ] Write **integration tests**
- [ ] Implement **E2E tests** with Playwright
- [ ] Test **accessibility** with MCP tools
- [ ] Test **performance**
- [ ] Test across **multiple browsers**
- [ ] Maintain **test coverage**
- [ ] Run tests in **CI/CD**

### ❌ DON'T

- [ ] Don't skip testing
- [ ] Don't only test happy paths
- [ ] Don't ignore flaky tests
- [ ] Don't skip E2E tests
- [ ] Don't forget performance testing

## Git and Version Control

### ✅ DO

- [ ] Use **meaningful commit messages**
- [ ] Follow **commit conventions** (Conventional Commits)
- [ ] Create **feature branches**
- [ ] Write **descriptive PR descriptions**
- [ ] Review code before merging
- [ ] Use **.gitignore** properly
- [ ] Keep commits **atomic and focused**
- [ ] Tag releases appropriately

### ❌ DON'T

- [ ] Don't commit directly to main/master
- [ ] Don't use vague commit messages
- [ ] Don't commit secrets or credentials
- [ ] Don't commit node_modules or build artifacts
- [ ] Don't skip code review

## Development Workflow

### ✅ DO

- [ ] Use **package managers** consistently (npm, pnpm, yarn, bun)
- [ ] Lock dependency versions (package-lock.json, yarn.lock)
- [ ] Set up **pre-commit hooks** (Husky)
- [ ] Configure **linters and formatters**
- [ ] Use **environment-specific** configurations
- [ ] Implement **hot reload** for development
- [ ] Set up **debugging tools**
- [ ] Document **development setup**

### ❌ DON'T

- [ ] Don't mix package managers
- [ ] Don't commit lock files from wrong package manager
- [ ] Don't skip linting
- [ ] Don't ignore formatting
- [ ] Don't skip development documentation

## Related Resources

- **Playwright Testing Best Practices**: `.opencode/checklist/playwright-testing-best-practices.md`
- **Frontend Accessibility Best Practices**: `.opencode/checklist/frontend-accessibility-best-practices.md`
- **Frontend Performance Best Practices**: `.opencode/checklist/frontend-performance-best-practices.md`
- **Playwright MCP Tools**: `.opencode/knowledge-base/playwright-mcp-tools.md`
- **Frontend Testing Scenarios**: `.opencode/knowledge-base/frontend-testing-scenarios.md`
- **Frontend Testing Agent**: `.opencode/agent/frontend-testing.md`

## Quick Checklist

Before considering frontend development complete:

- [ ] TypeScript configured with strict mode
- [ ] Code follows framework best practices
- [ ] SEO meta tags implemented
- [ ] Images optimized and lazy loaded
- [ ] Proper caching configured
- [ ] Code quality standards met (linted, formatted)
- [ ] Components are reusable and documented
- [ ] Accessibility guidelines followed (WCAG 2.1 AA)
- [ ] Security best practices implemented
- [ ] Tests written and passing
- [ ] Documentation complete
- [ ] Performance optimized
- [ ] MCP tools used for all browser operations

## Summary

High-quality frontend development requires:

1. **TypeScript** for type safety
2. **Framework best practices** for consistency
3. **SEO and accessibility** for reach
4. **Performance optimization** for user experience
5. **Testing with MCP tools** for reliability
6. **Documentation** for maintainability
7. **Security** for trust

Follow these practices consistently to build robust, maintainable frontend applications.
