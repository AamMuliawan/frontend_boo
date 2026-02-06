import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import CONFIG from './config';

// =====================================================
// COMPONENTS
// =====================================================

// Animated Background
const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
    />
  </div>
);

// Navbar
const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl transform group-hover:scale-110 transition-transform">🎰</div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{CONFIG.siteName}</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={CONFIG.links.whatsapp} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors">
            <span>💬</span> WhatsApp
          </a>
          <button onClick={() => navigate('/order')} className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all">Order Now</button>
        </div>
      </div>
    </nav>
  );
};

// Prize Card
const PrizeCard = ({ prize, size = 'normal' }) => (
  <div className={`flex-shrink-0 ${size === 'small' ? 'w-20 h-24' : 'w-24 h-32'} bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 flex flex-col items-center justify-center gap-2 transform hover:scale-105 transition-all hover:border-purple-500/50 group`}>
    <span className="text-3xl group-hover:scale-125 transition-transform">{prize.emoji}</span>
    <span className="text-xs text-gray-300 text-center px-2">{prize.name}</span>
  </div>
);

// Category Card
const CategoryCard = ({ category, onOrder }) => {
  const scrollRef = useRef(null);
  
  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    let position = 0;
    const animate = () => {
      position += 0.5;
      if (position >= scroll.scrollWidth / 2) position = 0;
      scroll.scrollLeft = position;
    };
    const interval = setInterval(animate, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border ${category.featured ? 'border-purple-500/50' : 'border-white/10'} overflow-hidden group hover:border-purple-500/30 transition-all`}>
      {category.featured && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white z-10">⭐ POPULAR</div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
        <p className="text-gray-400 mb-4">{category.description}</p>
        <div className="mb-6 -mx-6 px-6">
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Hadiah yang tersedia:</p>
          <div ref={scrollRef} className="flex gap-3 overflow-hidden">
            {[...category.prizes, ...category.prizes].map((prize, i) => (<PrizeCard key={i} prize={prize} />))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-sm text-gray-400">Harga per spin</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Rp {category.price.toLocaleString('id-ID')}</p>
          </div>
          <button onClick={() => onOrder(category)} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white transform hover:scale-105 transition-all hover:shadow-lg hover:shadow-purple-500/25 active:scale-95">{CONFIG.text.orderButton}</button>
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
    <div className="min-h-screen pt-24 pb-12 px-4">
      <section className="max-w-6xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-purple-300">{CONFIG.hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
              {CONFIG.hero.title}
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">{CONFIG.hero.titleHighlight}</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">{CONFIG.hero.description}</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/order')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-white text-lg transform hover:scale-105 transition-all hover:shadow-xl hover:shadow-purple-500/25">🎰 Order Sekarang</button>
              <a href={CONFIG.links.youtube} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/5 border border-white/20 rounded-2xl font-bold text-white text-lg hover:bg-white/10 transition-all flex items-center gap-2"><span className="text-red-500">▶</span> Lihat Live</a>
            </div>
            <div className="flex gap-8 pt-6">
              {CONFIG.hero.stats.map((stat, i) => (<div key={i}><p className="text-2xl font-bold text-white">{stat.value}</p><p className="text-sm text-gray-500">{stat.label}</p></div>))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="text-center"><div className="text-8xl mb-4 animate-bounce">🎮</div><p className="text-gray-400 text-sm">Gambar Avatar Roblox</p><p className="text-gray-600 text-xs mt-1">Edit: config.js → images.heroAvatar</p></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/30 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-500/30 rounded-full blur-xl" />
            </div>
            <div className="absolute -top-2 -left-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm animate-bounce" style={{ animationDuration: '3s' }}><span className="text-green-400 font-bold">✓ Trusted</span></div>
            <div className="absolute -bottom-2 -right-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-xl backdrop-blur-sm animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }}><span className="text-yellow-400 font-bold">⚡ Fast</span></div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto mb-20">
        <div className="text-center mb-12"><h2 className="text-4xl font-bold text-white mb-4">Pilih Kategori Spin</h2><p className="text-gray-400">Semakin tinggi kategori, semakin besar hadiahnya!</p></div>
        <div className="grid md:grid-cols-2 gap-8">{CONFIG.categories.map((cat) => (<CategoryCard key={cat.id} category={cat} onOrder={handleOrder} />))}</div>
      </section>
      <section className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          <a href={CONFIG.links.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl hover:bg-green-500/20 transition-all group">
            <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">💬</div>
            <div><p className="font-bold text-white">Join WhatsApp Group</p><p className="text-sm text-gray-400">Untuk info lebih lanjut</p></div>
          </a>
          <a href={CONFIG.links.spreadsheet} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl hover:bg-blue-500/20 transition-all group">
            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📊</div>
            <div><p className="font-bold text-white">Cek Spreadsheet</p><p className="text-sm text-gray-400">Lihat daftar pemenang</p></div>
          </a>
        </div>
        <div className="mt-8">
          <p className="text-center text-gray-400 mb-4">Bantu Subscribe YouTube juga ya! 🙏</p>
          <a href={CONFIG.links.youtube} target="_blank" rel="noopener noreferrer" className="block p-8 bg-red-500/10 border border-red-500/30 rounded-2xl hover:bg-red-500/20 transition-all text-center group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📺</div>
            <p className="font-bold text-white text-xl">Subscribe YouTube Channel</p>
            <p className="text-gray-400 mt-2">Tonton live streaming spin wheel setiap hari!</p>
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
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    let position = 0;
    const animate = () => { position += 0.5; if (position >= scroll.scrollWidth / 2) position = 0; scroll.scrollLeft = position; };
    const interval = setInterval(animate, 30);
    return () => clearInterval(interval);
  }, [selectedCategory]);

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
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8"><h1 className="text-4xl font-bold text-white mb-2">Order Spin Wheel</h1><p className="text-gray-400">Isi form di bawah untuk melanjutkan pemesanan</p></div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">ISI HADIAH</h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {CONFIG.categories.map((cat) => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat)} className={`p-3 rounded-xl border transition-all ${selectedCategory.id === cat.id ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}>
                    <p className="font-bold text-sm">{cat.name}</p><p className="text-xs opacity-70">Rp {cat.price.toLocaleString('id-ID')}/spin</p>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {selectedCategory.prizes.map((prize, i) => (<div key={i} className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 flex flex-col items-center justify-center gap-1 p-2"><span className="text-2xl">{prize.emoji}</span><span className="text-xs text-gray-300 text-center">{prize.name}</span></div>))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Preview Hadiah Bergerak</h3>
              <div ref={scrollRef} className="flex gap-3 overflow-hidden">
                {[...selectedCategory.prizes, ...selectedCategory.prizes, ...selectedCategory.prizes].map((prize, i) => (<PrizeCard key={i} prize={prize} size="small" />))}
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">ISI DATA LENGKAP</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username Roblox <span className="text-red-400">*</span></label>
                <input type="text" value={formData.usernameRoblox} onChange={(e) => setFormData({ ...formData, usernameRoblox: e.target.value })} placeholder="Masukkan username Roblox" className={`w-full px-4 py-3 bg-white/5 border ${errors.usernameRoblox ? 'border-red-500' : 'border-white/20'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`} />
                {errors.usernameRoblox && <p className="text-red-400 text-sm mt-1">{errors.usernameRoblox}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username TikTok <span className="text-red-400">*</span></label>
                <input type="text" value={formData.usernameTiktok} onChange={(e) => setFormData({ ...formData, usernameTiktok: e.target.value })} placeholder="Masukkan username TikTok" className={`w-full px-4 py-3 bg-white/5 border ${errors.usernameTiktok ? 'border-red-500' : 'border-white/20'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`} />
                {errors.usernameTiktok && <p className="text-red-400 text-sm mt-1">{errors.usernameTiktok}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Total Spin <span className="text-red-400">*</span></label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setFormData({ ...formData, totalSpin: Math.max(1, formData.totalSpin - 1) })} className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl text-white font-bold hover:bg-white/20 transition-colors">-</button>
                  <input type="number" value={formData.totalSpin} onChange={(e) => setFormData({ ...formData, totalSpin: Math.max(1, Math.min(100, parseInt(e.target.value) || 1)) })} min="1" max="100" className={`flex-1 px-4 py-3 bg-white/5 border ${errors.totalSpin ? 'border-red-500' : 'border-white/20'} rounded-xl text-white text-center text-xl font-bold focus:outline-none focus:border-purple-500 transition-colors`} />
                  <button onClick={() => setFormData({ ...formData, totalSpin: Math.min(100, formData.totalSpin + 1) })} className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl text-white font-bold hover:bg-white/20 transition-colors">+</button>
                </div>
                {errors.totalSpin && <p className="text-red-400 text-sm mt-1">{errors.totalSpin}</p>}
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-2"><span className="text-gray-400">Kategori</span><span className="text-white font-medium">{selectedCategory.name}</span></div>
                <div className="flex justify-between items-center mb-2"><span className="text-gray-400">Harga per spin</span><span className="text-white">Rp {selectedCategory.price.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between items-center mb-4"><span className="text-gray-400">Jumlah spin</span><span className="text-white">{formData.totalSpin}x</span></div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10"><span className="text-lg font-bold text-white">TOTAL TAGIHAN</span><span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Rp {totalPrice.toLocaleString('id-ID')}</span></div>
              </div>
              <button onClick={handleSubmit} disabled={isLoading} className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white text-lg transform hover:scale-[1.02] transition-all hover:shadow-xl hover:shadow-purple-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? '⏳ Memproses...' : '🚀 GASKAN ORDER'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// PAYMENT PAGE (UPDATED - dengan confirm payment)
// =====================================================

const PaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderData, setOrderData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [confirmSent, setConfirmSent] = useState(false); // Track apakah confirm sudah dikirim

  // Load order data dari sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('currentOrder');
    if (stored) setOrderData(JSON.parse(stored));
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setPaymentStatus('expired');
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // =====================================================
  // POLLING STATUS + AUTO CONFIRM PAYMENT
  // =====================================================
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

            // =====================================================
            // KUNCI: Kirim confirm payment ke backend
            // Backend akan update Google Sheets → pindahkan ke Paid_Orders
            // =====================================================
            if (!confirmSent) {
              setConfirmSent(true);
              try {
                await fetch(`${CONFIG.apiUrl}/api/order/confirm-payment`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ order_id: orderId })
                });
                console.log('[Payment] Confirm sent to backend');
              } catch (err) {
                console.error('[Payment] Confirm failed:', err);
              }
            }
          } else if (status === 'expire' || status === 'cancel' || status === 'deny') {
            setPaymentStatus('expired');
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Poll setiap 5 detik
    const interval = setInterval(checkStatus, 5000);
    // Juga cek langsung saat mount
    checkStatus();

    return () => clearInterval(interval);
  }, [orderId, paymentStatus, confirmSent]);

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  if (!orderData) return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400 mb-4">Tidak ada data pesanan</p>
        <button onClick={() => navigate('/order')} className="px-6 py-3 bg-purple-500/20 border border-purple-500/50 rounded-xl text-purple-300 hover:bg-purple-500/30 transition-all">← Kembali ke Order</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((step, i) => (
            <React.Fragment key={step}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                paymentStatus === 'success' 
                  ? 'bg-green-500 text-white' 
                  : step <= 2 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/10 text-gray-500'
              }`}>
                {paymentStatus === 'success' || step < 3 ? '✓' : '3'}
              </div>
              {i < 2 && <div className={`w-16 h-1 ${
                paymentStatus === 'success' ? 'bg-green-500' : step < 3 ? 'bg-purple-500' : 'bg-white/10'
              }`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className={`p-6 text-center border-b border-white/10 ${
            paymentStatus === 'success' 
              ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20' 
              : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
          }`}>
            <h1 className="text-2xl font-bold text-white">PEMBAYARAN</h1>
            <p className="text-gray-400 mt-1">Order ID: {orderData.order_id}</p>
          </div>

          {/* PENDING STATE */}
          {paymentStatus === 'pending' && (
            <div className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-gray-400 mb-2">TOTAL TAGIHAN</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Rp {orderData.total_price?.toLocaleString('id-ID')}
                </p>
              </div>

              {/* QRIS Image */}
              <div className="bg-white rounded-2xl p-4 aspect-square flex items-center justify-center">
                {orderData.qris_url ? (
                  <img src={orderData.qris_url} alt="QRIS" className="max-w-full max-h-full" />
                ) : (
                  <div className="text-center text-gray-500">
                    <p className="text-4xl mb-2">📱</p>
                    <p className="text-sm font-medium">QRIS DINAMIS</p>
                    <p className="text-xs">dari Midtrans</p>
                  </div>
                )}
              </div>

              {/* Timer */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">WAKTU KADALUARSA</p>
                <div className={`text-4xl font-mono font-bold ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </div>
                <p className="text-gray-500 text-sm mt-2">Selesaikan pembayaran sebelum waktu habis</p>
              </div>

              {/* QRIS Actions */}
              {orderData.qris_url && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <a href={orderData.qris_url} download={`QRIS-${orderData.order_id}.png`} className="flex-1 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-center font-medium hover:bg-white/20 transition-all">
                      📥 Download QR
                    </a>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(orderData.qris_url);
                        alert('URL QRIS berhasil dicopy!');
                      }} 
                      className="flex-1 py-3 bg-purple-500/20 border border-purple-500/50 rounded-xl text-purple-300 text-center font-medium hover:bg-purple-500/30 transition-all"
                    >
                      📋 Copy URL
                    </button>
                  </div>

                  {/* Simulator Link */}
                  <div className="bg-slate-800/50 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-2">🔗 QRIS Image URL (untuk Simulator Midtrans):</p>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        value={orderData.qris_url} 
                        readOnly 
                        className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-gray-300 font-mono truncate"
                        onClick={(e) => e.target.select()}
                      />
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(orderData.qris_url);
                          alert('URL berhasil dicopy!');
                        }}
                        className="px-3 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-xs hover:bg-green-500/30 transition-all whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      💡 Paste URL ini ke{' '}
                      <a href="https://simulator.sandbox.midtrans.com/qris/index" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                        Midtrans Simulator
                      </a>{' '}
                      untuk test pembayaran
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUCCESS STATE */}
          {paymentStatus === 'success' && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">Pembayaran Berhasil!</h2>
              <p className="text-gray-400 mb-6">Pesanan Anda sedang diproses. Admin akan segera menjalankan spin untuk Anda.</p>
              <div className="bg-white/5 rounded-xl p-4 text-left space-y-2">
                <p className="text-gray-400">Username Roblox: <span className="text-white font-bold">{orderData.order?.usn_roblox}</span></p>
                <p className="text-gray-400">Username TikTok: <span className="text-white font-bold">{orderData.order?.usn_tiktok}</span></p>
                <p className="text-gray-400">Total Spin: <span className="text-white font-bold">{orderData.order?.total_spin}x</span></p>
                <p className="text-gray-400">Kategori: <span className="text-white font-bold">{orderData.order?.kategori}</span></p>
              </div>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-green-400 text-sm">✅ Data pembayaran sudah masuk ke sistem admin. Silakan tunggu giliran spin Anda!</p>
              </div>
            </div>
          )}

          {/* EXPIRED STATE */}
          {paymentStatus === 'expired' && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⏰</span>
              </div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">Waktu Habis!</h2>
              <p className="text-gray-400 mb-6">Pembayaran telah kadaluarsa.</p>
              <button onClick={() => navigate('/order')} className="px-8 py-3 bg-purple-500/20 border border-purple-500/50 rounded-xl text-purple-300 hover:bg-purple-500/30 transition-all">
                ← Buat Pesanan Baru
              </button>
            </div>
          )}

          {/* Footer Links */}
          <div className="p-4 border-t border-white/10 space-y-3">
            <a href={CONFIG.links.spreadsheet} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 text-center font-medium hover:bg-blue-500/20 transition-all">
              📊 Link ke Spreadsheet untuk Mengecek Dapat Apa
            </a>
            <a href={CONFIG.links.whatsapp} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-center font-medium hover:bg-green-500/20 transition-all">
              💬 Link ke WhatsApp Grup
            </a>
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
    <div className="min-h-screen text-white">
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
