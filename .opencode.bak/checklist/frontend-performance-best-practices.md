---
description: Comprehensive performance optimization checklist for frontend applications covering Core Web Vitals, bundle optimization, and resource loading strategies
type: checklist
category: Quality
tags:
    - performance
    - optimization
    - core-web-vitals
    - frontend
    - quality-assurance
version: 1.0.0
last_updated: 2025-11-20
---

# Frontend Performance Best Practices Checklist

This checklist ensures optimal frontend performance with focus on Core Web Vitals (LCP, FID, CLS) and user experience.

## Core Web Vitals Monitoring

### ✅ DO

- [ ] Monitor **Largest Contentful Paint (LCP)** - should be < 2.5s
- [ ] Monitor **First Input Delay (FID)** - should be < 100ms
- [ ] Monitor **Cumulative Layout Shift (CLS)** - should be < 0.1
- [ ] Monitor **First Contentful Paint (FCP)** - should be < 1.8s
- [ ] Monitor **Time to Interactive (TTI)** - should be < 3.8s
- [ ] Monitor **Total Blocking Time (TBT)** - should be < 200ms
- [ ] Use **Chrome DevTools MCP** for performance analysis: `chrome-devtools_performance_start_trace`
- [ ] Use **Lighthouse** for regular audits
- [ ] Track performance metrics in production with Real User Monitoring (RUM)
- [ ] Set performance budgets for each metric
- [ ] Test on real devices and networks
- [ ] Test with throttled CPU and network using `chrome-devtools_emulate`

### ❌ DON'T

- [ ] Don't ignore Core Web Vitals scores
- [ ] Don't only test on fast machines and networks
- [ ] Don't skip performance testing in CI/CD
- [ ] Don't forget to test on mobile devices
- [ ] Don't ignore performance regressions

## JavaScript Optimization

### ✅ DO

- [ ] **Minimize JavaScript bundles** - keep total JS < 200KB (gzipped)
- [ ] Use **code splitting** to load only necessary code
- [ ] Implement **lazy loading** for routes and components
- [ ] Use **dynamic imports** for code that's not immediately needed
- [ ] Defer non-critical JavaScript with `defer` or `async` attributes
- [ ] Remove unused code with tree shaking
- [ ] Minify and compress JavaScript files
- [ ] Use modern JavaScript syntax (ES6+) and transpile only when needed
- [ ] Analyze bundle sizes with webpack-bundle-analyzer or similar
- [ ] Monitor bundle sizes in CI/CD
- [ ] Use `chrome-devtools_list_network_requests` to analyze JS loading

### ❌ DON'T

- [ ] Don't load unnecessary JavaScript on initial page load
- [ ] Don't ignore bundle size warnings
- [ ] Don't use large libraries when smaller alternatives exist
- [ ] Don't forget to remove console.logs and debug code in production
- [ ] Don't load the same library multiple times

## Image Optimization

### ✅ DO

- [ ] **Optimize all images** - use appropriate formats (WebP, AVIF)
- [ ] Use **responsive images** with `srcset` and `sizes` attributes
- [ ] Implement **lazy loading** for images below the fold: `loading="lazy"`
- [ ] Serve images in next-gen formats with fallbacks
- [ ] Compress images without visible quality loss
- [ ] Use proper image dimensions (don't scale in CSS)
- [ ] Use CDN for image delivery
- [ ] Implement image placeholders (blurred, low-quality, or skeleton)
- [ ] Consider using image optimization services (Cloudinary, Imgix)
- [ ] Audit images with `chrome-devtools_list_network_requests`

### ❌ DON'T

- [ ] Don't serve images larger than needed
- [ ] Don't use images for text
- [ ] Don't load images that are not visible
- [ ] Don't skip image compression
- [ ] Don't use GIF when video formats are smaller

## CSS Optimization

### ✅ DO

- [ ] **Minimize CSS bundles** - inline critical CSS
- [ ] Remove unused CSS with PurgeCSS or similar tools
- [ ] Defer non-critical CSS loading
- [ ] Minify and compress CSS files
- [ ] Use CSS containment for performance isolation
- [ ] Avoid CSS @import (use bundlers instead)
- [ ] Use modern CSS features (Grid, Flexbox) instead of heavy frameworks
- [ ] Optimize CSS delivery (inline critical, async for rest)
- [ ] Monitor CSS bundle sizes

### ❌ DON'T

- [ ] Don't load entire CSS frameworks if only using a few components
- [ ] Don't use excessive CSS animations
- [ ] Don't ignore unused CSS bloat
- [ ] Don't block rendering with large CSS files
- [ ] Don't use CSS for what can be done with HTML/native elements

## Resource Loading

### ✅ DO

- [ ] Use **proper caching headers** (Cache-Control, ETag)
- [ ] Implement **preconnect** for critical third-party domains: `<link rel="preconnect">`
- [ ] Use **prefetch** for resources needed soon: `<link rel="prefetch">`
- [ ] Use **preload** for critical resources: `<link rel="preload">`
- [ ] Implement **service workers** for offline support and caching when appropriate
- [ ] Use **HTTP/2 or HTTP/3** for multiplexing
- [ ] Enable **compression** (Gzip, Brotli)
- [ ] Use **CDN** for static assets
- [ ] Implement **resource hints** appropriately
- [ ] Audit resource loading with `chrome-devtools_list_network_requests`

### ❌ DON'T

- [ ] Don't use blocking resources
- [ ] Don't ignore cache configuration
- [ ] Don't skip compression
- [ ] Don't load resources from slow origins
- [ ] Don't abuse preload (only for truly critical resources)

## Rendering Performance

### ✅ DO

- [ ] Use **CSS containment** to limit recalculations
- [ ] Avoid **layout thrashing** (batch DOM reads and writes)
- [ ] Use **transform and opacity** for animations (GPU-accelerated)
- [ ] Implement **virtual scrolling** for long lists
- [ ] Use **IntersectionObserver** for lazy loading and visibility tracking
- [ ] Avoid forced synchronous layouts
- [ ] Debounce or throttle expensive operations (scroll, resize handlers)
- [ ] Use **requestAnimationFrame** for animations
- [ ] Monitor rendering performance with Chrome DevTools Performance tab
- [ ] Test with `chrome-devtools_performance_start_trace`

### ❌ DON'T

- [ ] Don't animate layout properties (width, height, top, left)
- [ ] Don't query layout properties after making changes (causes reflow)
- [ ] Don't render large lists without virtualization
- [ ] Don't use synchronous operations on scroll/resize
- [ ] Don't ignore rendering bottlenecks

## Framework-Specific Optimization

### ✅ DO

- [ ] Use framework-specific **optimization techniques**
- [ ] Implement **code splitting** at route level
- [ ] Use **production builds** (optimized, minified)
- [ ] Leverage framework **performance tools** and profilers
- [ ] Follow framework **best practices** for rendering
- [ ] Use **memoization** for expensive computations (React.memo, useMemo)
- [ ] Implement **lazy loading** for components
- [ ] Use **Suspense** for async loading (React)
- [ ] Optimize **re-renders** by minimizing state updates
- [ ] Use framework dev tools to identify performance issues

### ❌ DON'T

- [ ] Don't use development builds in production
- [ ] Don't over-optimize prematurely
- [ ] Don't ignore framework-specific warnings
- [ ] Don't create unnecessary re-renders
- [ ] Don't skip framework performance documentation

## Network Optimization

### ✅ DO

- [ ] **Reduce number of HTTP requests**
- [ ] Use **HTTP/2** for request multiplexing
- [ ] Implement **connection reuse**
- [ ] Use **domain sharding** sparingly (HTTP/2 makes this obsolete)
- [ ] Optimize **API responses** (pagination, filtering, compression)
- [ ] Implement **request deduplication**
- [ ] Use **efficient data formats** (JSON, Protocol Buffers)
- [ ] Implement **caching strategies** for API responses
- [ ] Test network performance with throttling: `chrome-devtools_emulate`
- [ ] Monitor network requests: `chrome-devtools_list_network_requests`

### ❌ DON'T

- [ ] Don't make unnecessary network requests
- [ ] Don't fetch data that's not displayed
- [ ] Don't ignore slow API endpoints
- [ ] Don't forget to cache API responses
- [ ] Don't use inefficient data formats

## Third-Party Scripts

### ✅ DO

- [ ] **Audit all third-party scripts** for necessity
- [ ] Load third-party scripts **asynchronously**
- [ ] Use **facades** for heavy third-party widgets (YouTube, etc.)
- [ ] Implement **lazy loading** for third-party content
- [ ] Monitor third-party script performance
- [ ] Use **resource hints** for third-party domains
- [ ] Consider **self-hosting** critical third-party resources
- [ ] Set performance budgets for third-party content
- [ ] Use `chrome-devtools_list_network_requests` to identify slow third-party resources

### ❌ DON'T

- [ ] Don't load third-party scripts synchronously
- [ ] Don't use too many third-party services
- [ ] Don't ignore slow third-party resources
- [ ] Don't let third-party scripts block rendering
- [ ] Don't forget to audit third-party performance impact

## Mobile Performance

### ✅ DO

- [ ] Test on **real mobile devices**
- [ ] Optimize for **mobile networks** (3G, 4G)
- [ ] Use **adaptive loading** based on network conditions
- [ ] Implement **responsive images**
- [ ] Reduce **touch interaction delays**
- [ ] Test with CPU and network throttling
- [ ] Optimize for **battery consumption**
- [ ] Use **mobile-first approach**
- [ ] Test with various viewport sizes: `playwright_browser_resize`

### ❌ DON'T

- [ ] Don't only test on desktop
- [ ] Don't assume fast networks
- [ ] Don't ignore mobile-specific performance issues
- [ ] Don't forget to test on older devices
- [ ] Don't use desktop-only optimizations

## Font Loading

### ✅ DO

- [ ] Use **font-display: swap** or **optional**
- [ ] **Preload critical fonts**: `<link rel="preload" as="font">`
- [ ] Use **system fonts** when appropriate
- [ ] Subset fonts to include only needed characters
- [ ] Use **variable fonts** to reduce number of font files
- [ ] Implement **FOUT/FOIT strategies** appropriately
- [ ] Self-host fonts when possible
- [ ] Optimize font file sizes

### ❌ DON'T

- [ ] Don't use too many font variations
- [ ] Don't load fonts synchronously
- [ ] Don't use custom fonts for body text unnecessarily
- [ ] Don't forget to preload critical fonts
- [ ] Don't ignore font loading performance

## Monitoring and Testing

### ✅ DO

- [ ] Use **Chrome DevTools Performance** tab regularly
- [ ] Use **Chrome DevTools MCP tools** for automated testing:
    - `chrome-devtools_performance_start_trace`
    - `chrome-devtools_performance_stop_trace`
    - `chrome-devtools_performance_analyze_insight`
- [ ] Run **Lighthouse audits** regularly (aim for score > 90)
- [ ] Implement **Real User Monitoring (RUM)**
- [ ] Use **synthetic monitoring** for proactive detection
- [ ] Track **performance budgets** in CI/CD
- [ ] Monitor **Core Web Vitals** in production
- [ ] Test under **various network conditions**
- [ ] Use **WebPageTest** for detailed analysis
- [ ] Set up **performance alerts** for regressions

### ❌ DON'T

- [ ] Don't skip regular performance testing
- [ ] Don't ignore Lighthouse warnings
- [ ] Don't only test in ideal conditions
- [ ] Don't forget to test real user scenarios
- [ ] Don't ignore performance trends over time

## Development Workflow

### ✅ DO

- [ ] Set **performance budgets** for each metric
- [ ] Monitor bundle sizes in **pull requests**
- [ ] Run performance tests in **CI/CD**
- [ ] Use **performance profiling** during development
- [ ] Document performance considerations in **code reviews**
- [ ] Use **webpack-bundle-analyzer** or similar tools
- [ ] Profile regularly with **Chrome DevTools**
- [ ] Keep dependencies **up to date**
- [ ] Use **source maps** for production debugging

### ❌ DON'T

- [ ] Don't treat performance as an afterthought
- [ ] Don't skip performance reviews in PRs
- [ ] Don't ignore performance budget violations
- [ ] Don't forget to profile before and after changes
- [ ] Don't ship without performance testing

## MCP Testing Tools

Use these OpenCode MCP tools for performance testing:

- [ ] `chrome-devtools_performance_start_trace({ reload: true, autoStop: true })` - Start performance recording
- [ ] `chrome-devtools_performance_stop_trace()` - Stop and analyze trace
- [ ] `chrome-devtools_performance_analyze_insight()` - Get detailed performance insights
- [ ] `chrome-devtools_list_network_requests()` - Analyze resource loading
- [ ] `chrome-devtools_list_console_messages({ types: ["warn", "error"] })` - Check for performance warnings
- [ ] `chrome-devtools_emulate({ networkConditions: "Slow 3G", cpuThrottlingRate: 4 })` - Test under poor conditions
- [ ] `playwright_browser_resize()` - Test responsive performance

## Related Resources

- **Playwright MCP Tools Reference**: `.opencode/knowledge-base/playwright-mcp-tools.md`
- **Frontend Testing Scenarios**: `.opencode/knowledge-base/frontend-testing-scenarios.md`
- **Playwright Testing Best Practices**: `.opencode/checklist/playwright-testing-best-practices.md`
- **Frontend Testing Agent**: `.opencode/agent/frontend-testing.md`

## Performance Budget Example

```javascript
// performance-budget.json
{
  "lcp": 2500,     // Largest Contentful Paint (ms)
  "fid": 100,      // First Input Delay (ms)
  "cls": 0.1,      // Cumulative Layout Shift
  "fcp": 1800,     // First Contentful Paint (ms)
  "tti": 3800,     // Time to Interactive (ms)
  "tbt": 200,      // Total Blocking Time (ms)
  "totalJS": 200,  // Total JavaScript (KB)
  "totalCSS": 50,  // Total CSS (KB)
  "totalImages": 500, // Total Images (KB)
  "requests": 50   // Total HTTP requests
}
```

## Quick Performance Audit Checklist

Before considering performance complete:

- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Total JS bundle < 200KB (gzipped)
- [ ] Images optimized and lazy loaded
- [ ] CSS minified and critical CSS inlined
- [ ] Caching headers configured
- [ ] CDN configured for static assets
- [ ] Third-party scripts audited and optimized
- [ ] Tested on real devices and throttled networks
- [ ] Performance monitoring in production
- [ ] Performance budgets defined and enforced
- [ ] MCP performance tests automated in CI/CD

## Summary

Frontend performance is critical for user experience and SEO. Focus on:

1. **Core Web Vitals** - Meet all three metrics
2. **Bundle Optimization** - Keep JavaScript small and split
3. **Image Optimization** - Use next-gen formats and lazy loading
4. **Resource Loading** - Cache, compress, and use CDN
5. **Continuous Monitoring** - Test regularly with MCP tools and Lighthouse

Use the Chrome DevTools MCP tools for automated performance testing in your workflow.
