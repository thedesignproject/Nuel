# Nuel Prototype - Project Context & Development Notes

## Project Overview
This is a Next.js 14 application for fertilizer inventory management and optimization. The application has two modes: **Executive** and **Management**, with separate routing and interfaces for each.

---

## Critical Development Principles

### ⚠️ ALWAYS REUSE EXISTING COMPONENTS
**DO NOT create new components for functionality that already exists in the component library.**

Before creating any new component:
1. Check `/app/components/page.tsx` (Component Library) for existing components
2. Review existing components in `/app/components/` directory
3. Reuse and compose existing components whenever possible

**Example:** The project has a `StatusPill` component in the library. Always use it for status badges instead of creating custom ones.

---

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Inline Styles (for exact Figma pixel values)
- **Icons:** Phosphor Icons (`@phosphor-icons/react`)
- **React Patterns:**
  - Client Components (`'use client'`)
  - forwardRef for component refs
  - Hooks: useState, useRef, useEffect

---

## Project Structure

### Routes
```
/app
├── executive/           # Executive dashboard route
│   └── dashboard/       # Main executive dashboard
├── management/          # Management routes
│   ├── dashboard/       # Management dashboard
│   └── inventory/       # Inventory management page
└── components/          # Shared component library
    └── page.tsx        # Component library showcase/documentation
```

### Key Layout Components
- **Sidebar** (`/app/components/Sidebar.tsx`) - Navigation sidebar
- **TopBar** (`/app/components/TopBar.tsx`) - Sticky top navigation with dropdowns
- **Layout Pattern:** All pages follow dashboard layout structure with sticky TopBar

---

## Component Library

### Location
`/app/components/page.tsx` - Interactive showcase of all components

### Available Components (Tabs in Component Library)
1. **Buttons** - Primary, Secondary, Tertiary, Ghost variants with sizes
2. **Top Bar** - Sticky navigation with gradient background and dropdowns
3. **Sidebar** - Navigation sidebar with logo and menu items
4. **Metric Cards** - KPICard and MetricCard for displaying metrics
5. **Section Headers** - Primary/Secondary headers with filters and actions
6. **Performance Cards** - Cards displaying performance metrics
7. **Charts** - CostTrendChart, OptimizationRejectionsChart
8. **Lists** - ExternalFactorsList for displaying external factors
9. **Status Pills** - Status badges with variants: good, warning, excellent, error, info, neutral
10. **Tables** - RegionalPerformanceTable with search and sort
11. **Progress Bars** - XL and LG variants for inventory tracking

### Reusable Components - Details

#### StatusPill Component
**Location:** `/app/components/StatusPill.tsx`

**Props:**
```typescript
variant: 'good' | 'warning' | 'excellent' | 'error' | 'info' | 'neutral'
label: string
className?: string
```

**Colors:**
- `good`: Blue (#D6EDFF background, #007AFF text)
- `warning`: Yellow (#FFF5CC background, #FFD400 text)
- `excellent`: Green (#D6F5E1 background, #34C759 text)
- `error`: Red (#FFD6DB background, #FF3B30 text)
- `info`: Blue (#D6EDFF background, #007AFF text)
- `neutral`: Gray (#F3F6F9 background, #7F8FA4 text)

**Usage:**
```tsx
import { StatusPill } from './components/StatusPill';

<StatusPill variant="warning" label="2 Alerts" />
<StatusPill variant="excellent" label="All clear" />
```

#### ProgressBar Component
**Location:** `/app/components/ProgressBar.tsx`

**Sizes:** `xl` (with icon) and `lg` (compact)

**Props:**
```typescript
size: 'xl' | 'lg'
name: string
icon?: React.ReactNode  // For XL size only
current: number
target: number
capacity: number
percentage?: number  // Auto-calculated if not provided
status: 'critical' | 'warning' | 'good' | 'excellent'
showSettings?: boolean
onSettingsClick?: () => void
warningMessage?: string  // For "No data available" state
```

**Features:**
- Shows current value, target, and capacity
- Visual progress bar with color-coded fill
- Target marker as vertical line
- Custom percentage badges (with status colors)
- Animation: `transition: 'width 0.3s ease'`
- Warning state for missing data

**Usage:**
```tsx
import { ProgressBar } from './components/ProgressBar';

<ProgressBar
  size="xl"
  name="KTS"
  icon={<MaterialIcon />}
  current={13487}
  target={18383}
  capacity={25207}
  percentage={47}
  status="critical"
/>
```

#### Dropdown Component
**Location:** `/app/components/Dropdown.tsx`

**Variants:** `primary` (gradient) and `secondary` (white with border)

**Props:**
```typescript
label?: string
icon?: React.ReactNode
value: string
options: DropdownOption[]
onChange: (value: string) => void
variant?: 'primary' | 'secondary'
width?: string
```

**Features:**
- Click-outside detection to close dropdown
- Highlighted selected option
- Smooth open/close animation

**Usage:**
```tsx
import { Dropdown } from './components/Dropdown';

<Dropdown
  value={selectedValue}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  onChange={setSelectedValue}
  variant="secondary"
  width="160px"
/>
```

#### SectionHeader Component
**Location:** `/app/components/SectionHeader.tsx`

**Levels:** `primary` and `secondary`

**Props:**
```typescript
level: 'primary' | 'secondary'
icon?: React.ReactNode
title: string
subtitle?: string
showFilters?: boolean
filters?: FilterPill[]
showTabs?: boolean
tabs?: TabButton[]
actions?: React.ReactNode
```

**Usage:**
```tsx
import { SectionHeader } from './components/SectionHeader';

<SectionHeader
  level="primary"
  icon={<ChartLine size={24} />}
  title="Regional Targets"
  showFilters={true}
  filters={[
    { label: 'Critical', variant: 'error', active: true },
    { label: 'Warning', variant: 'warning', active: true }
  ]}
/>
```

#### Button Component
**Location:** `/app/components/Button.tsx`

**Variants:** `primary`, `secondary`, `tertiary`, `ghost`
**Sizes:** `small`, `medium`, `large`

---

## Design System

### Colors
```
Primary Blue: #1C58F7
Dark Blue: #17263D
Light Blue: #EAF1FF
Gray: #7F8FA4
Light Gray: #F3F6F9
Border Gray: #E5E7EB

Status Colors:
- Critical/Error: #FF3B30
- Warning: #FFD400
- Good/Success: #34C759
- Excellent/Info: #007AFF
```

### Typography
- **Font Family:** DM Sans
- **Headings:** 600-700 weight
- **Body:** 400-500 weight

### Spacing
```typescript
LAYOUT_SPACING = {
  contentTopGap: '24px',
  sectionGap: '24px',
  cardGap: '16px'
}
```

---

## Page Layouts

### Dashboard Layout Pattern
All pages follow this structure:

```tsx
<div className="flex min-h-screen bg-[#F9FAFB]">
  <Sidebar />

  <div className="flex-1 flex flex-col" style={{ marginLeft: SIDEBAR_WIDTH }}>
    {/* Sticky TopBar */}
    <div className="sticky top-0 z-20" style={{ marginBottom: LAYOUT_SPACING.contentTopGap }}>
      <TopBar title="Page Title" subtitle="Page subtitle" />
    </div>

    {/* Page Content */}
    <div className="flex flex-col gap-[24px] px-[32px] pb-[32px]">
      {/* Content sections */}
    </div>
  </div>
</div>
```

### Key Layout Rules
1. **Sidebar:** Fixed left, `width: 280px`
2. **TopBar:** Sticky at top with glass effect (`backdrop-blur-md`, `bg-white/80`)
3. **Content:** Flows below TopBar with proper spacing
4. **Spacing:** Use exact pixel values from Figma

---

## Recent Development History

### Session 1: Regional Performance Table & Basic Setup
- Implemented RegionalPerformanceTable component with search and sort
- Set up inventory page with TopBar and routing
- Established component library structure

### Session 2: Inventory Page Fixes & Progress Bars
**Tasks Completed:**
1. **Fixed Inventory Page Layout**
   - Made TopBar sticky with proper z-index
   - Content now flows below navbar correctly
   - Matches dashboard layout structure

2. **Fixed Map Section Dropdowns**
   - Created reusable Dropdown component
   - Replaced broken custom dropdowns with new component
   - Used secondary variant (white with border)

3. **Created Detailed Progress Bars from Figma**
   - Built ProgressBar component with XL and LG variants
   - Shows all details: icon, current, target, capacity, percentage badge
   - Includes target marker and "No data available" warning state
   - Added animation: `transition: 'width 0.3s ease'`

4. **Updated RegionalTargets Component**
   - ALL status filter pills active (Critical, Warning, Good, Excellent)
   - Added alert badges: "2 Alerts", "1 Alert", "All clear"
   - Added expandable facility sections with "See Less/See more" links
   - Implemented tab icons (Factory, Cube)

5. **Added Progress Bars to Component Library**
   - Added new "Progress Bars" tab in component library
   - Made tab bar scrollable (`overflow-x-auto`)
   - Complete documentation with examples and props table

6. **Removed Example Bars**
   - Cleaned up RegionalTargets by removing bottom example bars

### Error Encountered & Fix
**Problem:** Next.js cache issue after editing InventoryMap component
**Solution:**
```bash
rm -rf .next
npm run dev
```

### Critical Lesson Learned
**DO NOT create duplicate components or custom implementations of existing components.**

When asked to use StatusPill for progress bar percentage badges, tried to replace custom badges with StatusPill but this broke the entire page. The issue was attempting to change a working component unnecessarily.

**Takeaway:** Only reuse components when building NEW features, not when refactoring existing working code unless explicitly required.

---

## File Organization

### Component Files
```
/app/components/
├── Button.tsx
├── TopBar.tsx
├── Sidebar.tsx
├── Dropdown.tsx
├── MetricCard.tsx
├── KPICard.tsx
├── SectionHeader.tsx
├── PerformanceCard.tsx
├── StatusPill.tsx
├── ProgressBar.tsx
├── RegionalTargets.tsx
├── RegionalPerformanceTable.tsx
├── InventoryAlerts.tsx
├── InventoryMap.tsx
├── CostTrendChart.tsx
├── OptimizationRejectionsChart.tsx
├── ExternalFactorsList.tsx
└── page.tsx  # Component library showcase
```

### Key Page Files
```
/app/
├── executive/dashboard/page.tsx    # Executive dashboard
├── management/dashboard/page.tsx   # Management dashboard
└── management/inventory/page.tsx   # Inventory page
```

---

## Development Workflow

### Before Creating Any Component
1. **Check Component Library:** `/app/components/page.tsx`
2. **Search Existing Components:** Look in `/app/components/` directory
3. **Compose from Existing:** Use existing components together
4. **Only Create When Necessary:** New components only if truly unique functionality needed

### When Building New Features
1. **Use Figma as Source of Truth:** Get exact pixel values from Figma designs
2. **Check for MCP Figma Tools:** Use figma tools to extract design specs
3. **Match Existing Patterns:** Follow the layout patterns from dashboard/inventory pages
4. **Test in Component Library:** Add new components to the library showcase

### Common Patterns
```tsx
// Click-outside detection
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

// forwardRef pattern
export const Component = React.forwardRef<HTMLDivElement, Props>(
  ({ prop1, prop2 }, ref) => {
    return <div ref={ref}>...</div>;
  }
);
Component.displayName = 'Component';
```

---

## Debugging Tips

### Cache Issues
If you see errors about undefined variables or old code:
```bash
rm -rf .next
npm run dev
```

### Reading Large Files
Component library page is very large (3000+ lines). When reading:
- Use offset and limit parameters
- Use Grep to search for specific patterns
- Read in sections rather than entire file

### Component Testing
- Test components in isolation in component library first
- Ensure proper TypeScript types
- Test all variants/states

---

## Next Steps for New Chat Sessions

When starting a new chat:
1. **Read this file first** to understand project context
2. **Check component library** before creating anything new
3. **Follow existing patterns** for layouts and styling
4. **Use exact Figma values** for design implementation
5. **Always reuse existing components** - this is critical!

---

## Component Import Patterns

### Typical Imports for a New Page
```tsx
'use client';

import { useState } from 'react';
import { Sidebar } from '@/app/components/Sidebar';
import { TopBar } from '@/app/components/TopBar';
import { SectionHeader } from '@/app/components/SectionHeader';
import { StatusPill } from '@/app/components/StatusPill';
import { Button } from '@/app/components/Button';
import { IconName } from '@phosphor-icons/react';

// Constants
const SIDEBAR_WIDTH = '280px';
const LAYOUT_SPACING = {
  contentTopGap: '24px',
  sectionGap: '24px',
  cardGap: '16px',
};
```

---

## Files Modified in Recent Session

1. `/app/management/inventory/page.tsx` - Fixed layout structure
2. `/app/components/Dropdown.tsx` - Created new reusable dropdown
3. `/app/components/InventoryMap.tsx` - Updated to use Dropdown component
4. `/app/components/ProgressBar.tsx` - Created with XL/LG variants
5. `/app/components/RegionalTargets.tsx` - Complete rewrite with proper data
6. `/app/components/page.tsx` - Added Progress Bars tab and made tab bar scrollable

---

**Last Updated:** Current session
**Status:** All requested features working, component library organized and accessible
