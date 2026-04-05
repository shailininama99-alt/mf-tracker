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

      // 1. Fetch Holdings (Now pulling Types and Percentages)
      const { data: holdingsData } = await supabase
        .from('mf_holdings')
        .select('scheme_id, stock_name, change_type, change_percentage');

      const holdingsByScheme = holdingsData?.reduce((acc: any, holding: any) => {
        if (!acc[holding.scheme_id]) {
          acc[holding.scheme_id] = { entries: [], exits: [] };
        }
        
        // Format the string dynamically based on the database values
        const pct = holding.change_percentage ? `${holding.change_percentage}%` : '';
        let displayStr = holding.stock_name;
        
        if (holding.change_type === 'New Entry') displayStr = `${holding.stock_name} (+${pct} New)`;
        else if (holding.change_type === 'Added') displayStr = `${holding.stock_name} (+${pct})`;
        else if (holding.change_type === 'Partial Exit') displayStr = `${holding.stock_name} (-${pct})`;
        else if (holding.change_type === 'Complete Exit') displayStr = `${holding.stock_name} (-${pct} Exit)`;
        
        // Sort into the correct bucket
        if (holding.change_type === 'New Entry' || holding.change_type === 'Added') {
          acc[holding.scheme_id].entries.push(displayStr);
        } else if (holding.change_type === 'Partial Exit' || holding.change_type === 'Complete Exit') {
          acc[holding.scheme_id].exits.push(displayStr);
        } else {
           acc[holding.scheme_id].entries.push(displayStr);
        }
        
        return acc;
      }, {}) || {};

      // 2. Fetch Alerts (Now pulling the URL)
      const { data: alertsData } = await supabase
        .from('mf_alerts')
        .select('scheme_id, alert_text, alert_date, source_url')
        .order('alert_date', { ascending: false });

      const alertsByScheme = alertsData?.reduce((acc: any, alert: any) => {
        if (!acc[alert.scheme_id]) {
          acc[alert.scheme_id] = [];
        }
        acc[alert.scheme_id].push({
          title: alert.alert_text,
          time: new Date(alert.alert_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
          url: alert.source_url // Passing the URL down to the card
        });
        return acc;
      }, {}) || {};

      const transformedFunds: FundData[] = schemesData.map((scheme: any, index: number) => {
        const schemeId = scheme.id?.toString();
        
        const schemeHoldings = holdingsByScheme[schemeId] || { entries: [], exits: [] };
        const schemeAlerts = alertsByScheme[schemeId] || [];
        const fallbackNews = [{ title: 'No recent updates or alerts', time: '' }];

        return {
          id: schemeId || String(index),
          name: scheme.name || `Fund ${index + 1}`,
          nav: 100,
          navChange: 0,
          category: scheme.category || 'Multi Cap',
          categoryChanged: false,
          fundManager: scheme.fund_manager || 'Not Available',
          managerChanged: false,
          strategy_tags: scheme.strategy_tags || [],
          portfolioChurn: {
            newEntries: schemeHoldings.entries.length > 0 ? schemeHoldings.entries : ['No current changes'],
            completeExits: schemeHoldings.exits.length > 0 ? schemeHoldings.exits : ['No current changes']
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
          news: schemeAlerts.length > 0 ? schemeAlerts : fallbackNews
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
