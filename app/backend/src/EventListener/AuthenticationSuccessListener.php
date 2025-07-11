<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie;

class AuthenticationSuccessListener
{
    private string $cookieDomain;
    private bool $cookieSecure;

    public function __construct(
        string $cookieDomain,
        bool $cookieSecure,
    ) {
        $this->cookieDomain = $cookieDomain;
        $this->cookieSecure = $cookieSecure;
    }

    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();
        if (!isset($data['token'])) {
            return;
        }

        $value = $data['token'];
        if (!is_string($value)) {
            return;
        }
        $response = $event->getResponse();
        $response->headers->clearCookie('jwt');

        $cookie = new Cookie(
            'jwt',
            $value,
            (new \DateTime('+1 hour'))->format('D, d M Y H:i:s T'),
            '/',
            $this->cookieDomain,
            $this->cookieSecure,
            true,
            false,
            'strict'
        );

        $response->headers->setCookie($cookie);
        $event->setData(['message' => 'Connexion reussie']);
    }
}
