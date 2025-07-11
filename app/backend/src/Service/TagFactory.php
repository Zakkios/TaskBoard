<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Tag;
use App\Dto\TagInput;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TagFactory
{
    public function __construct(
        private readonly ValidatorInterface $validator,
    ) {
    }

    /**
     * @param array{name: string, color: string} $data
     */
    public function hydrateTag(Tag $tag, array $data): JsonResponse|null
    {
        $tagInput = new TagInput();
        $tagInput->name = $data['name'];
        $tagInput->color = $data['color'];

        $errors = $this->validator->validate($tagInput);
        if (count($errors) > 0) {
            $firstError = $errors->get(0);

            return new JsonResponse([
                'message' => $firstError->getMessage(),
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $tag->setName($tagInput->name);
        $tag->setColor($tagInput->color);

        return null;
    }
}
