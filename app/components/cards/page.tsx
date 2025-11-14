'use client';

import { NotificationCard } from '../NotificationCard';
import { ActivityAlertWidget } from '../ActivityAlertWidget';

export default function CardsShowcasePage() {
  return (
    <div className="min-h-screen bg-white p-[80px]">
      <div className="w-full max-w-[1897px] mx-auto bg-white rounded-[24px] p-[80px] flex flex-col gap-[80px]">
        {/* Header */}
        <div className="bg-[#EAF1FF] rounded-[16px] p-[40px]">
          <h1 className="text-[48px] font-bold text-[#17263D] leading-normal tracking-[-1px]">
            Card
          </h1>
        </div>

        {/* Notification Cards Section */}
        <div className="flex flex-col gap-[40px]">
          <h2 className="text-[28px] font-semibold text-[#17263D]">
            Notification Cards
          </h2>

          {/* Critical Severity */}
          <div className="bg-white rounded-[20px] p-[24px] flex flex-col gap-[20px] border border-neutral-200">
            <h3 className="text-[18px] font-semibold text-[#17263D]">
              Critical Severity
            </h3>
            <NotificationCard
              severity="critical"
              title="Northeast Region Execution Rate Below 8%"
              description="Four terminals showing significant performance degradation requiring immediate attention"
              primaryAction="Review"
              secondaryAction="Dismiss"
              onPrimaryAction={() => console.log('Review clicked')}
              onSecondaryAction={() => console.log('Dismiss clicked')}
              onClose={() => console.log('Close clicked')}
            />
            <div className="flex flex-col gap-[8px] text-[12px] text-neutral-600">
              <p><strong>Pill Background:</strong> #FFD6DB (Color/Semantic/Error/100)</p>
              <p><strong>Badge Color:</strong> #FF3B30 (Color/Semantic/Error/500)</p>
            </div>
          </div>

          {/* Warning Severity */}
          <div className="bg-white rounded-[20px] p-[24px] flex flex-col gap-[20px] border border-neutral-200">
            <h3 className="text-[18px] font-semibold text-[#17263D]">
              Warning Severity
            </h3>
            <NotificationCard
              severity="warning"
              title="System Maintenance Scheduled"
              description="Scheduled maintenance will begin in 2 hours. Please save your work and log out before that time."
              primaryAction="Review"
              secondaryAction="Dismiss"
              onPrimaryAction={() => console.log('Review clicked')}
              onSecondaryAction={() => console.log('Dismiss clicked')}
              onClose={() => console.log('Close clicked')}
            />
            <div className="flex flex-col gap-[8px] text-[12px] text-neutral-600">
              <p><strong>Pill Background:</strong> #FFF5CC (Color/Semantic/Warning/100)</p>
              <p><strong>Badge Color:</strong> #FFD400 (Color/Semantic/Warning/500)</p>
            </div>
          </div>

          {/* Info Severity */}
          <div className="bg-white rounded-[20px] p-[24px] flex flex-col gap-[20px] border border-neutral-200">
            <h3 className="text-[18px] font-semibold text-[#17263D]">
              Info Severity
            </h3>
            <NotificationCard
              severity="info"
              title="New Features Available"
              description="We've released new dashboard analytics features. Check out the updated interface with enhanced reporting capabilities."
              primaryAction="Review"
              secondaryAction="Dismiss"
              onPrimaryAction={() => console.log('Review clicked')}
              onSecondaryAction={() => console.log('Dismiss clicked')}
              onClose={() => console.log('Close clicked')}
            />
            <div className="flex flex-col gap-[8px] text-[12px] text-neutral-600">
              <p><strong>Pill Background:</strong> #D6EDFF (Color/Semantic/Info/100)</p>
              <p><strong>Badge Color:</strong> #007AFF (Color/Semantic/Info/500)</p>
            </div>
          </div>

          {/* Success Severity */}
          <div className="bg-white rounded-[20px] p-[24px] flex flex-col gap-[20px] border border-neutral-200">
            <h3 className="text-[18px] font-semibold text-[#17263D]">
              Success Severity
            </h3>
            <NotificationCard
              severity="success"
              title="Deployment Completed Successfully"
              description="All systems have been updated and are running smoothly. No action required from your end."
              primaryAction="Review"
              secondaryAction="Dismiss"
              onPrimaryAction={() => console.log('Review clicked')}
              onSecondaryAction={() => console.log('Dismiss clicked')}
              onClose={() => console.log('Close clicked')}
            />
            <div className="flex flex-col gap-[8px] text-[12px] text-neutral-600">
              <p><strong>Pill Background:</strong> #D6F5E1 (Color/Semantic/Success/100)</p>
              <p><strong>Badge Color:</strong> #34C759 (Color/Semantic/Success/500)</p>
            </div>
          </div>
        </div>

        {/* Validation Table */}
        <div className="bg-neutral-100 rounded-[20px] p-[24px]">
          <h2 className="text-[28px] font-bold text-[#17263D] mb-[24px]">
            Validation: Figma vs Implementation
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-300">
                  <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Property</th>
                  <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Figma Value</th>
                  <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Implemented</th>
                  <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-200 bg-primary-100">
                  <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>CARD DIMENSIONS</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Width</td>
                  <td className="py-[12px] px-[16px] text-[12px]">540px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">540px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Padding</td>
                  <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Border Radius</td>
                  <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Background Color</td>
                  <td className="py-[12px] px-[16px] text-[12px]">#F3F6F9</td>
                  <td className="py-[12px] px-[16px] text-[12px]">#F3F6F9</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200 bg-accent-100">
                  <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>INTERNAL SPACING</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Body Padding Bottom</td>
                  <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Header to Description Gap</td>
                  <td className="py-[12px] px-[16px] text-[12px]">4px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">4px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Status Pill to Title Gap</td>
                  <td className="py-[12px] px-[16px] text-[12px]">8px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">8px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Title to Close Button Gap</td>
                  <td className="py-[12px] px-[16px] text-[12px]">24px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">24px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Actions Border Top</td>
                  <td className="py-[12px] px-[16px] text-[12px]">0.5px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">0.5px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Actions Padding Top</td>
                  <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Button Gap</td>
                  <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200 bg-success-100">
                  <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>STATUS PILL</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Padding</td>
                  <td className="py-[12px] px-[16px] text-[12px]">2px 12px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">2px 12px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Border Radius</td>
                  <td className="py-[12px] px-[16px] text-[12px]">9999px (full)</td>
                  <td className="py-[12px] px-[16px] text-[12px]">9999px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Badge Size</td>
                  <td className="py-[12px] px-[16px] text-[12px]">8px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">8px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Badge to Text Gap</td>
                  <td className="py-[12px] px-[16px] text-[12px]">4px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">4px</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200 bg-warning-100">
                  <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>TYPOGRAPHY</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Status Text</td>
                  <td className="py-[12px] px-[16px] text-[12px]">14px / 22px / 400</td>
                  <td className="py-[12px] px-[16px] text-[12px]">14px / 22px / 400</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Title</td>
                  <td className="py-[12px] px-[16px] text-[12px]">16px / 24px / 600</td>
                  <td className="py-[12px] px-[16px] text-[12px]">16px / 24px / 600</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Description</td>
                  <td className="py-[12px] px-[16px] text-[12px]">12px / 20px / 400</td>
                  <td className="py-[12px] px-[16px] text-[12px]">12px / 20px / 400</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Button Text</td>
                  <td className="py-[12px] px-[16px] text-[12px]">12px / 20px / 400</td>
                  <td className="py-[12px] px-[16px] text-[12px]">12px / 20px / 400</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200 bg-error-100">
                  <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>COLOR TOKENS</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Card Background</td>
                  <td className="py-[12px] px-[16px] text-[12px]">Color/Neutral/100</td>
                  <td className="py-[12px] px-[16px] text-[12px]">#F3F6F9</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Text Primary</td>
                  <td className="py-[12px] px-[16px] text-[12px]">Color/Text/Primary</td>
                  <td className="py-[12px] px-[16px] text-[12px]">#17263D</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Text Secondary</td>
                  <td className="py-[12px] px-[16px] text-[12px]">Color/Text/Secondary</td>
                  <td className="py-[12px] px-[16px] text-[12px]">#7F8FA4</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Border</td>
                  <td className="py-[12px] px-[16px] text-[12px]">Color/Border/Default</td>
                  <td className="py-[12px] px-[16px] text-[12px]">#C3CDD9</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
                <tr>
                  <td className="py-[12px] px-[16px] text-[12px] font-medium">Button Text (Primary)</td>
                  <td className="py-[12px] px-[16px] text-[12px]">Color/Text/On Dark</td>
                  <td className="py-[12px] px-[16px] text-[12px]">#F9FAFB</td>
                  <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Alert Widget Section */}
        <div className="flex flex-col gap-[40px]">
          <h2 className="text-[28px] font-semibold text-[#17263D]">
            Activity Alert Widget
          </h2>

          <div className="w-full flex justify-center">
            <ActivityAlertWidget />
          </div>

          <div className="bg-neutral-100 rounded-[20px] p-[24px]">
            <h3 className="text-[18px] font-semibold text-[#17263D] mb-[16px]">
              Widget Features
            </h3>
            <div className="flex flex-col gap-[12px] text-[14px] text-neutral-700">
              <div className="flex gap-[8px]">
                <span className="font-semibold">✓</span>
                <p><strong>Collapsible Section:</strong> Click the chevron icon to expand/collapse the alerts</p>
              </div>
              <div className="flex gap-[8px]">
                <span className="font-semibold">✓</span>
                <p><strong>Horizontal Scroll:</strong> Cards scroll horizontally when there are more than fit in view</p>
              </div>
              <div className="flex gap-[8px]">
                <span className="font-semibold">✓</span>
                <p><strong>Dismiss All:</strong> Click "Dismiss All" to clear all alerts at once</p>
              </div>
              <div className="flex gap-[8px]">
                <span className="font-semibold">✓</span>
                <p><strong>Individual Dismiss:</strong> Click X or "Dismiss" button on any card to remove it</p>
              </div>
              <div className="flex gap-[8px]">
                <span className="font-semibold">✓</span>
                <p><strong>Width:</strong> 1187px (matches Figma specification)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
