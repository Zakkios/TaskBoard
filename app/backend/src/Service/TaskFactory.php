<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\TaskInput;
use App\Entity\Task;
use App\Enum\StatusEnum;
use App\Repository\TagRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TaskFactory
{
    public function __construct(
        private readonly TagRepository $tagRepository,
        private readonly ValidatorInterface $validator,
    ) {
    }

    /**
     * @param array{
     *     title?: string|null,
     *     description?: string|null,
     *     status?: string|null,
     *     tags?: array<string>
     * } $data
     */
    public function hydrateTask(Task $task, array $data): ?JsonResponse
    {
        $taskInput = new TaskInput();
        $taskInput->title = $data['title'] ?? null;
        $taskInput->description = $data['description'] ?? null;
        $taskInput->status = $data['status'] ?? null;
        $taskInput->tags = $data['tags'] ?? [];

        $errors = $this->validator->validate($taskInput);
        if (count($errors) > 0) {
            $firstError = $errors->get(0);

            return new JsonResponse(
                ['message' => $firstError->getMessage()],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $task->setTitle($taskInput->title ?? '');
        $task->setDescription($taskInput->description ?? null);

        $statusValue = $taskInput->status ?? StatusEnum::TODO->value;
        $statusEnum = StatusEnum::tryFrom($statusValue) ?? StatusEnum::TODO;
        $task->setStatus($statusEnum);

        $task->clearTags();
        foreach ($taskInput->tags as $tagId) {
            $tagEntity = $this->tagRepository->find($tagId);
            if (null === $tagEntity) {
                return new JsonResponse(['message' => 'Le tag n\'existe pas.'], JsonResponse::HTTP_BAD_REQUEST);
            }
            $task->addTag($tagEntity);
        }

        return null;
    }
}
