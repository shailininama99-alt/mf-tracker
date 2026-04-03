export interface FundData {
  id: string;
  name: string;
  nav: number;
  navChange: number;
  category: string;
  categoryChanged: boolean;
  fundManager: string;
  managerChanged: boolean;
  portfolioChurn: {
    newEntries: string[];
    completeExits: string[];
  };
  sectorDrift: {
    sector: string;
    change: number;
  }[];
  performance: {
    month: string;
    fundReturn: number;
    benchmarkReturn: number;
  }[];
  benchmark: string;
  oneYearReturn: number;
  benchmarkOneYearReturn: number;
  news: {
    title: string;
    time: string;
  }[];
}

export const fundData: FundData[] = [
  {
    id: '1',
    name: 'Parag Parikh Flexi Cap Fund',
    nav: 67.82,
    navChange: 1.23,
    category: 'Flexi Cap',
    categoryChanged: false,
    fundManager: 'Rajeev Thakkar',
    managerChanged: true,
    portfolioChurn: {
      newEntries: [
        'HDFC Bank Ltd.',
        'Microsoft Corporation',
        'Alphabet Inc. Class A'
      ],
      completeExits: [
        'Facebook Inc.',
        'Bajaj Finance Ltd.'
      ]
    },
    sectorDrift: [
      { sector: 'Financials', change: 1.5 },
      { sector: 'Technology', change: 2.3 },
      { sector: 'Healthcare', change: -0.8 },
      { sector: 'Consumer Discretionary', change: -1.2 },
      { sector: 'Energy', change: 0.4 }
    ],
    performance: [
      { month: 'Oct', fundReturn: 2.1, benchmarkReturn: 1.8 },
      { month: 'Nov', fundReturn: 3.5, benchmarkReturn: 2.9 },
      { month: 'Dec', fundReturn: 4.2, benchmarkReturn: 3.1 },
      { month: 'Jan', fundReturn: 2.8, benchmarkReturn: 2.4 },
      { month: 'Feb', fundReturn: 5.1, benchmarkReturn: 4.2 },
      { month: 'Mar', fundReturn: 3.9, benchmarkReturn: 3.5 }
    ],
    benchmark: 'Nifty 500',
    oneYearReturn: 24.5,
    benchmarkOneYearReturn: 21.3,
    news: [
      { title: 'Parag Parikh Fund adds tech giants to portfolio amid market volatility', time: '2 hours ago' },
      { title: 'Fund manager switches defensive stance, increases equity exposure', time: '1 day ago' },
      { title: 'Flexi cap funds outperform benchmarks in Q1 2024', time: '3 days ago' }
    ]
  },
  {
    id: '2',
    name: 'HDFC Small Cap Fund',
    nav: 142.35,
    navChange: -0.87,
    category: 'Small Cap',
    categoryChanged: false,
    fundManager: 'Chirag Setalvad',
    managerChanged: false,
    portfolioChurn: {
      newEntries: [
        'Dixon Technologies',
        'Polycab India Ltd.',
        'Persistent Systems'
      ],
      completeExits: [
        'Crompton Greaves',
        'Route Mobile Ltd.'
      ]
    },
    sectorDrift: [
      { sector: 'Industrials', change: 2.8 },
      { sector: 'IT Services', change: 1.9 },
      { sector: 'Financials', change: -2.1 },
      { sector: 'Materials', change: -0.9 },
      { sector: 'Consumer Staples', change: 0.6 }
    ],
    performance: [
      { month: 'Oct', fundReturn: 3.2, benchmarkReturn: 2.5 },
      { month: 'Nov', fundReturn: 5.8, benchmarkReturn: 4.1 },
      { month: 'Dec', fundReturn: 2.9, benchmarkReturn: 3.3 },
      { month: 'Jan', fundReturn: 1.5, benchmarkReturn: 2.1 },
      { month: 'Feb', fundReturn: 6.2, benchmarkReturn: 5.4 },
      { month: 'Mar', fundReturn: 4.8, benchmarkReturn: 3.9 }
    ],
    benchmark: 'Nifty Small Cap 250',
    oneYearReturn: 31.8,
    benchmarkOneYearReturn: 28.4,
    news: [
      { title: 'HDFC Small Cap Fund bets big on manufacturing sector', time: '4 hours ago' },
      { title: 'Small cap funds see highest inflows in 18 months', time: '2 days ago' },
      { title: 'Fund reduces financial exposure, pivots to industrials', time: '5 days ago' }
    ]
  }
];
