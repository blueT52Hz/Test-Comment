const TagSkeleton = () => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
      <div className="h-5 bg-gray-100 dark:bg-gray-600 rounded w-8 animate-pulse"></div>
    </div>
  );
};

export default TagSkeleton;
