<?php

namespace App\Enums;

enum BidangUsaha: string
{
    case KULINER = 'kuliner';
    case FASHION = 'fashion';
    case JASA = 'jasa';
    case PERTANIAN = 'pertanian';
    case KREATIF = 'kreatif';

    public function label(): string
    {
        return match ($this) {
            self::KULINER => 'Kuliner',
            self::FASHION => 'Fashion',
            self::JASA => 'Jasa',
            self::PERTANIAN => 'Pertanian',
            self::KREATIF => 'Kreatif',
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
