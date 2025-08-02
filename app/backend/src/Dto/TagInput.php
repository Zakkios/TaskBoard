<?php

declare(strict_types=1);

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class TagInput
{
    #[Assert\NotBlank(message: 'Le nom du tag est requis.')]
    #[Assert\Type('string')]
    #[Assert\Length(
        min: 1,
        max: 16,
        minMessage: 'Le nom du tag doit contenir au moins {{ limit }} caractère.',
        maxMessage: 'Le nom du tag ne peut pas dépasser {{ limit }} caractères.'
    )]
    public ?string $name = null;

    #[Assert\NotBlank(message: 'La couleur du tag est requise.')]
    #[Assert\Type('string')]
    #[Assert\Regex(
        pattern: '/^[0-9a-fA-F]{6}$/',
        message: 'La couleur du tag doit être un hexadécimal sur 6 caractères (ex : FF5733).'
    )]
    public ?string $color = null;
}
