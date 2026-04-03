interface PerformanceData {
  month: string;
  fundReturn: number;
  benchmarkReturn: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  fundName: string;
  benchmark: string;
}

export function PerformanceChart({ data, fundName, benchmark }: PerformanceChartProps) {
  const maxValue = Math.max(
    ...data.map(d => Math.max(d.fundReturn, d.benchmarkReturn))
  );
  const minValue = Math.min(
    ...data.map(d => Math.min(d.fundReturn, d.benchmarkReturn))
  );
  const range = maxValue - minValue;
  const chartHeight = 200;

  const getY = (value: number) => {
    return chartHeight - ((value - minValue) / range) * chartHeight;
  };

  const fundPoints = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = getY(d.fundReturn);
    return `${x},${y}`;
  }).join(' ');

  const benchmarkPoints = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = getY(d.benchmarkReturn);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">{fundName}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">{benchmark}</span>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 100 ${chartHeight}`}
          className="w-full"
          preserveAspectRatio="none"
          style={{ height: `${chartHeight}px` }}
        >
          <polyline
            points={benchmarkPoints}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-gray-400 dark:text-gray-600"
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={fundPoints}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-blue-500"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 -mb-6">
          {data.map((d, i) => (
            <span key={i} className="text-xs text-gray-500 dark:text-gray-400">
              {d.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
