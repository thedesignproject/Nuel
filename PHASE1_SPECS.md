# PHASE 1 - FIGMA SPECIFICATIONS
## Distribution Planning Tab & Execution Card Component

---

## DISTRIBUTION PLANNING TAB STRUCTURE

### Tab Position
- New tab in existing Forecast page Tabs component
- Tab label: "Distribution Planning"
- Position: 4th tab (after "Target Inventory", before "Budget Planning")

### Tab Content Layout

#### Section 1: Priority Distribution Actions
**Section Header:**
- Title: "Priority Distribution Actions"
- Badge: "KTS" (small pill badge, appears to be gray/neutral)
- Subtitle/Description: "Enhanced action cards with multiple solution options and status tracking"
- Typography:
  - Title: Large, bold, dark text (~24px)
  - Badge: Small caps text in pill
  - Description: Small, gray text (~14px)

**Filter Section (Right-aligned):**
- Label: "Filter by:"
- Status Filters (horizontal layout):
  - Critical (1) - Red dot + text
  - Warning (2) - Yellow dot + text
  - Completed (1) - Green dot + text
- Typography: Small text (~12-14px)

**Spacing:**
- Section header to cards: ~24-32px
- Between section header and subtitle: ~8px

---

## EXECUTION CARD COMPONENT SPECIFICATIONS

### Card Container
- **Background:** White (#ffffff - COLORS.neutral[0])
- **Border Radius:** 16px (CARD_CURVATURE token)
- **Shadow:** Subtle elevation (box-shadow, appears to be soft shadow)
- **Border:** None or very subtle border
- **Padding:** 24px on all sides
- **Width:** Full width in grid (responsive)
- **Margin Bottom:** ~16-24px between cards

### Card Layout Structure

#### 1. CARD HEADER SECTION
**Layout:** Horizontal flexbox
- Left: Alert Icon
- Center: Title Text
- Right: Status Badge

**Alert Icon:**
- Icon: Bell/notification icon
- Background: Light blue circle (#eaf1ff or similar - COLORS.accent[100])
- Icon color: Blue (#365ec8 - COLORS.primary[500])
- Size: ~40px circle
- Margin right: 12px

**Title:**
- Typography: Bold, large text (~18-20px, weight 700)
- Color: Dark text (#17263d - COLORS.text.primary)
- Example: "Critical Shortage Risk — Houston Terminal"

**Status Badge:**
- Shape: Pill/rounded rectangle (border-radius: 9999px - BORDER_RADIUS.full)
- Padding: 4px 12px
- Typography: Small text (~12px, weight 500)
- Variants:
  - **Critical:** Background #FFD6DB (COLORS.semantic.error[100]), Text #FF3B30 (COLORS.semantic.error[500])
  - **Warning:** Background #FFF5CC (COLORS.semantic.warning[100]), Text #C9A700 (COLORS.semantic.warning[500])
  - **Completed:** Background light green, Text green

#### 2. CARD BODY SECTION
**Spacing from header:** 16px

**Description Text:**
- Typography: Regular text (~14-16px, weight 400)
- Color: Medium gray (#7f8fa4 - COLORS.text.secondary)
- Line height: 1.5
- Max lines: 2-3 lines
- Example: "Current inventory at 45% capacity with forecasted demand exceeding supply by 2,800 tons over next 8 weeks"

**Metadata Row:**
- Spacing from description: 12px
- Layout: Horizontal flexbox with gap
- Items: Due date | Potential Savings

**Due Date:**
- Icon: Calendar icon (small, gray)
- Text: "DUE: 7/9/2025"
- Typography: Small text (~12px)
- Color: Gray (#7f8fa4)

**Potential Savings:**
- Icon: Dollar/target icon (small, gray)
- Text: "$125,000 POTENTIAL SAVINGS"
- Typography: Small text (~12px)
- Color: Gray (#7f8fa4)

#### 3. ACTION OPTIONS TOGGLE
**Spacing from metadata:** 16px

**Toggle Button:**
- Typography: Medium text (~14px, weight 500)
- Color: Blue (#365ec8 - COLORS.primary[500])
- Icon: Chevron up/down
- Text variations:
  - Expanded: "Hide Action Options (2 available)"
  - Collapsed: "Review Action Options (2 available)"
- Interactive: Cursor pointer, hover state

#### 4. ACTION OPTIONS SECTION (When Expanded)
**Spacing from toggle:** 16px
**Layout:** 2-column grid
**Gap:** 16px between cards
**Background:** Light background for each option card

**Action Option Card:**
- Background: Very light gray/blue (#f9fafb or lighter)
- Border radius: 12px (BORDER_RADIUS.md)
- Padding: 16px
- Border: 1px solid very light border or none

**Option Card Header:**
- Title: Bold text (~16px, weight 600)
- Badge (optional): "Recommended" pill
  - Background: Blue (#365ec8 - COLORS.primary[500])
  - Text: White
  - Position: Top right or next to title

**Option Card Description:**
- Text: ~14px, regular weight
- Color: Dark text
- Spacing: 12px below title

**Option Card Metadata:**
- Layout: Vertical list with icon + text
- Spacing: 8px between items
- Items:
  - Dollar icon + "Cost: $15,000"
  - Truck/delivery icon + "Delivery: 2-3 days"
  - Target/impact icon + "Impact: Complete resolution"
- Typography: Small text (~12-13px)
- Icon size: ~16px
- Icon color: Gray

**Option Card Button:**
- Spacing from metadata: 16px
- Full width button
- Variants:
  - **Primary (Recommended):** Dark blue background, white text
  - **Secondary:** White background, blue border, blue text
- Text: "Execute this option"
- Height: ~40px
- Border radius: 8px

#### 5. FOOTER ACTION BUTTONS (When Collapsed)
**Spacing from toggle:** 16px
**Layout:** Horizontal flexbox, right-aligned
**Gap:** 12px between buttons

**Buttons:**
1. **Execute Recommended**
   - Type: Primary filled button
   - Background: Dark blue (#365ec8)
   - Text: White
   - Icon: Checkmark icon (left)
   - Padding: 10px 20px
   - Border radius: 8px

2. **Schedule for later**
   - Type: Secondary outline button
   - Background: White
   - Border: 1px solid blue
   - Text: Blue
   - Icon: Clock icon (left)
   - Padding: 10px 20px
   - Border radius: 8px

3. **Dismiss**
   - Type: Text link
   - Color: Gray (#7f8fa4)
   - No border/background
   - Typography: ~14px

---

## EXECUTION CARDS DATA

### Card 1: Critical Shortage Risk — Houston Terminal
```javascript
{
  id: 1,
  icon: "bell",
  title: "Critical Shortage Risk — Houston Terminal",
  status: "critical",
  statusLabel: "Critical",
  description: "Current inventory at 45% capacity with forecasted demand exceeding supply by 2,800 tons over next 8 weeks",
  dueDate: "7/9/2025",
  potentialSavings: "$125,000",
  actionOptionsCount: 2,
  defaultExpanded: true,
  actionOptions: [
    {
      id: "option1",
      title: "Emergency Transfer",
      recommended: true,
      description: "Transfer 3,000 tons from Donaldsonville via Priority Rail",
      cost: "$15,000",
      delivery: "2-3 days",
      impact: "Complete resolution",
      buttonVariant: "primary"
    },
    {
      id: "option2",
      title: "Split Transfer",
      recommended: false,
      description: "1,500 tons from Donaldsonville + 1,500 tons from Augusta",
      cost: "$22,000",
      delivery: "4-5 days",
      impact: "With redundancy",
      buttonVariant: "secondary"
    }
  ]
}
```

### Card 2: Optimization Opportunity — Midwest Region
```javascript
{
  id: 2,
  icon: "bell",
  title: "Optimization Opportunity — Midwest Region",
  status: "warning",
  statusLabel: "Warning",
  description: "Current inventory at 45% capacity with forecasted demand exceeding supply by 2,800 tons over next 8 weeks",
  dueDate: "7/3/2025",
  potentialSavings: "$125,000",
  actionOptionsCount: 2,
  defaultExpanded: false,
  quickActions: [
    {
      id: "execute",
      label: "Execute Recommended",
      icon: "check",
      variant: "primary"
    },
    {
      id: "schedule",
      label: "Schedule for later",
      icon: "clock",
      variant: "secondary"
    },
    {
      id: "dismiss",
      label: "Dismiss",
      variant: "text"
    }
  ],
  actionOptions: [
    // Hidden when collapsed
    // Assume similar structure to Card 1
  ]
}
```

---

## GRID LAYOUT SPECIFICATIONS

**Container:**
- Display: Grid or flexbox column
- Width: Full width of tab content area
- Padding: Match other tabs (24px horizontal)

**Cards Layout:**
- Display: Vertical stack (1 column)
- Gap: 24px between cards
- Each card: Full width

**Responsive Behavior:**
- Mobile: Single column, full width
- Tablet: Single column, full width
- Desktop: Single column, full width
- Action option cards within expanded state: 2 columns on desktop, 1 column on mobile

---

## COLOR TOKEN MAPPING

**Card Backgrounds:**
- Main card: `COLORS.neutral[0]` (#ffffff)
- Action option cards: `COLORS.neutral[50]` (#f9fafb)

**Status Badges:**
- Critical: bg `COLORS.semantic.error[100]`, text `COLORS.semantic.error[500]`
- Warning: bg `COLORS.semantic.warning[100]`, text `COLORS.semantic.warning[500]`
- Completed: bg light green, text green (add to tokens)

**Icon Backgrounds:**
- Alert icon: `COLORS.accent[100]` (#eaf1ff)
- Icon color: `COLORS.primary[500]` (#365ec8)

**Text Colors:**
- Primary text (titles): `COLORS.text.primary` (#17263d)
- Secondary text (descriptions, metadata): `COLORS.text.secondary` (#7f8fa4)

**Buttons:**
- Primary: bg `COLORS.primary[500]`, text white
- Secondary: bg white, border `COLORS.primary[500]`, text `COLORS.primary[500]`
- Text links: `COLORS.text.secondary`

**Borders:**
- Card borders (if any): `COLORS.border.subtle` (#d9e0e9)

---

## FONT TOKEN MAPPING

**Card Title:**
- Use `TYPOGRAPHY.bodyLargeBold` or similar (18px, weight 700)

**Status Badge:**
- Use `TYPOGRAPHY.bodyExtraSmallMedium` (12px, weight 500)

**Description:**
- Use `TYPOGRAPHY.bodySmallMedium` or regular variant (14px, weight 400)

**Metadata (Due date, Savings):**
- Use `TYPOGRAPHY.bodyExtraSmallText` (12px, weight 400)

**Action Option Title:**
- Use `TYPOGRAPHY.bodySmallMedium` (14px, weight 500)

**Buttons:**
- Use `TYPOGRAPHY.bodySmallMedium` (14px, weight 500)

---

## INTERACTIONS & STATES

**Toggle Behavior:**
- Click to expand/collapse action options
- Smooth transition animation
- Icon rotation (chevron up/down)
- Content height animation

**Hover States:**
- Buttons: Slight background color darkening
- Toggle link: Underline
- Action option cards: Subtle border highlight

**Focus States:**
- All interactive elements: Blue outline
- Keyboard navigation support

---

## ACCESSIBILITY REQUIREMENTS

**Semantic HTML:**
- Use `<article>` for each execution card
- Use `<button>` for all clickable actions
- Use proper heading hierarchy

**ARIA Labels:**
- `aria-expanded` on toggle button
- `aria-label` for icon-only buttons
- `role="status"` for status badges

**Keyboard Navigation:**
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys for focus management

---

## COMPONENT PROPS STRUCTURE

```typescript
interface ExecutionCardProps {
  id: number | string;
  icon: string; // Icon name
  title: string;
  status: 'critical' | 'warning' | 'completed';
  statusLabel: string;
  description: string;
  dueDate: string;
  potentialSavings: string;
  actionOptionsCount: number;
  defaultExpanded?: boolean;
  actionOptions?: ActionOption[];
  quickActions?: QuickAction[];
}

interface ActionOption {
  id: string;
  title: string;
  recommended?: boolean;
  description: string;
  cost: string;
  delivery: string;
  impact: string;
  buttonVariant: 'primary' | 'secondary';
}

interface QuickAction {
  id: string;
  label: string;
  icon?: string;
  variant: 'primary' | 'secondary' | 'text';
}
```

---

## NEXT STEPS FOR PHASE 2

1. Create ExecutionCard component with exact specifications
2. Implement expandable/collapsible behavior
3. Create ActionOptionCard sub-component
4. Apply all design tokens (colors, fonts, spacing)
5. Implement hover and focus states
6. Add accessibility features
7. Test with different data configurations
8. Ensure responsive behavior

**READY FOR APPROVAL TO PROCEED TO PHASE 2**
