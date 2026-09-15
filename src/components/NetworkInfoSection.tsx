import React, { useState } from 'react';
import { Network, ShieldCheck, Eye, EyeOff, Info, Clock, Wifi, Lock } from 'lucide-react';
import { NetworkInfo } from '../types';

interface NetworkInfoSectionProps {
  networkInfo: NetworkInfo;
  onUpdateNetworkInfo?: (updated: NetworkInfo) => void;
}

export const NetworkInfoSection: React.FC<NetworkInfoSectionProps> = ({
  networkInfo,
  onUpdateNetworkInfo,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMasked, setIsMasked] = useState(networkInfo.isMasked ?? true);
  const [useLocalBrowserMode, setUseLocalBrowserMode] = useState(false);

  const displayIp = useLocalBrowserMode
    ? 'Not available in browser environment'
    : isMasked
    ? '192.168.1.xxx (DEMO MASKED)'
    : '192.168.1.104 (DEMO DATA)';

  const toggleMasking = () => {
    const nextMasked = !isMasked;
    setIsMasked(nextMasked);
    if (onUpdateNetworkInfo) {
      onUpdateNetworkInfo({
        ...networkInfo,
        isMasked: nextMasked,
      });
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Network Information</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold uppercase">
                DEMO DATA
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Privacy-safe client network telemetry and sandbox detection state
            </p>
          </div>
        </div>

        {/* IP Masking / Environment Selector */}
        <div className="flex items-center gap-2">
          <button
            id="network-mask-toggle"
            onClick={toggleMasking}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition-colors"
            title="Toggle IP address masking"
          >
            {isMasked ? (
              <>
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Show Demo IP</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                <span>Mask Demo IP</span>
              </>
            )}
          </button>

          <button
            id="network-browser-mode-toggle"
            onClick={() => setUseLocalBrowserMode(!useLocalBrowserMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>{useLocalBrowserMode ? 'Switch to Demo IP' : 'Simulate Browser Limitation'}</span>
          </button>
        </div>
      </div>

      {/* Network Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: IP Address */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>IP Address</span>
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="Network information tooltip"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
              {showTooltip && (
                <div className="absolute right-0 bottom-full mb-2 w-64 p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-200 shadow-xl z-20">
                  <p className="font-semibold text-cyan-300 mb-1">Privacy Notice:</p>
                  An IP address alone does not reliably identify a specific person or exact physical location.
                </div>
              )}
            </div>
          </div>
          <div className="mt-2">
            <div className="font-mono text-sm font-semibold text-cyan-300 break-all">
              {displayIp}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              {useLocalBrowserMode ? 'Privacy Sandboxed' : 'Simulated Gateway IP'}
            </span>
          </div>
        </div>

        {/* Metric 2: Network Status */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Network Status</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {networkInfo.status || 'Protected / Monitored'}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Local Heuristic Sandboxing
            </span>
          </div>
        </div>

        {/* Metric 3: Connection Type */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Connection Type</span>
            <Wifi className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="mt-2">
            <div className="text-sm font-semibold text-white">
              {networkInfo.connectionType || 'Wi-Fi / Mobile Link'}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Direct Socket or WebRTC Heuristic
            </span>
          </div>
        </div>

        {/* Metric 4: Detection Time */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Detection Time</span>
            <Clock className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="mt-2">
            <div className="text-sm font-mono font-semibold text-purple-300">
              {networkInfo.detectionTime || 'Active Session'}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Synchronized ISO UTC Clock
            </span>
          </div>
        </div>
      </div>

      {/* Safety & Educational Clarification Box */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-slate-300">
            Privacy & Physical Geolocation Disclaimer:
          </span>
          <p>
            An IP address alone does not reliably identify a specific person or exact physical location. In this academic prototype, all network addresses are masked or simulated for client privacy and educational safety. No packet sniffing or port scanning is conducted.
          </p>
        </div>
      </div>
    </div>
  );
};
