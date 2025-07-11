<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Task;
use App\Entity\User;
use App\Repository\TaskRepository;
use App\Service\TaskFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class TaskController extends AbstractController
{
    public function __construct(
        private readonly TaskRepository $taskRepository,
        private readonly TaskFactory $taskFactory,
    ) {
    }

    #[Route('/api/tasks', name: 'api_tasks_by_user', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function getTasksByUserId(): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();
        if (null === $user->getId()) {
            return new JsonResponse([
                'message' => 'Utilisateur non trouvé',
            ], JsonResponse::HTTP_NOT_FOUND);
        }

        /** @var Task[] $tasks */
        $tasks = $this->taskRepository->findByUserId($user->getId());
        if (empty($tasks)) {
            return new JsonResponse(
                [
                    'tasks' => [],
                ],
                JsonResponse::HTTP_OK
            );
        }

        return new JsonResponse(
            [
                'tasks' => array_map(fn ($t) => [
                    'id' => $t->getId(),
                    'title' => $t->getTitle(),
                    'description' => $t->getDescription(),
                    'status' => $t->getStatus(),
                    'created_at' => $t->getCreatedAt()->format('Y-m-d H:i:s'),
                    'updated_at' => $t->getUpdatedAt()->format('Y-m-d H:i:s'),
                    'tags' => array_map(fn ($tag) => [
                        'id' => $tag->getId(),
                        'name' => $tag->getName(),
                        'color' => $tag->getColor(),
                    ], $t->getTags()->toArray()),
                ], $tasks),
            ],
            JsonResponse::HTTP_OK
        );
    }

    #[Route('/api/tasks/{taskId}', name: 'api_tasks_get', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function getTasksById(Request $request): JsonResponse
    {
        $taskId = $request->attributes->get('taskId');
        $task = $this->taskRepository->find($taskId);
        if (null === $task) {
            return new JsonResponse(
                [
                    'message' => 'La tâche n\'existe pas.',
                ],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        return new JsonResponse(
            [
                'task' => [
                    'id' => $task->getId(),
                    'title' => $task->getTitle(),
                    'description' => $task->getDescription(),
                    'status' => $task->getStatus(),
                    'created_at' => $task->getCreatedAt()->format('Y-m-d H:i:s'),
                    'updated_at' => $task->getUpdatedAt()->format('Y-m-d H:i:s'),
                    'tags' => array_map(fn ($tag) => [
                        'id' => $tag->getId(),
                        'name' => $tag->getName(),
                        'color' => $tag->getColor(),
                    ], $task->getTags()->toArray()),
                ],
            ]
        );
    }

    #[Route('/api/tasks', name: 'api_tasks_create', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function createTask(Request $request): JsonResponse
    {
        /**
         * @var array{
         *     title: string,
         *     description: string,
         *     status: string,
         *     tags: array<string>
         * } $data
         */
        $data = json_decode($request->getContent(), true);

        /** @var User $user */
        $user = $this->getUser();
        $task = new Task();
        $task->setUser($user);

        if ($error = $this->taskFactory->hydrateTask($task, $data)) {
            return $error;
        }
        $this->taskRepository->save($task);

        return new JsonResponse(
            [
                'message' => 'La tâche a bien été ajouté.',
                'id' => $task->getId(),
            ],
            JsonResponse::HTTP_CREATED
        );
    }

    #[Route('/api/tasks/{taskId}', name: 'api_tasks_update', methods: ['PUT'])]
    #[IsGranted('ROLE_USER')]
    public function updateTask(Request $request): JsonResponse
    {
        /**
         * @var array{
         *     title: string,
         *     description: string,
         *     status: string,
         *     tags: array<string>
         * } $data
         */
        $data = json_decode($request->getContent(), true);

        $taskId = $request->attributes->get('taskId');
        $task = $this->taskRepository->find($taskId);
        if (null === $task) {
            return new JsonResponse(
                [
                    'message' => 'La tâche n\'existe pas.',
                ],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        /** @var User $user */
        $user = $this->getUser();
        /** @var User $taskUser */
        $taskUser = $task->getUser();
        if ($taskUser->getId() !== $user->getId()) {
            return new JsonResponse(
                ['message' => 'Accès interdit à cette tâche.'],
                JsonResponse::HTTP_FORBIDDEN
            );
        }

        if ($error = $this->taskFactory->hydrateTask($task, $data)) {
            return $error;
        }
        $task->setUpdatedAt(new \DateTimeImmutable());

        $this->taskRepository->save($task);

        return new JsonResponse(
            [
                'message' => 'La tâche a bien été modifié.',
            ],
            JsonResponse::HTTP_OK
        );
    }

    #[Route('/api/tasks/{taskId}', name: 'api_tasks_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_USER')]
    public function deleteTask(Request $request): JsonResponse
    {
        $taskId = $request->attributes->get('taskId');
        $task = $this->taskRepository->find($taskId);
        if (null === $task) {
            return new JsonResponse(
                [
                    'message' => 'La tâche n\'existe pas.',
                ],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        /** @var User $user */
        $user = $this->getUser();
        /** @var User $taskUser */
        $taskUser = $task->getUser();
        if ($taskUser->getId() !== $user->getId()) {
            return new JsonResponse(
                ['message' => 'Accès interdit à cette tâche.'],
                JsonResponse::HTTP_FORBIDDEN
            );
        }
        $this->taskRepository->remove($task);

        return new JsonResponse(
            [
                'message' => 'La tâche a bien été supprimé.',
            ],
            JsonResponse::HTTP_OK
        );
    }
}
