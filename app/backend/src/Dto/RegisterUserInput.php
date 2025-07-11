<?php

declare(strict_types=1);

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class RegisterUserInput
{
    #[Assert\NotBlank]
    #[Assert\Email(message: "L'email fourni est invalide.")]
    #[Assert\Length(max: 150, maxMessage: "L'email ne doit pas dépasser {{ limit }} caractères.")]
    public string $email;

    #[Assert\NotBlank]
    #[Assert\Length(min: 8, minMessage: 'Le mot de passe doit contenir au moins {{ limit }} caractères.')]
    #[Assert\Length(max: 72, maxMessage: 'Le mot de passe ne doit pas dépasser {{ limit }} caractères.')]
    #[Assert\Regex(pattern: '/[A-Z]/', message: 'Le mot de passe doit contenir au moins une lettre majuscule.')]
    #[Assert\Regex(pattern: '/[a-z]/', message: 'Le mot de passe doit contenir au moins une lettre minuscule.')]
    #[Assert\Regex(pattern: '/[0-9]/', message: 'Le mot de passe doit contenir au moins un chiffre.')]
    #[Assert\Regex(pattern: '/[\W_]/', message: 'Le mot de passe doit contenir au moins un caractère spécial.')]
    #[Assert\Regex(pattern: '/^(?!.*\s).+$/', message: "Le mot de passe ne doit pas contenir d'espaces.")]
    public string $password;

    #[Assert\NotBlank]
    #[Assert\Length(min: 3, minMessage: "Le nom d'utilisateur doit contenir au moins {{ limit }} caractères.")]
    #[Assert\Length(max: 30, maxMessage: "Le nom d'utilisateur ne doit pas dépasser {{ limit }} caractères.")]
    #[Assert\Regex(pattern: '/^[a-zA-Z0-9._-]+$/', message: "Le nom d'utilisateur ne doit contenir que caractères autorisés : lettres, chiffres, ., -, _")]
    public string $username;
}
