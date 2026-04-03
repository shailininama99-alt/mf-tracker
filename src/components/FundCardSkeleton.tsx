export function FundCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-96 mb-4"></div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-40"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2 ml-auto"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-32 ml-auto"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-4"></div>
            <div className="h-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
