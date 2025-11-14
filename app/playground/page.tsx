'use client';

import { typography } from '@/lib/design-tokens/typography';
import { colors } from '@/lib/design-tokens/colors';
import { iconSizes, iconWeights, iconUsageGuidelines, commonIcons } from '@/lib/design-tokens/icons';
import {
  House, List, X, ArrowLeft, MagnifyingGlass, Plus, PencilSimple,
  Trash, FloppyDisk, Download, Upload, ShareNetwork, CheckCircle,
  XCircle, Warning, Info, User, Users, Gear, SignOut, Envelope,
  Chat, Phone, Bell, Heart, Star, ShoppingCart, CreditCard,
  Globe, Lock, Eye, Calendar, Clock, File, Folder, Image,
  Video, Music, Code, Database, Cloud, Lightning
} from '@phosphor-icons/react';

export default function TypographyPlayground() {
  return (
    <div className="min-h-screen bg-white p-8 md:p-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-blue-50 rounded-2xl p-10 mb-20">
          <h1 className="text-h1 font-bold text-[#17263D]">Typography</h1>
          <p className="text-body-lg font-regular text-gray-700 mt-4">
            DM Sans - 9 font weights available
          </p>
        </div>

        {/* Special Headings Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Special Headings</h2>
          </div>

          <div className="space-y-12">
            {/* Heading H1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h4 font-bold text-[#111928] mb-6">Heading H1</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Bold</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>60px / 72px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-h1 font-bold text-[#111928]">
                  Lorem ipsum dolor sit amet, adipiscing elit.
                </p>
              </div>
            </div>

            {/* Heading H2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h4 font-bold text-[#111928] mb-6">Heading H2</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Bold</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>48px / 58px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-h2 font-bold text-[#111928]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>

            {/* Heading H3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h4 font-bold text-[#111928] mb-6">Heading H3</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Bold</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>40px / 48px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-h3 font-bold text-[#111928]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>

            {/* Heading H4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h4 font-bold text-[#111928] mb-6">Heading H4</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Bold</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>30px / 38px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-h4 font-bold text-[#111928]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>

            {/* Heading H5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h4 font-bold text-[#111928] mb-6">Heading H5</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>SemiBold</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>28px / 40px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-h5 font-semibold text-[#111928]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>

            {/* Heading H6 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h4 font-bold text-[#111928] mb-6">Heading H6</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>SemiBold</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>24px / 30px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-h6 font-semibold text-[#111928]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Body Large Text Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Body Large Text</h2>
          </div>

          <div className="space-y-12">
            {/* Body Large Regular */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Large Regular</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Regular</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>18px / 26px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-lg font-regular text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet.
                </p>
              </div>
            </div>

            {/* Body Large Medium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Large Medium</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Medium</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>18px / 26px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-lg font-medium text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet.
                </p>
              </div>
            </div>

            {/* Body Large SemiBold */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Large SemiBold</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>SemiBold</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>18px / 26px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-lg font-semibold text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet.
                </p>
              </div>
            </div>

            {/* Body Large Bold */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Large Bold</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Bold</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>18px / 26px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-lg font-bold text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Body Medium Text Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Body Medium Text</h2>
          </div>

          <div className="space-y-12">
            {/* Body Medium Regular */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Medium Regular</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Regular</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>16px / 24px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-md font-regular text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet.
                </p>
              </div>
            </div>

            {/* Body Medium Medium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Medium Medium</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Medium</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>16px / 24px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-md font-medium tracking-wide text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet.
                </p>
              </div>
            </div>

            {/* Body Medium SemiBold */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Medium SemiBold</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>SemiBold</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>16px / 24px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-md font-semibold text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet.
                </p>
              </div>
            </div>

            {/* Body Medium Bold */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Medium Bold</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Bold</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>16px / 24px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-md font-bold text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Body Small Text Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Body Small Text</h2>
          </div>

          <div className="space-y-12">
            {/* Body Small Regular */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Small Regular</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Regular</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>14px / 22px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-sm font-regular text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi suscipit viverra. Etiam laoreet ipsum ligula, id blandit ante feugiat id.
                </p>
              </div>
            </div>

            {/* Body Small Medium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Small Medium</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Medium</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>14px / 22px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-sm font-medium text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi suscipit viverra. Etiam laoreet ipsum ligula, id blandit ante feugiat id.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Body Extra Small Text Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Body Extra Small Text</h2>
          </div>

          <div className="space-y-12">
            {/* Body Extra Small Regular */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Extra Small Regular</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Regular</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>12px / 20px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-xs font-regular text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet suscipit viverra. Etiam laoreet ipsum ligula, id blandit ante feugiat id.
                </p>
              </div>
            </div>

            {/* Body Extra Small Medium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Body Extra Small Medium</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Medium</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>12px / 20px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-body-xs font-medium text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet suscipit viverra. Etiam laoreet ipsum ligula, id blandit ante feugiat id.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Caption Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Caption</h2>
          </div>

          <div className="space-y-12">
            {/* Caption Regular */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Caption Regular</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Regular</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>10px / 16px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-caption font-regular uppercase text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet suscipit viverra. Etiam laoreet ipsum ligula, id blandit ante feugiat id.
                </p>
              </div>
            </div>

            {/* Caption SemiBold */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Caption SemiBold</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>SemiBold</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>10px / 16px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-caption font-semibold uppercase text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet suscipit viverra. Etiam laoreet ipsum ligula, id blandit ante feugiat id.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Other</h2>
          </div>

          <div className="space-y-12">
            {/* Table Description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-h5 font-semibold text-[#111928] mb-6">Table Description</h3>
                <div className="space-y-2">
                  <p className="text-body-lg font-medium text-gray-700">
                    <span>DM SANS / </span>
                    <span>Regular</span>
                  </p>
                  <p className="text-body-lg font-medium text-[#17263D]">
                    <span>10px / 16px</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-table font-regular text-[#1F2A37]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet proin ut vitae, felis. Mauris aliquet faucibus iaculis dui vitae ullamcorper ac enim mi pharetra amet suscipit viverra. Etiam laoreet ipsum ligula, id blandit ante feugiat id.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="my-32 border-t-4 border-neutral-300"></div>

        {/* Color Palette Header */}
        <div className="bg-blue-50 rounded-2xl p-10 mb-20">
          <h1 className="text-h1 font-bold text-[#17263D]">Color Palette</h1>
          <p className="text-body-lg font-regular text-gray-700 mt-4">
            Complete color system with semantic and decorative variants
          </p>
        </div>

        {/* Neutral Colors Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Neutral</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Used for backgrounds, surfaces, dividers, text, and outlines
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Object.entries(colors.neutral).map(([shade, color]) => (
              <div key={shade} className="space-y-3">
                <div
                  className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-body-md font-bold text-neutral-900">{shade}</p>
                  <p className="text-body-sm font-medium text-neutral-600 uppercase">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Primary Colors Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Primary</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Main brand color. Drives recognition and guides key actions
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(colors.primary).map(([shade, color]) => (
              <div key={shade} className="space-y-3">
                <div
                  className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-body-md font-bold text-neutral-900">{shade}</p>
                  <p className="text-body-sm font-medium text-neutral-600 uppercase">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary Colors Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Secondary</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Supports the primary color. Adds flexibility and variation
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(colors.secondary).map(([shade, color]) => (
              <div key={shade} className="space-y-3">
                <div
                  className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-body-md font-bold text-neutral-900">{shade}</p>
                  <p className="text-body-sm font-medium text-neutral-600 uppercase">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accent Colors Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Accent</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Used sparingly to highlight specific elements or actions
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(colors.accent).map(([shade, color]) => (
              <div key={shade} className="space-y-3">
                <div
                  className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-body-md font-bold text-neutral-900">{shade}</p>
                  <p className="text-body-sm font-medium text-neutral-600 uppercase">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gradients Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Gradients</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Special gradients for backgrounds and strokes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div
                className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                style={{ background: colors.gradients.primary.css }}
              />
              <div>
                <p className="text-body-md font-bold text-neutral-900">Primary Gradient</p>
                <p className="text-body-sm font-medium text-neutral-600">For Backgrounds/Fill</p>
              </div>
            </div>
            <div className="space-y-3">
              <div
                className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                style={{ background: colors.gradients.secondary.css }}
              />
              <div>
                <p className="text-body-md font-bold text-neutral-900">Secondary Gradient</p>
                <p className="text-body-sm font-medium text-neutral-600">For Strokes</p>
              </div>
            </div>
            <div className="space-y-3">
              <div
                className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                style={{ background: colors.gradients.gold.css }}
              />
              <div>
                <p className="text-body-md font-bold text-neutral-900">Gold Gradient</p>
                <p className="text-body-sm font-medium text-neutral-600">Nuel Gold Sections</p>
              </div>
            </div>
          </div>
        </section>

        {/* Semantic Colors */}
        <div className="border-b-2 border-neutral-200 pb-4 mb-12">
          <h2 className="text-h3 font-bold text-neutral-900">Semantic Colors</h2>
        </div>

        {/* Success Colors Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Success</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Indicates success, confirmation, or positive outcomes
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(colors.success).map(([shade, color]) => (
              <div key={shade} className="space-y-3">
                <div
                  className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-body-md font-bold text-neutral-900">{shade}</p>
                  <p className="text-body-sm font-medium text-neutral-600 uppercase">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warning Colors Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Warning</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Signals caution or something that requires user attention
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(colors.warning).map(([shade, color]) => (
              <div key={shade} className="space-y-3">
                <div
                  className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-body-md font-bold text-neutral-900">{shade}</p>
                  <p className="text-body-sm font-medium text-neutral-600 uppercase">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Error Colors Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Error</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Represents critical issues or errors. Demands immediate attention
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(colors.error).map(([shade, color]) => (
              <div key={shade} className="space-y-3">
                <div
                  className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-body-md font-bold text-neutral-900">{shade}</p>
                  <p className="text-body-sm font-medium text-neutral-600 uppercase">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Colors Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Info</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Communicates neutral information, tips, or system updates
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(colors.info).map(([shade, color]) => (
              <div key={shade} className="space-y-3">
                <div
                  className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-body-md font-bold text-neutral-900">{shade}</p>
                  <p className="text-body-sm font-medium text-neutral-600 uppercase">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Decorative Colors */}
        <div className="border-b-2 border-neutral-200 pb-4 mb-12">
          <h2 className="text-h3 font-bold text-neutral-900">Decorative Colors</h2>
        </div>

        {/* Pink Colors Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Pink</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Adds visual personality. Use for illustrations or background elements
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(colors.pink).map(([shade, color]) => (
              <div key={shade} className="space-y-3">
                <div
                  className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-body-md font-bold text-neutral-900">{shade}</p>
                  <p className="text-body-sm font-medium text-neutral-600 uppercase">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Purple Colors Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Purple</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Adds visual personality. Use for illustrations or background elements
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(colors.purple).map(([shade, color]) => (
              <div key={shade} className="space-y-3">
                <div
                  className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-body-md font-bold text-neutral-900">{shade}</p>
                  <p className="text-body-sm font-medium text-neutral-600 uppercase">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teal Colors Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Teal</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Adds visual personality. Use for illustrations or background elements
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(colors.teal).map(([shade, color]) => (
              <div key={shade} className="space-y-3">
                <div
                  className="h-24 rounded-xl border border-neutral-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-body-md font-bold text-neutral-900">{shade}</p>
                  <p className="text-body-sm font-medium text-neutral-600 uppercase">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="my-32 border-t-4 border-neutral-300"></div>

        {/* Iconography Header */}
        <div className="bg-blue-50 rounded-2xl p-10 mb-20">
          <h1 className="text-h1 font-bold text-[#17263D]">Iconography</h1>
          <p className="text-body-lg font-regular text-gray-700 mt-4">
            Phosphor Icons v2.1.1 - Flexible icon family with multiple weights
          </p>
          <a
            href="https://phosphoricons.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-body-md font-medium text-accent-500 hover:text-accent-700 underline"
          >
            Browse all icons at phosphoricons.com →
          </a>
        </div>

        {/* Icon Sizes Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Icon Sizes</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Standard icon sizes for different use cases
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {Object.entries(iconSizes).map(([name, size]) => (
              <div key={name} className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center bg-neutral-100 rounded-xl p-6 border border-neutral-300">
                  <House size={size} weight="regular" className="text-primary-500" />
                </div>
                <div className="text-center">
                  <p className="text-body-md font-bold text-neutral-900">{name}</p>
                  <p className="text-body-sm font-medium text-neutral-600">{size}px</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Icon Weights Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Icon Weights</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Six different styles for every icon
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {Object.entries(iconWeights).map(([name, weight]) => (
              <div key={name} className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center bg-neutral-100 rounded-xl p-6 border border-neutral-300">
                  <Star size={40} weight={weight as any} className="text-warning-500" />
                </div>
                <div className="text-center">
                  <p className="text-body-md font-bold text-neutral-900 capitalize">{name}</p>
                  <p className="text-body-sm font-medium text-neutral-600">{weight}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Guidelines Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Usage Guidelines</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Recommended icon sizes and weights for common scenarios
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(iconUsageGuidelines).map(([key, guideline]) => (
              <div key={key} className="bg-neutral-50 rounded-xl p-6 border border-neutral-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center bg-white rounded-lg p-3 border border-neutral-300">
                    <Lightning size={guideline.size} weight={guideline.weight as any} className="text-accent-500" />
                  </div>
                  <h3 className="text-body-lg font-bold text-neutral-900 capitalize">{key}</h3>
                </div>
                <p className="text-body-sm text-neutral-700">{guideline.description}</p>
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <p className="text-body-xs font-medium text-neutral-600">
                    Size: {guideline.size}px • Weight: {guideline.weight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Icons Section */}
        <section className="mb-16">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <h2 className="text-xl font-bold text-[#1D2433]">Common Icons</h2>
            <p className="text-body-md text-gray-600 mt-2">
              Frequently used icons organized by category
            </p>
          </div>

          {/* Navigation Icons */}
          <div className="mb-12">
            <h3 className="text-body-lg font-bold text-neutral-900 mb-6">Navigation</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <House size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Home</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <List size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Menu</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <X size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Close</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <ArrowLeft size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Back</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <MagnifyingGlass size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Search</p>
              </div>
            </div>
          </div>

          {/* Actions Icons */}
          <div className="mb-12">
            <h3 className="text-body-lg font-bold text-neutral-900 mb-6">Actions</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Plus size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Add</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <PencilSimple size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Edit</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Trash size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Delete</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <FloppyDisk size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Save</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Download size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Download</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Upload size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Upload</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <ShareNetwork size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Share</p>
              </div>
            </div>
          </div>

          {/* Status Icons */}
          <div className="mb-12">
            <h3 className="text-body-lg font-bold text-neutral-900 mb-6">Status & Feedback</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-success-100 rounded-lg p-4">
                  <CheckCircle size={24} weight="fill" className="text-success-500" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Success</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-error-100 rounded-lg p-4">
                  <XCircle size={24} weight="fill" className="text-error-500" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Error</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-warning-100 rounded-lg p-4">
                  <Warning size={24} weight="fill" className="text-warning-500" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Warning</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-info-100 rounded-lg p-4">
                  <Info size={24} weight="fill" className="text-info-500" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Info</p>
              </div>
            </div>
          </div>

          {/* User & Communication Icons */}
          <div className="mb-12">
            <h3 className="text-body-lg font-bold text-neutral-900 mb-6">User & Communication</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <User size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">User</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Users size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Users</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Envelope size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Mail</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Chat size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Chat</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Phone size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Phone</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Bell size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Notifications</p>
              </div>
            </div>
          </div>

          {/* More Categories */}
          <div>
            <h3 className="text-body-lg font-bold text-neutral-900 mb-6">Additional Icons</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Heart size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Favorite</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <ShoppingCart size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Cart</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Lock size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Lock</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Calendar size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Calendar</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Clock size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Clock</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <File size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">File</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Cloud size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Cloud</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 hover:bg-neutral-200 transition-colors">
                  <Code size={24} weight="regular" className="text-neutral-900" />
                </div>
                <p className="text-body-xs text-neutral-600 text-center">Code</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-gray-200">
          <p className="text-body-md font-medium text-gray-500">
            Design tokens extracted from Figma using MCP
          </p>
        </div>
      </div>
    </div>
  );
}
