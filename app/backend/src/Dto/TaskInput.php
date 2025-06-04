<?php

declare(strict_types=1);

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class TaskInput
{
    #[Assert\NotBlank(message: 'Le titre de la tâche est requis.')]
    #[Assert\Type('string')]
    #[Assert\Length(
        min: 3,
        max: 50,
        minMessage: 'Le titre de la tâche doit contenir au moins {{ limit }} caractères.',
        maxMessage: 'Le titre de la tâche ne peut pas dépasser {{ limit }} caractères.'
    )]
    public string $title;

    #[Assert\Type('string')]
    #[Assert\Length(
        min: 0,
        max: 500,
        maxMessage: 'La description de la tâche ne peut pas dépasser {{ limit }} caractères.'
    )]
    public ?string $description = null;

    #[Assert\Type('string')]
    #[Assert\Choice(
        choices: ['todo', 'doing', 'done'],
        message: 'Le statut de la tâche n\'est pas valide.'
    )]
    public ?string $status;

    /**
     * @var array<string>
     */
    #[Assert\All([
        new Assert\Type('string'),
    ])]
    public array $tags = [];
}
