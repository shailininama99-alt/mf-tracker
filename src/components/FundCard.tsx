import { TrendingUp, TrendingDown, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { FundData } from '../data/fundData';
import { PerformanceChart } from './PerformanceChart';
import { SectorDrift } from './SectorDrift';

interface FundCardProps {
  fund: FundData;
}

export function FundCard({ fund }: FundCardProps) {
  const isPositiveNav = fund.navChange > 0;
  const isOutperforming = fund.oneYearReturn > fund.benchmarkOneYearReturn;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {fund.name}
            </h2>
            
            {/* Strategy Badges */}
            {fund.strategy_tags && fund.strategy_tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {fund.strategy_tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {fund.category}
                </span>
                {fund.categoryChanged && (
                  <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                    <AlertCircle size={14} />
                    Changed
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Manager:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {fund.fundManager}
                </span>
                {fund.managerChanged && (
                  <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <AlertCircle size={14} />
                    New
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current NAV</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹{fund.nav.toFixed(2)}
            </div>
            <div
              className={`flex items-center justify-end gap-1 text-sm font-semibold mt-1 ${
                isPositiveNav
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {isPositiveNav ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {isPositiveNav ? '+' : ''}{fund.navChange}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
              Portfolio Churn (MoM)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ArrowUpRight size={16} className="text-green-600 dark:text-green-400" />
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    New Entries
                  </h4>
                </div>
                {fund.portfolioChurn.newEntries.length === 0 ? (
                  <p className="text-xs text-gray-500 dark:text-gray-500 italic">No current changes</p>
                ) : (
                  <ul className="space-y-2">
                    {fund.portfolioChurn.newEntries.map((entry, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        {entry}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ArrowDownRight size={16} className="text-red-600 dark:text-red-400" />
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Complete Exits
                  </h4>
                </div>
                {fund.portfolioChurn.completeExits.length === 0 ? (
                  <p className="text-xs text-gray-500 dark:text-gray-500 italic">No current changes</p>
                ) : (
                  <ul className="space-y-2">
                    {fund.portfolioChurn.completeExits.map((exit, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        {exit}
                      </li>
                    ))}
                  </ul>
