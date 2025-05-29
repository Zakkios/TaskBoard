<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\TaskInput;
use App\Entity\Task;
use App\Enum\StatusEnum;
use App\Repository\TagRepository;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TaskFactory
{
    public function __construct(
        private readonly TagRepository $tagRepository,
        private readonly ValidatorInterface $validator,
    ) {}

    /**
     * @param array{
     *     title: string,
     *     description: string,
     *     status: string,
     *     tags: array<string>
     * } $data
     */
    public function hydrateTask(Task $task, array $data): JsonResponse|null
    {

        $taskInput = new TaskInput();
        $taskInput->title = $data['title'];
        $taskInput->description = $data['description'];
        $taskInput->status = $data['status'];
        $taskInput->tags = $data['tags'];

        $errors = $this->validator->validate($taskInput);
        if (count($errors) > 0) {
            $firstError = $errors->get(0);

            return new JsonResponse([
                'message' => $firstError->getMessage(),
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $task->setTitle($taskInput->title);
        $task->setDescription($taskInput->description ?? null);

        $status = $taskInput->status;
        if (!StatusEnum::tryFrom($status)) {
            $status = StatusEnum::TODO->value;
        }
        $task->setStatus(StatusEnum::from($status));

        $task->clearTags();
        foreach ($taskInput->tags as $tagId) {
            $tagEntity = $this->tagRepository->find($tagId);
            if (null === $tagEntity) {
                return new JsonResponse(
                    [
                        'message' => 'Le tag n\'existe pas.'
                    ],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }
            $task->addTag($tagEntity);
        }

        return null;
    }
}
