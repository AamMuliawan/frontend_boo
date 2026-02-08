/**
 * =====================================================
 * KONFIGURASI WEBSITE SPIN WHEEL
 * =====================================================
 */

export const CONFIG = {
  siteName: "SpinWheel",
  siteDescription: "Putar spin wheel dan dapatkan hadiah Robux menarik!",
  
  // API BACKEND URL
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  
  // =====================================================
  // LINKS - Edit di sini untuk mengubah semua link
  // =====================================================
  links: {
    // WhatsApp Group
    whatsapp: "https://chat.whatsapp.com/CzOEHQeIjcBG6NlzUfCiWO?mode=gi_t",
    
    // YouTube Channel
    youtube: "https://www.youtube.com/@Hallooboo",
    
    // 🔴 LINK LIVE STREAMING - Ganti setiap mau live
    liveStreaming: "https://www.tiktok.com/@hallooboo?_r=1&_t=ZS-93kawySbTnU",
    
    // Spreadsheet untuk pembeli cek hasil
    spreadsheet: "https://docs.google.com/spreadsheets/d/1vfGr14jZmPZjyBD8Z2uzBPBHvUR1eQSPIAn1zlpyUSY/edit?gid=991053640#gid=991053640",
    
    // TikTok
    tiktok: "https://www.tiktok.com/@hallooboo?_r=1&_t=ZS-93kawySbTnU",
    
    // 🐟 Private Server Fisch - Link setelah pembayaran berhasil
    privateServer: "https://www.roblox.com/share?code=1a4a585d597f3b48ab9f78b2e696e63b&type=Server",
  },
  
  // =====================================================
  // KATEGORI SPIN WHEEL
  // =====================================================
  categories: [
    {
      id: 1,
      name: "Spin Wheel Basic",
      price: 5000,
      description: "Hadiah menarik untuk pemula!",
      wheelId: 6,
      color: "from-blue-500 to-cyan-500",
      prizes: [
        { name: "Glaider", chance: "50%", image: "/images/basic/glaider_50.png" },
        { name: "Locness", chance: "10%", image: "/images/basic/locness_10.png" },
        { name: "Kraken", chance: "25%", image: "/images/basic/kraken_25.png" },
        { name: "Frosborn Maxton", chance: "1%", image: "/images/basic/Frosborn_Maxton_1.png" },
        { name: "Ruby", chance: "4%", image: "/images/basic/ruby_4.png" },
        { name: "Maja", chance: "20%", image: "/images/basic/maja_20.png" },
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
        { name: "Magma", chance: "10%", image: "/images/premium/magma_10.png" },
        { name: "Maja Pirate", chance: "15%", image: "/images/premium/maja_pirate_15.png" },
        { name: "Maja Fairy Dust", chance: "1%", image: "/images/premium/maja_fairy_dust_1.png" },
        { name: "Leviathan", chance: "10%", image: "/images/premium/leviathan_10.png" },
        { name: "Depthseeker", chance: "39%", image: "/images/premium/depthseeker_39.png" },
        { name: "Cursed", chance: "10%", image: "/images/premium/cursed_10.png" },
        { name: "Mega Pirate", chance: "15%", image: "/images/premium/mega_pirate.png" },
      ]
    }
  ],
  
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
  
  images: {
    heroAvatar: "/images/avatar.png",
    logo: "/images/logo.png",
  },
  
  text: {
    orderButton: "ORDER →",
    submitButton: "🚀 GASKAN ORDER",
    downloadQr: "📥 DOWNLOAD QR",
    formLabels: {
      usernameTiktok: "Username TikTok",
      usernameRoblox: "Username Roblox",
      totalSpin: "Total Spin"
    },
    placeholders: {
      usernameTiktok: "Masukkan username TikTok",
      usernameRoblox: "Masukkan username Roblox"
    }
  },
  
  payment: {
    expiryMinutes: 15,
    minSpin: 1,
    maxSpin: 100,
  }
};

export default CONFIG;