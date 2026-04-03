import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { FundCard } from './components/FundCard';
import { FundCardSkeleton } from './components/FundCardSkeleton';
import { fundData, FundData } from './data/fundData';
import { supabase } from './lib/supabase';

function App() {
  const [funds, setFunds] = useState<FundData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFunds();
  }, []);

  const fetchFunds = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: schemesData, error: schemesError } = await supabase
        .from('mf_schemes')
        .select('*')
        .limit(50);

      if (schemesError) {
        console.error('Supabase error:', schemesError);
        setFunds(fundData);
        return;
      }

      if (!schemesData || schemesData.length === 0) {
        setFunds(fundData);
        return;
      }

      const { data: holdingsData } = await supabase
        .from('mf_holdings')
        .select('scheme_id, stock_name');

      const holdingsByScheme = holdingsData?.reduce((acc: any, holding: any) => {
        if (!acc[holding.scheme_id]) {
          acc[holding.scheme_id] = [];
        }
        acc[holding.scheme_id].push(holding.stock_name);
        return acc;
      }, {}) || {};

      const transformedFunds: FundData[] = schemesData.map((scheme: any, index: number) => {
        const schemeId = scheme.id?.toString();
        const holdings = holdingsByScheme[schemeId] || [];
        const newEntries = holdings.slice(0, 3);
        const completeExits = holdings.length > 3 ? holdings.slice(3, 5) : [];

        return {
          id: schemeId || String(index),
          name: scheme.scheme_name || `Fund ${index + 1}`,
          nav: scheme.nav || 100,
          navChange: scheme.nav_change || 0,
          category: scheme.category || 'Multi Cap',
          categoryChanged: false,
          fundManager: scheme.fund_manager || 'Not Available',
          managerChanged: false,
          portfolioChurn: {
            newEntries: newEntries.length > 0 ? newEntries : ['No current changes'],
            completeExits: completeExits.length > 0 ? completeExits : ['No current changes']
          },
          sectorDrift: [],
          performance: [
            { month: 'Oct', fundReturn: 2.1, benchmarkReturn: 1.8 },
            { month: 'Nov', fundReturn: 3.5, benchmarkReturn: 2.9 },
            { month: 'Dec', fundReturn: 4.2, benchmarkReturn: 3.1 },
            { month: 'Jan', fundReturn: 2.8, benchmarkReturn: 2.4 },
            { month: 'Feb', fundReturn: 5.1, benchmarkReturn: 4.2 },
            { month: 'Mar', fundReturn: 3.9, benchmarkReturn: 3.5 }
          ],
          benchmark: 'Nifty 500',
          oneYearReturn: scheme.one_year_return || 24.5,
          benchmarkOneYearReturn: 21.3,
          news: [
            { title: 'Fund performance updated', time: '2 hours ago' },
            { title: 'Portfolio allocation adjusted', time: '1 day ago' },
            { title: 'Fund outperforms benchmark', time: '3 days ago' }
          ]
        };
      });

      setFunds(transformedFunds);
    } catch (err) {
      console.error('Error fetching funds:', err);
      setError('Failed to fetch funds. Using demo data.');
      setFunds(fundData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Fund Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor your mutual fund portfolio performance and analytics
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-200">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {loading ? (
              <>
                <FundCardSkeleton />
                <FundCardSkeleton />
              </>
            ) : funds.length > 0 ? (
              funds.map((fund) => (
                <FundCard key={fund.id} fund={fund} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No funds found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
