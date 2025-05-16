interface LineChartProps {
  data: Array<{
    day: string;
    sales: number;
  }>;
  className?: string;
  isDarkMode?: boolean;
}

export function LineChart({ data, className, isDarkMode }: LineChartProps) {
  const maxValue = Math.max(...data.map(d => d.sales));
  const minValue = Math.min(...data.map(d => d.sales));
  const padding = maxValue * 0.1;
  const adjustedMax = maxValue + padding;
  const adjustedMin = Math.max(0, minValue - padding);
  const scale = 150 / (adjustedMax - adjustedMin); // Reduced height scale
  const gridLines = Array.from({ length: 4 }, (_, i) => i + 1); // Reduced to 4 lines

  // Calculate horizontal spacing based on data length
  const horizontalSpacing = (500 - 40) / (data.length - 1); // Adjusted left padding

  // Calculate points for the smooth curve
  const points = data.map((entry, index) => {
    const x = index * horizontalSpacing + 40;
    const y = 180 - ((entry.sales - adjustedMin) * scale); // Reduced height
    return `${x},${y}`;
  }).join(' ');

  // Calculate points for the gradient area
  const areaPoints = `${points} ${data.length * horizontalSpacing + 40},180 40,180`; // Adjusted height and padding

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
        <g transform="translate(40,20)"> {/* Adjusted left padding */}
          {gridLines.map((line) => (
            <g key={`grid-${line}`}>
              <line
                x1="0"
                y1={180 - (line * 40)} // Adjusted spacing
                x2="520" // Increased width
                y2={180 - (line * 40)} // Adjusted spacing
                className={isDarkMode 
                  ? "stroke-gray-700" 
                  : "stroke-gray-200"
                }
                strokeDasharray="3,3" // Smaller dots
                strokeWidth="0.5" // Thinner lines
              />
              <text
                x="-8" // Moved closer
                y={180 - (line * 40)} // Adjusted spacing
                textAnchor="end"
                alignmentBaseline="middle"
                className={isDarkMode 
                  ? "fill-gray-400 text-[9px]" // Smaller text
                  : "fill-gray-500 text-[9px]"
                }
              >
                {((adjustedMax * (line / 4)) / 1000000).toFixed(1)}M
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
          className={`transition-all duration-300 ${
            isDarkMode 
              ? "stroke-indigo-400" 
              : "stroke-indigo-600"
          }`}
          strokeWidth="1.5" // Thinner line
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data Points */}
        {data.map((entry, index) => {
          const x = index * horizontalSpacing + 40;
          const y = 180 - ((entry.sales - adjustedMin) * scale);
          return (
            <g key={index} className="transition-transform duration-300 hover:scale-110">
              {/* Outer circle */}
              <circle
                cx={x}
                cy={y}
                r="3" // Smaller circles
                className={`transition-colors duration-300 ${
                  isDarkMode 
                    ? "fill-gray-800 stroke-indigo-400" 
                    : "fill-white stroke-indigo-600"
                }`}
                strokeWidth="1.5" // Thinner stroke
              />
              
              {/* Hover area and tooltip */}
              <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                {/* Tooltip */}
                <rect
                  x={x - 30}
                  y={y - 25}
                  width="60"
                  height="18"
                  rx="2"
                  className={isDarkMode 
                    ? "fill-gray-800" 
                    : "fill-white"
                  }
                  filter="url(#shadow)"
                />
                <text
                  x={x}
                  y={y - 13}
                  textAnchor="middle"
                  className={`text-[9px] font-medium ${
                    isDarkMode 
                      ? "fill-gray-200" 
                      : "fill-gray-900"
                  }`}
                >
                  Rp {entry.sales.toLocaleString()}
                </text>
              </g>
            </g>
          );
        })}

        {/* X-axis Labels */}
        {data.map((entry, index) => (
          <text
            key={index}
            x={index * horizontalSpacing + 40}
            y="200" // Adjusted position
            textAnchor="middle"
            className={`text-[9px] font-medium transition-colors duration-300 ${
              isDarkMode 
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