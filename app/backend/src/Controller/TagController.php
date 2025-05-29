<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Tag;
use App\Entity\User;
use App\Repository\TagRepository;
use App\Service\TagFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class TagController extends AbstractController
{
    public function __construct(
        private readonly TagRepository $tagRepository,
        private readonly TagFactory $tagFactory,
    ) {}

    #[Route('/api/tags', name: 'api_tags_by_user', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function getTagsByUserId(): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();
        if (null === $user->getId()) {
            return new JsonResponse([
                'message' => 'Utilisateur non trouvé'
            ], JsonResponse::HTTP_NOT_FOUND);
        }

        $tags = $this->tagRepository->findByUserId($user->getId());
        if (empty($tags)) {
            return new JsonResponse(
                [
                    'message' => 'Aucun tag trouvé.',
                ],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        return new JsonResponse(
            [
                'tags' => array_map(fn($tag) => [
                    'id' => $tag->getId(),
                    'name' => $tag->getName(),
                    'color' => $tag->getColor(),
                ], $tags),
            ],
            JsonResponse::HTTP_OK
        );
    }

    #[Route('/api/tags/{tagId}', name: 'api_tags_get', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function getTagById(Request $request): JsonResponse
    {
        $tagId = $request->attributes->get('tagId');
        $tag = $this->tagRepository->find($tagId);

        if (null === $tag) {
            return new JsonResponse(
                [
                    'message' => 'Tag non trouvé.',
                ],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        return new JsonResponse(
            [
                'id' => $tag->getId(),
                'name' => $tag->getName(),
                'color' => $tag->getColor(),
            ],
            JsonResponse::HTTP_OK
        );
    }

    #[Route('/api/tags', name: 'api_tags_create', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function createTag(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        /** @var User $user */
        $user = $this->getUser();
        $tag = new Tag();
        $tag->setUser($user);

        if ($error = $this->tagFactory->hydrateTag($tag, $data)) {
            return $error;
        }

        $this->tagRepository->save($tag);
        return new JsonResponse(
            [
                'message' => 'Tag créé'
            ],
            JsonResponse::HTTP_CREATED
        );
    }

    #[Route('/api/tags/{tagId}', name: 'api_tags_update', methods: ['PUT'])]
    #[IsGranted('ROLE_USER')]
    public function updateTag(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $tagId = $request->attributes->get('tagId');
        $tag = $this->tagRepository->find($tagId);

        if (null === $tag) {
            return new JsonResponse(
                [
                    'message' => 'Tag non trouvé.',
                ],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        if ($error = $this->tagFactory->hydrateTag($tag, $data)) {
            return $error;
        }

        $this->tagRepository->save($tag);
        return new JsonResponse(
            [
                'message' => 'Tag mis à jour.'
            ],
            JsonResponse::HTTP_OK
        );
    }

    #[Route('/api/tags/{tagId}', name: 'api_tags_delete ', methods: ['DELETE'])]
    #[IsGranted('ROLE_USER')]
    public function deleteTag(Request $request): JsonResponse
    {
        $tagId = $request->attributes->get('tagId');
        $tag = $this->tagRepository->find($tagId);
        if (null === $tag) {
            return new JsonResponse(
                [
                    'message' => 'Tag non trouvé.',
                ],
                JsonResponse::HTTP_NOT_FOUND
            );
        }
        $this->tagRepository->remove($tag);
        return new JsonResponse(
            [
                'message' => 'Tag supprimé.'
            ],
            JsonResponse::HTTP_OK
        );
    }
}
