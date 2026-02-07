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
  //
  // 📸 GAMBAR IKAN:
  // Letakkan gambar ikan di folder: frontend/images/basic/ dan frontend/images/premium/
  // Format nama file: nama_persentase.png (contoh: glaider_50%.png, ruby_4%.png)
  // Pada field "image" di bawah, masukkan path relatif: /images/basic/nama_persentase.png
  
  categories: [
    {
      id: 1,
      name: "Spin Wheel Basic",
      price: 5000,
      description: "Hadiah menarik untuk pemula!",
      wheelId: 6,
      color: "from-blue-500 to-cyan-500",
      prizes: [
        { name: "Glaider", chance: "50%", image: "/images/basic/glaider_50%.png" },
        { name: "Locness", chance: "10%", image: "/images/basic/locness_10%.png" },
        { name: "Kraken", chance: "25%", image: "/images/basic/kraken_25%.png" },
        { name: "Frosborn Maxton", chance: "1%", image: "/images/basic/Frosborn_Maxton_1%.png" },
        { name: "Ruby", chance: "4%", image: "/images/basic/ruby_4%.png" },
        { name: "Maja", chance: "20%", image: "/images/basic/maja_20%.png" },
      ]
    },
    {
      id: 2,
      name: "Spin Wheel Premium",
      price: 15000,
      description: "Hadiah lebih besar, kesempatan lebih tinggi!",
      wheelId: 5,
      color: "from-purple-500 to-pink-500",
      featured: true,
      prizes: [
        { name: "Magma", chance: "10%", image: "/images/premium/magma_10%.png" },
        { name: "Maja Pirate", chance: "15%", image: "/images/premium/maja_pirate_15%.png" },
        { name: "Maja Fairy Dust", chance: "1%", image: "/images/premium/maja_fairy_dust_1%.png" },
        { name: "Leviathan", chance: "10%", image: "/images/premium/leviathan_10%.png" },
        { name: "Depthseeker", chance: "39%", image: "/images/premium/depthseeker_39%.png" },
        { name: "Cursed", chance: "10%", image: "/images/premium/cursed_10%.png" },
        { name: "Mega Pirate", chance: "15%", image: "/images/premium/mega_pirate.png" },
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
  images: {
    heroAvatar: "/images/avatar.png",
    logo: "/images/logo.png",
    prizeImages: {}
  },
  
  // =====================================================
  // TEKS & LABEL
  // =====================================================
  text: {
    orderButton: "ORDER →",
    submitButton: "🚀 GASKAN ORDER",
    downloadQr: "📥 DOWNLOAD QR",
    formLabels: {
      usernameRoblox: "Username Roblox",
      usernameTiktok: "Username TikTok", 
      totalSpin: "Total Spin"
    },
    placeholders: {
      usernameRoblox: "Masukkan username Roblox",
      usernameTiktok: "Masukkan username TikTok"
    }
  },
  
  // =====================================================
  // PAYMENT SETTINGS
  // =====================================================
  payment: {
    expiryMinutes: 15,
    minSpin: 1,
    maxSpin: 100,
  }
};

export default CONFIG;