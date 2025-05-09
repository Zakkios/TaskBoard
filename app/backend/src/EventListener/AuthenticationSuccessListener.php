<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie;

class AuthenticationSuccessListener
{
    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();
        $response = $event->getResponse();

        $cookie = new Cookie(
            'jwt',
            $data['token'],
            (new \DateTime('+1 hour'))->format('D, d M Y H:i:s T'),
            '/',
            'localhost',
            true,
            true,
            false,
            'strict'
        );

        $response->headers->setCookie($cookie);
        $event->setData(['message' => "Connexion reussie"]);
    }
}
