<?php

declare(strict_types=1);

namespace App\Controller;

use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LogoutController extends AbstractController
{
    public function __construct(
        #[Autowire('%jwt_domain%')]
        private readonly string $cookieDomain,
        #[Autowire('%jwt_secure%')]
        private readonly bool $cookieSecure,
        #[Autowire('%jwt_samesite%')]
        private readonly string $cookieSameSite,
    ) {
    }

    #[Route('/api/logout', name: 'app_logout', methods: ['POST'])]
    public function logout(
        Request $request,
        RefreshTokenManagerInterface $rtManager,
    ): JsonResponse {
        $refreshTokenString = $request->cookies->get('refresh_token');
        if (is_string($refreshTokenString) && '' !== $refreshTokenString) {
            $rt = $rtManager->get($refreshTokenString);
            if ($rt) {
                $rtManager->delete($rt);
            }
        }

        $response = new JsonResponse();

        $response->headers->clearCookie('jwt', '/', $this->cookieDomain, $this->cookieSecure, true, $this->cookieSameSite);
        $response->headers->clearCookie('refresh_token', '/', $this->cookieDomain, $this->cookieSecure, true, $this->cookieSameSite);

        $response->setData(['message' => 'Déconnexion réussie']);
        $response->setStatusCode(204);

        return $response;
    }
}
