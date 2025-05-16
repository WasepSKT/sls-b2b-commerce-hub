interface BarChartProps {
  data: Array<{
    day: string;
    sales: number;
  }>;
  className?: string;
  isDarkMode?: boolean;
}

export function BarChart({ data, className, isDarkMode }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.sales));
  const scale = 200 / maxValue;
  const gridLines = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <svg className={className} viewBox="0 0 600 300">
      {/* Background */}
      <rect 
        x="0" 
        y="0" 
        width="600" 
        height="300" 
        fill={isDarkMode ? "#1f2937" : "#ffffff"} 
      />

      {/* Grid Lines */}
      <g transform="translate(50,20)">
        {gridLines.map((line) => (
          <g key={`grid-${line}`}>
            <line
              x1="0"
              y1={250 - (line * 50)}
              x2="500"
              y2={250 - (line * 50)}
              className={isDarkMode 
                ? "stroke-gray-700" 
                : "stroke-gray-200"
              }
              strokeDasharray="4,4"
            />
            <text
              x="-10"
              y={250 - (line * 50)}
              textAnchor="end"
              alignmentBaseline="middle"
              className={isDarkMode 
                ? "fill-gray-400 text-xs" 
                : "fill-gray-500 text-xs"
              }
            >
              {((maxValue * (line / 5)) / 1000000).toFixed(1)}M
            </text>
          </g>
        ))}
      </g>

      {/* Bars and Labels */}
      <g transform="translate(50,20)">
        {data.map((entry, index) => (
          <g 
            key={index} 
            transform={`translate(${index * 70 + 10}, 0)`}
            className="transition-transform duration-300 hover:translate-y-[-2px]"
          >
            {/* Bar Background for Hover Effect */}
            <rect
              y="0"
              width="60"
              height="250"
              fill="transparent"
              className="cursor-pointer"
            />
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="0%" 
                  className={isDarkMode 
                    ? "stop-color-blue-400" 
                    : "stop-color-blue-500"
                  } 
                />
                <stop 
                  offset="100%" 
                  className={isDarkMode 
                    ? "stop-color-blue-600" 
                    : "stop-color-blue-700"
                  } 
                />
              </linearGradient>
            </defs>

            {/* The Bar */}
            <rect
              y={250 - (entry.sales * scale)}
              width="40"
              height={entry.sales * scale}
              rx="6"
              className={`transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? "fill-blue-500 opacity-90 hover:opacity-100" 
                  : "fill-blue-600 opacity-90 hover:opacity-100"
              }`}
              filter="url(#shadow)"
            />

            {/* Drop Shadow */}
            <defs>
              <filter id="shadow">
                <feDropShadow 
                  dx="0" 
                  dy="2" 
                  stdDeviation="3" 
                  floodOpacity="0.2"
                  className={isDarkMode 
                    ? "flood-color-black" 
                    : "flood-color-gray-500"
                  }
                />
              </filter>
            </defs>

            {/* Day Label */}
            <text
              x="20"
              y="270"
              textAnchor="middle"
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? "fill-gray-300 text-xs font-medium" 
                  : "fill-gray-600 text-xs font-medium"
              }`}
            >
              {entry.day}
            </text>

            {/* Value Label */}
            <text
              x="20"
              y={240 - (entry.sales * scale)}
              textAnchor="middle"
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? "fill-white text-xs font-semibold" 
                  : "fill-gray-900 text-xs font-semibold"
              }`}
            >
              {(entry.sales / 1000000).toFixed(1)}M
            </text>
          </g>
        ))}
      </g>

      {/* X-axis line */}
      <line
        x1="50"
        y1="270"
        x2="550"
        y2="270"
        className={isDarkMode 
          ? "stroke-gray-700" 
          : "stroke-gray-200"
        }
        strokeWidth="1"
      />
    </svg>
  );
} 