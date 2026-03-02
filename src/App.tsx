import { useEffect, useRef, useState } from 'react';

// TradingView Widget Component
function TradingViewWidget({ symbol, id }: { symbol: string; id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      colorTheme: 'dark',
      isTransparent: true,
      locale: 'en',
      width: '100%'
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" id={id}>
      <div ref={containerRef} className="tradingview-widget-container__widget"></div>
    </div>
  );
}

// X/Twitter Feed Component
function XFeed() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setRefreshKey(k => k + 1);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-sm font-medium text-gray-300">$OIL Live Feed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 font-mono">Refresh: {countdown}s</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg border border-[#0052ff]/30 bg-black/40">
        <iframe
          key={refreshKey}
          src="https://syndication.twitter.com/srv/timeline-profile/screen-name/search?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&lang=en&origin=https%3A%2F%2Fpublish.twitter.com%2F&theme=dark&widgetsVersion=2615f7e52b7e0%3A1702314776716"
          className="w-full h-full min-h-[400px] md:min-h-[500px]"
          style={{
            border: 'none',
            background: 'transparent'
          }}
          title="X Feed"
          loading="lazy"
        />
      </div>

      <a
        href="https://x.com/search?q=%24OIL&src=typed_query&f=live"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-center text-xs text-[#0052ff] hover:text-[#3d7aff] transition-colors"
      >
        View full feed on X →
      </a>
    </div>
  );
}

// Oil Drip Animation Background
function OilBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a0f1a] to-[#030712]"></div>

      {/* Industrial grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0052ff 1px, transparent 1px),
            linear-gradient(to bottom, #0052ff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      ></div>

      {/* Animated glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0052ff]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#0052ff]/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Oil drip effects */}
      <div className="absolute top-0 left-[10%] w-1 h-32 bg-gradient-to-b from-transparent via-[#0052ff]/20 to-transparent animate-drip"></div>
      <div className="absolute top-0 left-[30%] w-0.5 h-24 bg-gradient-to-b from-transparent via-[#0052ff]/15 to-transparent animate-drip" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-0 left-[70%] w-1 h-40 bg-gradient-to-b from-transparent via-[#0052ff]/25 to-transparent animate-drip" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-0 left-[85%] w-0.5 h-20 bg-gradient-to-b from-transparent via-[#0052ff]/10 to-transparent animate-drip" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
}

// Header Component
function Header() {
  const [copied, setCopied] = useState(false);
  const ca = '0x21FD44bE608F1D18689CDcC8861AE74571Ae8888';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="relative z-10 border-b border-[#0052ff]/30 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#0052ff] to-[#002299] flex items-center justify-center shadow-lg shadow-[#0052ff]/30">
                <span className="text-lg md:text-xl font-black text-white">BC</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">BASECRUDE</h1>
              <p className="text-[10px] md:text-xs text-gray-500 font-mono">COMMODITY TRADING ON BASE</p>
            </div>
          </div>

          {/* Contract Address Banner */}
          <div className="flex-1 max-w-xl">
            <div className="bg-[#0052ff]/10 border border-[#0052ff]/40 rounded-lg px-3 py-2 md:px-4 md:py-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] md:text-xs font-bold text-[#0052ff] bg-[#0052ff]/20 px-2 py-0.5 rounded">BASE.MEME</span>
                  <span className="text-xs md:text-sm font-bold text-white">$OIL</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="truncate max-w-[180px] md:max-w-none">CA: {ca}</span>
                  <svg className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copied && <span className="text-green-400">Copied!</span>}
                </button>
              </div>
            </div>
          </div>

          {/* Buy Button & Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/Basecrude"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://base.meme/coin/base:0x21FD44bE608F1D18689CDcC8861AE74571Ae8888?referrer=0xFCE86e6A615B40A620b1a666ff4B866Cd273c476"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-[#0052ff] to-[#0066ff] hover:from-[#0066ff] hover:to-[#0077ff] text-white font-bold text-sm md:text-base rounded-lg shadow-lg shadow-[#0052ff]/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#0052ff]/40"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              BUY $OIL
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// Price Card Component
function PriceCard({
  title,
  symbol,
  id,
  accent = false
}: {
  title: string;
  symbol: string;
  id: string;
  accent?: boolean;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden transition-all hover:scale-[1.02] ${
      accent
        ? 'bg-gradient-to-br from-[#0052ff]/20 to-[#0052ff]/5 border-2 border-[#0052ff]/50 shadow-2xl shadow-[#0052ff]/20'
        : 'bg-white/5 border border-white/10'
    }`}>
      {accent && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-[#0052ff] text-[10px] font-bold text-white rounded-full animate-pulse">
          FEATURED
        </div>
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${
            accent ? 'bg-[#0052ff]' : 'bg-white/10'
          }`}>
            <span className="text-xl md:text-2xl">{title === '$OIL' ? '🛢️' : '🥇'}</span>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
            <p className="text-xs text-gray-500 font-mono">{symbol}</p>
          </div>
        </div>
        <div className="bg-black/40 rounded-xl p-2 md:p-3">
          <TradingViewWidget symbol={symbol} id={id} />
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#0052ff]/20 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <p className="text-center text-xs text-gray-600">
          Requested by{' '}
          <a
            href="https://x.com/BASECRUDE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#0052ff] transition-colors"
          >
            @BASECRUDE
          </a>
          {' · '}
          Built by{' '}
          <a
            href="https://x.com/clonkbot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#0052ff] transition-colors"
          >
            @clonkbot
          </a>
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans relative">
      <OilBackground />
      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 md:mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0052ff] to-white">
              REAL-TIME COMMODITY TRACKING
            </span>
          </h2>
          <p className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Track $OIL and $GOLD prices live. Built for the Base chain community.
          </p>
        </div>

        {/* Price Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          <PriceCard
            title="$OIL"
            symbol="XTCOM:OILUSDT.P"
            id="oil-widget"
            accent={true}
          />
          <PriceCard
            title="$GOLD"
            symbol="PEPPERSTONE:XAUUSD"
            id="gold-widget"
          />
        </div>

        {/* Live Feed Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0052ff]/50 to-transparent"></div>
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              LIVE $OIL NEWS
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0052ff]/50 to-transparent"></div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
            <XFeed />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-8 md:py-12">
          <div className="inline-block bg-gradient-to-r from-[#0052ff]/20 via-[#0052ff]/30 to-[#0052ff]/20 border border-[#0052ff]/40 rounded-2xl px-6 md:px-12 py-6 md:py-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Ready to trade $OIL?</h3>
            <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">Join the Base chain commodity revolution</p>
            <a
              href="https://base.meme/coin/base:0x21FD44bE608F1D18689CDcC8861AE74571Ae8888?referrer=0xFCE86e6A615B40A620b1a666ff4B866Cd273c476"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#0052ff] to-[#0066ff] hover:from-[#0066ff] hover:to-[#0077ff] text-white font-bold text-base md:text-lg rounded-xl shadow-lg shadow-[#0052ff]/40 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#0052ff]/50"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              BUY $OIL NOW
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
