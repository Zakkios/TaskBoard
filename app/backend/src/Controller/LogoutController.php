<?php

declare(strict_types=1);

namespace App\Controller;

use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LogoutController extends AbstractController
{
    #[Route('/api/logout', name: 'app_logout', methods: ['POST'])]
    public function logout(
        Request $request,
        RefreshTokenManagerInterface $rtManager,
        string $jwt_domain,
        string $jwt_samesite,
        bool $jwt_secure,
    ): JsonResponse {
        $refreshTokenString = $request->cookies->get('refresh_token');
        if (is_string($refreshTokenString) && '' !== $refreshTokenString) {
            $rt = $rtManager->get($refreshTokenString);
            if ($rt) {
                $rtManager->delete($rt);
            }
        }

        $response = new JsonResponse();

        $response->headers->clearCookie('jwt', '/', $jwt_domain, $jwt_secure, true, $jwt_samesite);
        $response->headers->clearCookie('refresh_token', '/', $jwt_domain, $jwt_secure, true, $jwt_samesite);

        return $response;
    }
}
