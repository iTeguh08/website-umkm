<?php

namespace App\Enums;

enum JenisUsaha: string
{
    case MIKRO = 'mikro';
    case KECIL = 'kecil';
    case MENENGAH = 'menengah';

    public function label(): string
    {
        return match ($this) {
            self::MIKRO => 'Mikro',
            self::KECIL => 'Kecil',
            self::MENENGAH => 'Menengah',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function labels(): array
    {
        return array_column(self::cases(), 'label');
    }
}
