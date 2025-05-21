<?php

namespace App\Http\Controllers;

use App\Mail\WelcomeNewsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class NewsletterController extends Controller
{
    /**
     * Handle newsletter subscription
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ], [
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email tidak boleh lebih dari :max karakter.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Here you would typically save the email to your database
            // For example:
            // Subscriber::firstOrCreate(['email' => $request->email]);

            // Send welcome email
            Mail::to($request->email)->send(new WelcomeNewsletter($request->email));
            
            return response()->json([
                'success' => true,
                'message' => 'Terima kasih telah berlangganan newsletter kami!'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Failed to send welcome email: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'
            ], 500);
        }
    }
}
