import {
  Calendar,
  Clock,
  Database,
  FileText,
  TrendingUp,
  X,
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface DataColumn {
  key: string;
  label: string;
  type: "date" | "metric" | "data";
  formatValue?: (value: any, dateOffsetMinutes?: number) => string;
}

interface DataStats {
  count: number;
  minDate?: Date;
  maxDate?: Date;
  duration?: number;
  metrics?: Array<{
    key: string;
    label: string;
    min: number;
    max: number;
    avg: number;
    unit?: string;
  }>;
}

interface DataExplorerFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[] | null;
  title: string;
  columns: DataColumn[];
  getStats: (data: any[], dateOffset: number) => DataStats;
  onApplyOffset?: (offsetMinutes: number) => void;
}

const ITEM_HEIGHT = 40;
const OVERSCAN = 5;

export const DataExplorerFlyout: React.FC<DataExplorerFlyoutProps> = ({
  isOpen,
  onClose,
  data,
  title,
  columns,
  getStats,
  onApplyOffset,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dateOffset, setDateOffset] = useState(0); // in minutes
  const [isAdjustingDate, setIsAdjustingDate] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(500);

  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(null);
      setDateOffset(0);
      setIsAdjustingDate(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const stats = useMemo(() => {
    if (!data) return { count: 0 };
    return getStats(data, dateOffset);
  }, [data, dateOffset, getStats]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  useEffect(() => {
    const updateContainerHeight = () => {
      if (scrollContainerRef.current) {
        setContainerHeight(scrollContainerRef.current.clientHeight);
      }
    };
    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, []);

  const visibleRange = useMemo(() => {
    const dataLength = data?.length || 0;
    const start = Math.floor(scrollTop / ITEM_HEIGHT);
    const end = Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT);
    return {
      start: Math.max(0, start - OVERSCAN),
      end: Math.min(dataLength, end + OVERSCAN),
    };
  }, [scrollTop, containerHeight, data?.length]);

  const visibleItems = useMemo(() => {
    if (!data) return [];
    return data.slice(visibleRange.start, visibleRange.end);
  }, [data, visibleRange]);

  const formatValue = (value: any, column: DataColumn): string => {
    if (value === null || value === undefined) return "-";

    // Use column's custom formatter if provided
    if (column.formatValue) {
      return column.formatValue(
        value,
        column.type === "date" ? dateOffset : undefined
      );
    }

    // Default formatting
    if (typeof value === "number") {
      if (Math.abs(value) < 0.01 && value !== 0) return value.toExponential(2);
      return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
    }
    if (value instanceof Date) {
      return value.toLocaleString();
    }
    return String(value);
  };

  const formatDuration = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? "s" : ""}, ${hours % 24} hr`;
    }
    return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-4xl h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {stats.count > 0
                  ? `${stats.count.toLocaleString()} records`
                  : "No data"}
              </div>

              <button
                onClick={() => setIsAdjustingDate(!isAdjustingDate)}
                className={`px-3 py-2 border rounded-lg transition-colors flex items-center gap-1 ${
                  isAdjustingDate
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
                title="Adjust date offset"
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm">Date Offset</span>
              </button>
            </div>

            {isAdjustingDate && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <label className="text-sm font-medium text-gray-700">
                  Date Offset:
                </label>
                <input
                  type="number"
                  value={dateOffset}
                  onChange={(e) => setDateOffset(Number(e.target.value))}
                  className="w-24 px-2 py-1 border border-gray-300 rounded"
                  placeholder="0"
                />
                <span className="text-sm text-gray-600">minutes</span>
                <div className="ml-auto flex gap-2">
                  {onApplyOffset && dateOffset !== 0 && (
                    <button
                      onClick={() => {
                        onApplyOffset(dateOffset);
                        setDateOffset(0);
                        setIsAdjustingDate(false);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  )}
                  <button
                    onClick={() => setDateOffset(0)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {stats.count > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Database className="w-3 h-3" />
                    Records
                  </div>
                  <div className="font-semibold">
                    {stats.count.toLocaleString()}
                  </div>
                </div>

                {stats.minDate && (
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <Calendar className="w-3 h-3" />
                      Start Date
                    </div>
                    <div
                      className="text-sm font-semibold"
                      title={stats.minDate.toLocaleString()}
                    >
                      {stats.minDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                )}

                {stats.maxDate && (
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <Calendar className="w-3 h-3" />
                      End Date
                    </div>
                    <div
                      className="text-sm font-semibold"
                      title={stats.maxDate.toLocaleString()}
                    >
                      {stats.maxDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                )}

                {stats.duration && (
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <Clock className="w-3 h-3" />
                      Duration
                    </div>
                    <div className="font-semibold">
                      {formatDuration(stats.duration)}
                    </div>
                  </div>
                )}

                {stats.metrics?.map((metric) => (
                  <div key={metric.key} className="col-span-2 md:col-span-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <TrendingUp className="w-3 h-3" />
                      {metric.label} Statistics
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span>
                        Min:{" "}
                        <strong>
                          {metric.min.toFixed(2)}
                          {metric.unit ? ` ${metric.unit}` : ""}
                        </strong>
                      </span>
                      <span>
                        Max:{" "}
                        <strong>
                          {metric.max.toFixed(2)}
                          {metric.unit ? ` ${metric.unit}` : ""}
                        </strong>
                      </span>
                      <span>
                        Avg:{" "}
                        <strong>
                          {metric.avg.toFixed(2)}
                          {metric.unit ? ` ${metric.unit}` : ""}
                        </strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden px-6 py-4">
          {!data || data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FileText className="w-12 h-12 mb-4" />
              <p>No data available</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 h-full overflow-hidden">
              <div className="overflow-x-auto h-full">
                <div className="min-w-max h-full flex flex-col">
                  <div className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10 flex">
                    <div className="w-16 px-3 py-2 text-xs font-medium text-gray-500 uppercase">
                      #
                    </div>
                    {columns.map((col) => (
                      <div
                        key={col.key}
                        className={`flex-1 px-3 py-2 text-xs font-medium uppercase ${
                          col.type === "date"
                            ? "text-green-600"
                            : col.type === "metric"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {col.type === "date" && dateOffset !== 0 && (
                          <span
                            className="text-xs text-green-600 mr-1"
                            title={`Offset: ${
                              dateOffset > 0 ? "+" : ""
                            }${dateOffset} min`}
                          >
                            ⏰
                          </span>
                        )}
                        {col.label}
                      </div>
                    ))}
                  </div>

                  <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto"
                    onScroll={handleScroll}
                  >
                    <div
                      style={{
                        height: (data?.length || 0) * ITEM_HEIGHT,
                        position: "relative",
                      }}
                    >
                      {visibleItems.map((item: any, i) => {
                        const globalIndex = visibleRange.start + i;
                        const isSelected = selectedIndex === globalIndex;

                        return (
                          <div
                            key={globalIndex}
                            className={`flex absolute w-full cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-blue-50 hover:bg-blue-100"
                                : "hover:bg-gray-50 even:bg-gray-50/50"
                            }`}
                            style={{
                              height: ITEM_HEIGHT,
                              top: globalIndex * ITEM_HEIGHT,
                            }}
                            onClick={() => setSelectedIndex(globalIndex)}
                          >
                            <div className="w-16 px-3 py-2 text-sm text-gray-900 flex items-center">
                              {globalIndex + 1}
                            </div>
                            {columns.map((col) => {
                              const value = formatValue(item[col.key], col);
                              return (
                                <div
                                  key={col.key}
                                  className={`flex-1 px-3 py-2 text-sm truncate flex items-center ${
                                    col.type === "metric"
                                      ? "font-semibold text-blue-600"
                                      : "text-gray-900"
                                  }`}
                                  title={value}
                                >
                                  {value}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
