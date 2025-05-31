# Google Maps Setup untuk Website UMKM

## Konfigurasi Google Maps API

Untuk mengaktifkan fitur peta dengan nearby markers, Anda perlu mengkonfigurasi Google Maps API Key.

### 1. Mendapatkan Google Maps API Key

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau gunakan project yang sudah ada
3. Aktifkan Google Maps JavaScript API dan Places API
4. Buat credentials API Key
5. (Opsional) Batasi API Key untuk keamanan dengan menambahkan HTTP referrers

### 2. Konfigurasi di Laravel

Tambahkan API Key ke file `.env`:

```env
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
```

### 3. Restart Server

Setelah menambahkan API Key, restart server Laravel:

```bash
php artisan config:clear
php artisan serve
```

## Optimasi & Caching 🚀

### Fitur Caching untuk Menghemat Kuota API

1. **Backend Caching (Laravel)**
   - Data nearby products di-cache selama 1 jam
   - Mengurangi query database yang berulang
   - Otomatis refresh setelah 1 jam

2. **Frontend Optimization**
   - Lazy loading Google Maps script
   - Script caching untuk menghindari reload berulang
   - Animasi stagger untuk smooth UX
   - Radius circle visualization (25km)

3. **Clear Cache Command**
   ```bash
   # Clear semua cache nearby products
   php artisan cache:clear-nearby-products
   
   # Clear cache untuk product tertentu
   php artisan cache:clear-nearby-products 123
   ```

### Tips Menghemat Kuota Google Maps API

1. **Gunakan Cache**
   - Data nearby products sudah otomatis di-cache 1 jam
   - Hindari refresh berulang kali

2. **Batasi Request**
   - Maximum 12 nearby products per request
   - Radius dibatasi 25km untuk efisiensi

3. **Monitor Usage**
   - Check [Google Cloud Console](https://console.cloud.google.com/) untuk usage
   - Set budget alerts jika perlu

## Fitur Yang Tersedia

### 1. Interactive Map
- Peta interaktif dengan Google Maps
- Marker untuk lokasi UMKM saat ini (merah dengan label "YOU")
- Marker untuk UMKM terdekat (biru dengan nomor urut)
- Circle visualization untuk radius 25km
- Info window dengan detail UMKM
- Animasi drop untuk markers

### 2. Nearby Products
- Pencarian UMKM dalam radius 25km
- Sorting berdasarkan jarak terdekat
- Maximum 12 UMKM terdekat untuk performa optimal
- Grid layout dengan informasi jarak
- Caching data selama 1 jam

### 3. Responsif dan User-Friendly
- Legend untuk membedakan marker
- Loading state jika API Key belum dikonfigurasi
- Loading spinner saat memuat peta
- Responsive design untuk mobile dan desktop

## Troubleshooting

### Map tidak muncul
- Pastikan API Key sudah benar
- Pastikan Google Maps JavaScript API sudah diaktifkan
- Check browser console untuk error

### Nearby products tidak muncul
- Pastikan UMKM memiliki koordinat latitude/longitude
- Pastikan ada UMKM lain dalam radius 25km
- Check apakah UMKM lain memiliki gambar (syarat untuk ditampilkan)

### API Quota Cepat Habis
- Gunakan command untuk clear cache jika ada update data
- Jangan refresh halaman berulang kali
- Monitor usage di Google Cloud Console

## Customization

### Mengubah Radius Pencarian
Edit file `app/Http/Controllers/ProductController.php` pada method `showPublic()`:

```php
->having('distance', '<=', 25) // Ubah 25 ke radius yang diinginkan (dalam km)
```

### Mengubah Durasi Cache
Edit file yang sama:

```php
cache()->remember($cacheKey, 3600, function() // Ubah 3600 (1 jam) ke durasi yang diinginkan (dalam detik)
```

### Mengubah Jumlah Maximum Nearby Products
Edit file yang sama:

```php
->limit(12) // Ubah 12 ke jumlah yang diinginkan
```

### Mengubah Zoom Level Map
Edit file `resources/js/Pages/ProductDetail.jsx` pada component `NearbyProductsMap`:

```javascript
zoom: 12, // Ubah 12 ke zoom level yang diinginkan (1-20)
``` 