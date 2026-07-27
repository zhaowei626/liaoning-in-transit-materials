# Architecture Checklist

- Static display text, image references, navigation labels, metric values, and chart data live in `src/data/mockData.ts`.
- Reusable UI patterns live in `src/components`.
- Query and filter event handlers are isolated in `src/hooks/useDashboardFilters.ts`.
- Shared clock behavior is isolated in `src/hooks/useClock.ts`.
- Redux Toolkit owns dashboard filter and order-type state.
- Every TSX component and page exports a `Readonly` props interface named after the component.
- Components use Tailwind theme tokens and reusable CSS classes rather than arbitrary hex values.
- Navigation uses Next.js `Link`; the title returns to `/`.
