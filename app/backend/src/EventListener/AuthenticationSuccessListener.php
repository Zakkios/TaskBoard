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
        $domain = $_ENV['JWT_DOMAIN'] ?? 'localhost';
        $secure = $_ENV['JWT_SECURE'] ?? false;

        $cookie = new Cookie(
            'jwt',
            $data['token'],
            (new \DateTime('+1 hour'))->format('D, d M Y H:i:s T'),
            '/',
            $domain,
            $secure,
            true,
            false,
            'strict'
        );

        $response->headers->setCookie($cookie);
        $event->setData(['message' => "Connexion reussie"]);
    }
}
