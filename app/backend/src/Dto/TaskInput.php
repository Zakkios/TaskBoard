<?php

declare(strict_types=1);

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class TaskInput
{
    #[Assert\NotBlank(message: 'Le titre de la tâche est requis.')]
    #[Assert\Type('string')]
    public string $title;

    #[Assert\Type('string')]
    public ?string $description = null;

    #[Assert\Type('string')]
    public ?string $status;

    /**
     * @var array<string>
     */
    #[Assert\All([
        new Assert\Type('string'),
    ])]
    public array $tags = [];
}
