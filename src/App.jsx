import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import CONFIG from './config';

// =====================================================
// COMPONENTS
// =====================================================

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
    <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
    />
  </div>
);

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-base transform group-hover:scale-110 transition-transform">🎰</div>
          <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{CONFIG.siteName}</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={CONFIG.links.whatsapp} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm">
            💬 WhatsApp
          </a>
          <button onClick={() => navigate('/order')} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium text-white text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all">Order Now</button>
        </div>
      </div>
    </nav>
  );
};

// =====================================================
// SCROLLING ANIMATION HOOK
// =====================================================
function useAutoScroll(deps = []) {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    positionRef.current = 0;

    const animate = () => {
      if (!scroll) return;
      positionRef.current += 0.5;
      if (positionRef.current >= scroll.scrollWidth / 2) {
        positionRef.current = 0;
      }
      scroll.scrollLeft = positionRef.current;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, deps);

  return scrollRef;
}

// =====================================================
// PRIZE COMPONENTS
// =====================================================

// Gambar ikan dengan fallback
const FishImage = ({ src, alt, className = "" }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return <div className={`flex items-center justify-center bg-purple-500/20 rounded-lg ${className}`}>
      <span className="text-2xl">🐟</span>
    </div>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain ${className}`}
      onError={() => setError(true)}
    />
  );
};

// Kotak hadiah FULL - gambar + nama + persentase (untuk daftar di order page)
const PrizeCardFull = ({ prize }) => (
  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 overflow-hidden hover:border-purple-500/50 transition-all">
    <div className="flex items-center gap-3 p-2.5">
      <div className="w-16 h-16 flex-shrink-0 bg-black/30 rounded-lg flex items-center justify-center p-1.5 overflow-hidden">
        <FishImage src={prize.image} alt={prize.name} className="w-full h-full" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-purple-400 leading-none">Kemungkinan Dapat</p>
        <p className="text-2xl font-bold text-white leading-tight">{prize.chance || '??%'}</p>
        <p className="text-xs text-gray-400 truncate">{prize.name}</p>
      </div>
    </div>
  </div>
);

// Kotak hadiah kecil - untuk preview bergerak (hanya gambar + nama)
const PrizeCardSmall = ({ prize }) => (
  <div className="flex-shrink-0 w-16 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/20 flex flex-col items-center justify-center gap-1 p-1 overflow-hidden">
    <div className="w-10 h-10 flex items-center justify-center">
      <FishImage src={prize.image} alt={prize.name} className="w-full h-full" />
    </div>
    <span className="text-[9px] text-gray-400 text-center truncate w-full px-0.5">{prize.name}</span>
  </div>
);

// Kotak hadiah untuk Landing Page (scrolling marquee)
const PrizeCardLanding = ({ prize }) => (
  <div className="flex-shrink-0 w-20 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 flex flex-col items-center justify-center gap-1 p-1.5 hover:scale-105 transition-all hover:border-purple-500/50 overflow-hidden">
    <div className="w-12 h-12 flex items-center justify-center">
      <FishImage src={prize.image} alt={prize.name} className="w-full h-full" />
    </div>
    <span className="text-[10px] text-gray-300 text-center truncate w-full px-0.5">{prize.name}</span>
  </div>
);

// Category Card (Landing Page)
const CategoryCard = ({ category, onOrder }) => {
  const scrollRef = useAutoScroll([]);

  return (
    <div className={`relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border ${category.featured ? 'border-purple-500/50' : 'border-white/10'} overflow-hidden hover:border-purple-500/30 transition-all`}>
      {category.featured && (
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-[10px] font-bold text-white z-10">⭐ POPULAR</div>
      )}
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{category.name}</h3>
        <p className="text-xs sm:text-sm text-gray-400 mb-3">{category.description}</p>
        <div className="mb-4">
          <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">Hadiah yang tersedia:</p>
          <div ref={scrollRef} className="flex gap-2 overflow-hidden">
            {[...category.prizes, ...category.prizes].map((prize, i) => (
              <PrizeCardLanding key={i} prize={prize} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-400">Harga per spin</p>
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Rp {category.price.toLocaleString('id-ID')}</p>
          </div>
          <button onClick={() => onOrder(category)} className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white text-sm hover:scale-105 transition-all hover:shadow-lg hover:shadow-purple-500/25 active:scale-95">{CONFIG.text.orderButton}</button>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// LANDING PAGE
// =====================================================

const LandingPage = () => {
  const navigate = useNavigate();
  const handleOrder = (category) => navigate(`/order?category=${category.id}`);

  return (
    <div className="min-h-screen pt-16 pb-8 px-3 sm:px-4 overflow-x-hidden">
      {/* Hero */}
      <section className="max-w-6xl mx-auto mb-10 sm:mb-16 mt-2">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 rounded-full border border-purple-500/30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-purple-300">{CONFIG.hero.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              {CONFIG.hero.title}
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">{CONFIG.hero.titleHighlight}</span>
            </h1>
            <p className="text-sm sm:text-lg text-gray-400 leading-relaxed">{CONFIG.hero.description}</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/order')} className="px-5 sm:px-7 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white text-sm sm:text-base hover:scale-105 transition-all hover:shadow-xl hover:shadow-purple-500/25">🎰 Order Sekarang</button>
              <a href={CONFIG.links.youtube} target="_blank" rel="noopener noreferrer" className="px-5 sm:px-7 py-3 bg-white/5 border border-white/20 rounded-xl font-bold text-white text-sm sm:text-base hover:bg-white/10 transition-all flex items-center gap-2"><span className="text-red-500">▶</span> Lihat Live</a>
            </div>
            <div className="flex gap-6 pt-3">
              {CONFIG.hero.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-lg sm:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Avatar - hidden on small mobile */}
          <div className="relative hidden md:block">
            <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="text-center"><div className="text-7xl mb-4 animate-bounce">🎮</div><p className="text-gray-400 text-sm">Gambar Avatar Roblox</p></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/30 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-500/30 rounded-full blur-xl" />
            </div>
            <div className="absolute -top-2 -left-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg backdrop-blur-sm animate-bounce" style={{ animationDuration: '3s' }}><span className="text-green-400 font-bold text-sm">✓ Trusted</span></div>
            <div className="absolute -bottom-2 -right-2 px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/30 rounded-lg backdrop-blur-sm animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }}><span className="text-yellow-400 font-bold text-sm">⚡ Fast</span></div>
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section className="max-w-6xl mx-auto mb-10 sm:mb-16">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-2">Pilih Kategori Spin</h2>
          <p className="text-xs sm:text-sm text-gray-400">Semakin tinggi kategori, semakin besar hadiahnya!</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {CONFIG.categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} onOrder={handleOrder} />
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-3">
          <a href={CONFIG.links.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 p-3 sm:p-5 bg-green-500/10 border border-green-500/30 rounded-xl hover:bg-green-500/20 transition-all">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-lg flex-shrink-0">💬</div>
            <div className="min-w-0"><p className="font-bold text-white text-xs sm:text-sm truncate">WhatsApp Group</p><p className="text-[10px] sm:text-xs text-gray-400 truncate">Info lebih lanjut</p></div>
          </a>
          <a href={CONFIG.links.spreadsheet} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 p-3 sm:p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl hover:bg-blue-500/20 transition-all">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-lg flex-shrink-0">📊</div>
            <div className="min-w-0"><p className="font-bold text-white text-xs sm:text-sm truncate">Cek Spreadsheet</p><p className="text-[10px] sm:text-xs text-gray-400 truncate">Daftar pemenang</p></div>
          </a>
        </div>
        <div className="mt-4">
          <a href={CONFIG.links.youtube} target="_blank" rel="noopener noreferrer" className="block p-5 sm:p-6 bg-red-500/10 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-all text-center">
            <div className="text-3xl sm:text-4xl mb-2">📺</div>
            <p className="font-bold text-white text-sm sm:text-lg">Subscribe YouTube Channel</p>
            <p className="text-gray-400 mt-1 text-xs sm:text-sm">Tonton live streaming spin wheel setiap hari!</p>
          </a>
        </div>
      </section>
    </div>
  );
};

// =====================================================
// ORDER PAGE
// =====================================================

const OrderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = parseInt(searchParams.get('category')) || 1;
  const [selectedCategory, setSelectedCategory] = useState(CONFIG.categories.find(c => c.id === categoryId) || CONFIG.categories[0]);
  const [formData, setFormData] = useState({ usernameRoblox: '', usernameTiktok: '', totalSpin: 1 });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = selectedCategory.price * formData.totalSpin;

  // Auto-scrolling untuk preview hadiah bergerak
  const scrollRef = useAutoScroll([selectedCategory.id]);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.usernameRoblox.trim()) newErrors.usernameRoblox = 'Username Roblox wajib diisi';
    if (!formData.usernameTiktok.trim()) newErrors.usernameTiktok = 'Username TikTok wajib diisi';
    if (formData.totalSpin < 1) newErrors.totalSpin = 'Minimal 1 spin';
    if (formData.totalSpin > 100) newErrors.totalSpin = 'Maksimal 100 spin';
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch(`${CONFIG.apiUrl}/api/order/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usn_tiktok: formData.usernameTiktok,
            usn_roblox: formData.usernameRoblox,
            total_spin: formData.totalSpin,
            kategori: selectedCategory.name,
            kategori_id: selectedCategory.id,
            harga_per_spin: selectedCategory.price
          })
        });
        const result = await response.json();
        if (result.success) {
          sessionStorage.setItem('currentOrder', JSON.stringify(result.data));
          navigate(`/payment?orderId=${result.data.order_id}`);
        } else {
          alert('Gagal membuat order: ' + result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Pastikan backend sudah berjalan.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-8 px-3 overflow-x-hidden">
      <div className="max-w-4xl mx-auto mt-2">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Order Spin Wheel</h1>
          <p className="text-xs sm:text-sm text-gray-400">Isi form di bawah untuk melanjutkan pemesanan</p>
        </div>
        
        {/* Content */}
        <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          
          {/* ISI HADIAH */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold text-white mb-3">ISI HADIAH</h3>
              
              {/* Category tabs */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {CONFIG.categories.map((cat) => (
                  <button 
                    key={cat.id} 
                    onClick={() => setSelectedCategory(cat)} 
                    className={`p-2.5 rounded-lg border transition-all text-left ${
                      selectedCategory.id === cat.id 
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' 
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    <p className="font-bold text-xs">{cat.name}</p>
                    <p className="text-[10px] opacity-70">Rp {cat.price.toLocaleString('id-ID')}/spin</p>
                  </button>
                ))}
              </div>
              
              {/* Daftar hadiah - kotak gambar + persentase */}
              <div className="space-y-2">
                {selectedCategory.prizes.map((prize, i) => (
                  <PrizeCardFull key={`${selectedCategory.id}-${i}`} prize={prize} />
                ))}
              </div>
            </div>
            
            {/* Preview bergerak */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-[10px] sm:text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Preview Hadiah Bergerak</h3>
              <div ref={scrollRef} className="flex gap-2 overflow-hidden">
                {[...selectedCategory.prizes, ...selectedCategory.prizes, ...selectedCategory.prizes].map((prize, i) => (
                  <PrizeCardSmall key={`scroll-${selectedCategory.id}-${i}`} prize={prize} />
                ))}
              </div>
            </div>
          </div>
          
          {/* ISI DATA */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold text-white mb-4">ISI DATA LENGKAP</h3>
            <div className="space-y-4">
              {/* Username Roblox */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Username Roblox <span className="text-red-400">*</span></label>
                <input 
                  type="text" 
                  value={formData.usernameRoblox} 
                  onChange={(e) => setFormData({ ...formData, usernameRoblox: e.target.value })} 
                  placeholder="Masukkan username Roblox" 
                  className={`w-full px-3 py-2.5 bg-white/5 border ${errors.usernameRoblox ? 'border-red-500' : 'border-white/20'} rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`} 
                />
                {errors.usernameRoblox && <p className="text-red-400 text-[10px] mt-1">{errors.usernameRoblox}</p>}
              </div>

              {/* Username TikTok */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Username TikTok <span className="text-red-400">*</span></label>
                <input 
                  type="text" 
                  value={formData.usernameTiktok} 
                  onChange={(e) => setFormData({ ...formData, usernameTiktok: e.target.value })} 
                  placeholder="Masukkan username TikTok" 
                  className={`w-full px-3 py-2.5 bg-white/5 border ${errors.usernameTiktok ? 'border-red-500' : 'border-white/20'} rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`} 
                />
                {errors.usernameTiktok && <p className="text-red-400 text-[10px] mt-1">{errors.usernameTiktok}</p>}
              </div>

              {/* Total Spin */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Total Spin <span className="text-red-400">*</span></label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setFormData({ ...formData, totalSpin: Math.max(1, formData.totalSpin - 1) })} className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg text-white font-bold hover:bg-white/20 transition-colors flex-shrink-0">-</button>
                  <input 
                    type="number" 
                    value={formData.totalSpin} 
                    onChange={(e) => setFormData({ ...formData, totalSpin: Math.max(1, Math.min(100, parseInt(e.target.value) || 1)) })} 
                    min="1" max="100" 
                    className={`flex-1 px-3 py-2.5 bg-white/5 border ${errors.totalSpin ? 'border-red-500' : 'border-white/20'} rounded-lg text-white text-center text-lg font-bold focus:outline-none focus:border-purple-500 transition-colors`} 
                  />
                  <button onClick={() => setFormData({ ...formData, totalSpin: Math.min(100, formData.totalSpin + 1) })} className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg text-white font-bold hover:bg-white/20 transition-colors flex-shrink-0">+</button>
                </div>
                {errors.totalSpin && <p className="text-red-400 text-[10px] mt-1">{errors.totalSpin}</p>}
              </div>

              {/* Summary */}
              <div className="pt-3 border-t border-white/10 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Kategori</span><span className="text-white font-medium">{selectedCategory.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Harga per spin</span><span className="text-white">Rp {selectedCategory.price.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Jumlah spin</span><span className="text-white">{formData.totalSpin}x</span></div>
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <span className="font-bold text-white">TOTAL</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Submit */}
              <button 
                onClick={handleSubmit} 
                disabled={isLoading} 
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white text-sm hover:scale-[1.02] transition-all hover:shadow-xl hover:shadow-purple-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '⏳ Memproses...' : '🚀 GASKAN ORDER'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// PAYMENT PAGE
// =====================================================

const PaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderData, setOrderData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [confirmSent, setConfirmSent] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('currentOrder');
    if (stored) setOrderData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) { setPaymentStatus('expired'); return; }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (!orderId || paymentStatus !== 'pending') return;

    const checkStatus = async () => {
      try {
        const response = await fetch(`${CONFIG.apiUrl}/api/order/status/${orderId}`);
        const result = await response.json();
        if (result.success) {
          const status = result.data.transaction_status;
          if (status === 'settlement' || status === 'capture') {
            setPaymentStatus('success');
            if (!confirmSent) {
              setConfirmSent(true);
              try {
                await fetch(`${CONFIG.apiUrl}/api/order/confirm-payment`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ order_id: orderId })
                });
              } catch (err) { console.error('[Payment] Confirm failed:', err); }
            }
          } else if (status === 'expire' || status === 'cancel' || status === 'deny') {
            setPaymentStatus('expired');
          }
        }
      } catch (error) { console.error('Polling error:', error); }
    };

    const interval = setInterval(checkStatus, 5000);
    checkStatus();
    return () => clearInterval(interval);
  }, [orderId, paymentStatus, confirmSent]);

  const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  if (!orderData) return (
    <div className="min-h-screen pt-16 pb-8 px-3 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400 mb-4 text-sm">Tidak ada data pesanan</p>
        <button onClick={() => navigate('/order')} className="px-5 py-2.5 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-300 text-sm hover:bg-purple-500/30 transition-all">← Kembali ke Order</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 pb-8 px-3 overflow-x-hidden">
      <div className="max-w-md mx-auto mt-2">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {[1, 2, 3].map((step, i) => (
            <React.Fragment key={step}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                paymentStatus === 'success' ? 'bg-green-500 text-white' : step <= 2 ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-500'
              }`}>
                {paymentStatus === 'success' || step < 3 ? '✓' : '3'}
              </div>
              {i < 2 && <div className={`w-8 sm:w-12 h-0.5 ${paymentStatus === 'success' ? 'bg-green-500' : step < 3 ? 'bg-purple-500' : 'bg-white/10'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          {/* Header */}
          <div className={`p-4 text-center border-b border-white/10 ${
            paymentStatus === 'success' ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20' : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
          }`}>
            <h1 className="text-lg font-bold text-white">PEMBAYARAN</h1>
            <p className="text-gray-400 mt-0.5 text-[10px] sm:text-xs break-all">Order ID: {orderData.order_id}</p>
          </div>

          {/* PENDING */}
          {paymentStatus === 'pending' && (
            <div className="p-4 space-y-4">
              <div className="text-center">
                <p className="text-gray-400 mb-1 text-xs">TOTAL TAGIHAN</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Rp {orderData.total_price?.toLocaleString('id-ID')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-3 aspect-square max-w-[260px] mx-auto flex items-center justify-center">
                {orderData.qris_url ? (
                  <img src={orderData.qris_url} alt="QRIS" className="max-w-full max-h-full" />
                ) : (
                  <div className="text-center text-gray-500">
                    <p className="text-3xl mb-2">📱</p>
                    <p className="text-sm font-medium">QRIS DINAMIS</p>
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="text-gray-400 text-[10px] mb-1">WAKTU KADALUARSA</p>
                <div className={`text-3xl font-mono font-bold ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </div>
                <p className="text-gray-500 text-[10px] mt-1">Selesaikan pembayaran sebelum waktu habis</p>
              </div>

              {orderData.qris_url && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <a href={orderData.qris_url} download={`QRIS-${orderData.order_id}.png`} className="flex-1 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-center text-xs font-medium hover:bg-white/20 transition-all">📥 Download QR</a>
                    <button onClick={() => { navigator.clipboard.writeText(orderData.qris_url); alert('URL QRIS berhasil dicopy!'); }} className="flex-1 py-2.5 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-300 text-center text-xs font-medium hover:bg-purple-500/30 transition-all">📋 Copy URL</button>
                  </div>
                  <div className="bg-slate-800/50 border border-white/10 rounded-lg p-2.5">
                    <p className="text-[10px] text-gray-400 mb-1.5">🔗 QRIS Image URL:</p>
                    <div className="flex items-center gap-1.5">
                      <input type="text" value={orderData.qris_url} readOnly className="flex-1 bg-black/30 border border-white/10 rounded px-2 py-1.5 text-[10px] text-gray-300 font-mono truncate" onClick={(e) => e.target.select()} />
                      <button onClick={() => { navigator.clipboard.writeText(orderData.qris_url); alert('URL berhasil dicopy!'); }} className="px-2 py-1.5 bg-green-500/20 border border-green-500/50 rounded text-green-400 text-[10px] hover:bg-green-500/30 transition-all whitespace-nowrap">Copy</button>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1.5">
                      💡 Paste ke{' '}
                      <a href="https://simulator.sandbox.midtrans.com/qris/index" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Midtrans Simulator</a>
                      {' '}untuk test
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUCCESS */}
          {paymentStatus === 'success' && (
            <div className="p-5 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-xl font-bold text-green-400 mb-2">Pembayaran Berhasil!</h2>
              <p className="text-sm text-gray-400 mb-4">Admin akan segera menjalankan spin untuk Anda.</p>
              <div className="bg-white/5 rounded-lg p-3 text-left space-y-1.5 text-xs">
                <p className="text-gray-400">Username Roblox: <span className="text-white font-bold">{orderData.order?.usn_roblox}</span></p>
                <p className="text-gray-400">Username TikTok: <span className="text-white font-bold">{orderData.order?.usn_tiktok}</span></p>
                <p className="text-gray-400">Total Spin: <span className="text-white font-bold">{orderData.order?.total_spin}x</span></p>
                <p className="text-gray-400">Kategori: <span className="text-white font-bold">{orderData.order?.kategori}</span></p>
              </div>
              <div className="mt-3 p-2.5 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-xs">✅ Data sudah masuk ke sistem admin. Silakan tunggu giliran spin!</p>
              </div>
            </div>
          )}

          {/* EXPIRED */}
          {paymentStatus === 'expired' && (
            <div className="p-5 text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">⏰</span>
              </div>
              <h2 className="text-xl font-bold text-red-400 mb-2">Waktu Habis!</h2>
              <p className="text-sm text-gray-400 mb-4">Pembayaran telah kadaluarsa.</p>
              <button onClick={() => navigate('/order')} className="px-6 py-2.5 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-300 text-sm hover:bg-purple-500/30 transition-all">← Buat Pesanan Baru</button>
            </div>
          )}

          {/* Footer */}
          <div className="p-3 border-t border-white/10 space-y-2">
            <a href={CONFIG.links.spreadsheet} target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-center text-xs font-medium hover:bg-blue-500/20 transition-all">📊 Cek Spreadsheet - Dapat Apa</a>
            <a href={CONFIG.links.whatsapp} target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center text-xs font-medium hover:bg-green-500/20 transition-all">💬 WhatsApp Grup</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// MAIN APP
// =====================================================

export default function App() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}