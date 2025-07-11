<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Symfony\Component\HttpFoundation\JsonResponse;

class AuthenticationFailureListener
{
    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event): void
    {
        $response = new JWTAuthenticationFailureResponse('E-mail ou mot de passe incorrect', JsonResponse::HTTP_UNAUTHORIZED);

        $event->setResponse($response);
    }
}
