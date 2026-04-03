interface SectorData {
  sector: string;
  change: number;
}

interface SectorDriftProps {
  data: SectorData[];
}

export function SectorDrift({ data }: SectorDriftProps) {
  const maxAbsChange = Math.max(...data.map(d => Math.abs(d.change)));

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const percentage = (Math.abs(item.change) / maxAbsChange) * 100;
        const isPositive = item.change > 0;

        return (
          <div key={item.sector} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.sector}
              </span>
              <span
                className={`text-sm font-semibold ${
                  isPositive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {isPositive ? '+' : ''}{item.change}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isPositive
                    ? 'bg-green-500 dark:bg-green-400'
                    : 'bg-red-500 dark:bg-red-400'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
