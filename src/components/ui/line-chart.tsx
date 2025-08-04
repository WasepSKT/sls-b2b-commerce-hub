interface LineChartProps {
  data: Array<{
    day: string;
    sales: number;
  }>;
  className?: string;
  isDarkMode?: boolean;
}

export function LineChart({ data, className, isDarkMode }: LineChartProps) {
  // Memoize calculations for better performance
  const maxValue = Math.max(...data.map(d => d.sales));
  const minValue = Math.min(...data.map(d => d.sales));
  const padding = maxValue * 0.1;
  const adjustedMax = maxValue + padding;
  const adjustedMin = Math.max(0, minValue - padding);
  const scale = 150 / (adjustedMax - adjustedMin);
  const gridLines = Array.from({ length: 5 }, (_, i) => i + 1); // 5 grid lines for better readability

  // Responsive spacing calculation
  const chartWidth = 520;
  const chartHeight = 180;
  const leftPadding = 60;
  const bottomPadding = 40;
  const horizontalSpacing = (chartWidth - leftPadding) / (data.length - 1);

  // Calculate points for the smooth curve with better precision
  const points = data.map((entry, index) => {
    const x = index * horizontalSpacing + leftPadding;
    const y = chartHeight - ((entry.sales - adjustedMin) * scale) + bottomPadding;
    return `${x},${y}`;
  }).join(' ');

  // Calculate points for the gradient area
  const areaPoints = `${points} ${(data.length - 1) * horizontalSpacing + leftPadding},${chartHeight + bottomPadding} ${leftPadding},${chartHeight + bottomPadding}`;

  return (
    <div className="w-full h-full relative">
      <svg
        className={className}
        viewBox="0 0 600 220" // Reduced height
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Background */}
        <rect
          x="0"
          y="0"
          width="600"
          height="220" // Reduced height
          fill={isDarkMode ? "#1f2937" : "#ffffff"}
        />

        {/* Grid Lines */}
        <g transform={`translate(${leftPadding},${bottomPadding})`}>
          {gridLines.map((line) => (
            <g key={`grid-${line}`}>
              <line
                x1="0"
                y1={chartHeight - (line * (chartHeight / 5))}
                x2={chartWidth - leftPadding}
                y2={chartHeight - (line * (chartHeight / 5))}
                className={isDarkMode
                  ? "stroke-gray-700"
                  : "stroke-gray-200"
                }
                strokeDasharray="3,3"
                strokeWidth="0.5"
              />
              <text
                x="-10"
                y={chartHeight - (line * (chartHeight / 5))}
                textAnchor="end"
                alignmentBaseline="middle"
                className={isDarkMode
                  ? "fill-gray-400 text-[10px] font-medium"
                  : "fill-gray-500 text-[10px] font-medium"
                }
              >
                {((adjustedMax * (line / 5)) / 1000000).toFixed(1)}M
              </text>
            </g>
          ))}
        </g>

        {/* Gradient Area Under Curve */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isDarkMode ? "#6366f1" : "#4f46e5"}
              stopOpacity="0.1"
            />
            <stop
              offset="100%"
              stopColor={isDarkMode ? "#6366f1" : "#4f46e5"}
              stopOpacity="0.01"
            />
          </linearGradient>
        </defs>
        <polygon
          points={areaPoints}
          fill="url(#areaGradient)"
          className="transition-opacity duration-300"
        />

        {/* Line Chart */}
        <polyline
          points={points}
          fill="none"
          className={`transition-all duration-300 ${isDarkMode
              ? "stroke-indigo-400"
              : "stroke-indigo-600"
            }`}
          strokeWidth="1.5" // Thinner line
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data Points */}
        {data.map((entry, index) => {
          const x = index * horizontalSpacing + leftPadding;
          const y = chartHeight - ((entry.sales - adjustedMin) * scale) + bottomPadding;
          return (
            <g key={index} className="transition-transform duration-300 hover:scale-110">
              {/* Outer circle */}
              <circle
                cx={x}
                cy={y}
                r="4"
                className={`transition-colors duration-300 ${isDarkMode
                    ? "fill-gray-800 stroke-indigo-400"
                    : "fill-white stroke-indigo-600"
                  }`}
                strokeWidth="2"
              />

              {/* Hover area and tooltip */}
              <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                {/* Tooltip */}
                <rect
                  x={x - 35}
                  y={y - 30}
                  width="70"
                  height="20"
                  rx="4"
                  className={isDarkMode
                    ? "fill-gray-800"
                    : "fill-white"
                  }
                  filter="url(#shadow)"
                />
                <text
                  x={x}
                  y={y - 18}
                  textAnchor="middle"
                  className={`text-[10px] font-medium ${isDarkMode
                      ? "fill-gray-200"
                      : "fill-gray-900"
                    }`}
                >
                  Rp {(entry.sales / 1000000).toFixed(1)}M
                </text>
              </g>
            </g>
          );
        })}

        {/* X-axis Labels */}
        {data.map((entry, index) => (
          <text
            key={index}
            x={index * horizontalSpacing + leftPadding}
            y={chartHeight + bottomPadding + 15}
            textAnchor="middle"
            className={`text-[10px] font-medium transition-colors duration-300 ${isDarkMode
                ? "fill-gray-400"
                : "fill-gray-600"
              }`}
          >
            {entry.day}
          </text>
        ))}

        {/* Drop Shadow Filter */}
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="1"
              floodOpacity="0.2"
              className={isDarkMode
                ? "flood-color-black"
                : "flood-color-gray-500"
              }
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}