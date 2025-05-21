<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Selamat Datang di Newsletter UMKM</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Poppins', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            padding: 30px 0;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-weight: 700;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .button {
            display: inline-block;
            background: #3b82f6;
            color: white !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 5px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            color: #6b7280;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Selamat Datang!</h1>
        </div>
        <div class="content">
            <h2>Hai,</h2>
            <p>Terima kasih telah berlangganan newsletter UMKM kami. Kami sangat senang Anda bergabung dengan komunitas kami!</p>
            
            <p>Dengan berlangganan, Anda akan mendapatkan:</p>
            <ul>
                <li>Update terbaru tentang UMKM di sekitar Anda</li>
                <li>Tips dan trik bisnis untuk mengembangkan UMKM</li>
                <li>Penawaran dan diskon eksklusif</li>
                <li>Artikel informatif seputar dunia usaha</li>
            </ul>

            <p>Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau membutuhkan bantuan.</p>
            
            <p>Salam hangat,<br>Tim UMKM</p>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="{{ config('app.url') }}" class="button">Kunjungi Website Kami</a>
            </div>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} UMKM. Semua hak dilindungi.</p>
            <p>Anda menerima email ini karena Anda telah berlangganan newsletter kami.</p>
            <p><a href="{{ config('app.url') }}/unsubscribe" style="color: #3b82f6;">Berhenti berlangganan</a></p>
        </div>
    </div>
</body>
</html>
