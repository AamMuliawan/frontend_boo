/**
 * =====================================================
 * KONFIGURASI WEBSITE SPIN WHEEL
 * =====================================================
 * Edit file ini untuk mengubah konten website
 */

export const CONFIG = {
  // =====================================================
  // INFORMASI WEBSITE
  // =====================================================
  siteName: "SpinWheel",
  siteDescription: "Putar spin wheel dan dapatkan hadiah Robux menarik!",
  
  // =====================================================
  // API BACKEND URL
  // =====================================================
  // Ganti dengan URL backend Anda setelah di-deploy
  // Development: http://localhost:3000
  // Production: https://your-backend.railway.app
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  
  // =====================================================
  // LINKS
  // =====================================================
  links: {
    whatsapp: "https://wa.me/6281234567890", // Ganti dengan nomor WA Anda
    youtube: "https://youtube.com/@channelAnda", // Ganti dengan channel YouTube Anda
    spreadsheet: "https://docs.google.com/spreadsheets/d/1yTtWNaK6oy9vCowWdIapPTpgbI5mqPrKfdzrLB8Otyw/edit",
    tiktok: "https://tiktok.com/@yourprofile", // Ganti dengan TikTok Anda
  },
  
  // =====================================================
  // KATEGORI SPIN WHEEL
  // =====================================================
  // ⚠️ PENTING: wheelId harus sesuai dengan ID di aplikasi spin wheel Anda
  // Kategori 1 (Basic)   → wheelId = 6 → URL: http://localhost:5730/wheel?id=6&userName=xxx
  // Kategori 2 (Premium) → wheelId = 5 → URL: http://localhost:5730/wheel?id=5&userName=xxx
  
  categories: [
    {
      id: 1,
      name: "Spin Wheel Basic",
      price: 5000, // Harga per spin dalam Rupiah
      description: "Hadiah menarik untuk pemula!",
      wheelId: 6, // ⚠️ ID webhook = 6 untuk kategori Basic
      color: "from-blue-500 to-cyan-500",
      prizes: [
        { name: "10 Robux", emoji: "🎮" },
        { name: "25 Robux", emoji: "💎" },
        { name: "50 Robux", emoji: "⭐" },
        { name: "Zonk", emoji: "💨" },
        { name: "Spin Ulang", emoji: "🔄" },
        { name: "100 Robux", emoji: "👑" },
      ]
    },
    {
      id: 2,
      name: "Spin Wheel Premium",
      price: 15000, // Harga per spin dalam Rupiah
      description: "Hadiah lebih besar, kesempatan lebih tinggi!",
      wheelId: 5, // ⚠️ ID webhook = 5 untuk kategori Premium
      color: "from-purple-500 to-pink-500",
      featured: true,
      prizes: [
        { name: "100 Robux", emoji: "💎" },
        { name: "250 Robux", emoji: "⭐" },
        { name: "500 Robux", emoji: "👑" },
        { name: "50 Robux", emoji: "🎮" },
        { name: "Spin Ulang", emoji: "🔄" },
        { name: "1000 Robux", emoji: "🏆" },
      ]
    }
  ],
  
  // =====================================================
  // KONTEN HERO SECTION
  // =====================================================
  hero: {
    badge: "Live Streaming Ready",
    title: "Spin & Win",
    titleHighlight: "Robux Rewards!",
    description: "Putar spin wheel dan dapatkan hadiah Robux menarik! Pembayaran mudah via QRIS, hadiah langsung masuk ke akun Roblox kamu.",
    stats: [
      { value: "1000+", label: "Spin Terjual" },
      { value: "500+", label: "Happy Winners" },
      { value: "24/7", label: "Support" },
    ]
  },
  
  // =====================================================
  // GAMBAR & ASSETS
  // =====================================================
  // Ganti dengan path gambar Anda
  // Letakkan gambar di folder /public
  images: {
    // Hero avatar - ganti dengan gambar avatar Roblox Anda
    // Letakkan file di: /public/images/avatar.png
    heroAvatar: "/images/avatar.png",
    
    // Logo website (opsional)
    // Letakkan file di: /public/images/logo.png
    logo: "/images/logo.png",
    
    // Gambar hadiah untuk setiap kategori (opsional)
    // Jika tidak ada, akan menggunakan emoji dari prizes
    // Format: categoryId -> array of image paths
    prizeImages: {
      // 1: ["/images/prizes/robux-10.png", "/images/prizes/robux-25.png", ...],
      // 2: ["/images/prizes/robux-100.png", "/images/prizes/robux-250.png", ...],
    }
  },
  
  // =====================================================
  // TEKS & LABEL
  // =====================================================
  text: {
    orderButton: "ORDER →",
    submitButton: "🚀 GASKAN ORDER",
    downloadQr: "📥 DOWNLOAD QR",
    
    // Form labels
    formLabels: {
      usernameRoblox: "Username Roblox",
      usernameTiktok: "Username TikTok", 
      totalSpin: "Total Spin"
    },
    
    // Placeholder
    placeholders: {
      usernameRoblox: "Masukkan username Roblox",
      usernameTiktok: "Masukkan username TikTok"
    }
  },
  
  // =====================================================
  // PAYMENT SETTINGS
  // =====================================================
  payment: {
    expiryMinutes: 15, // Waktu kadaluarsa pembayaran (menit)
    minSpin: 1,
    maxSpin: 100,
  }
};

export default CONFIG;
