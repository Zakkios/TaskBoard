<?php

namespace App\EventListener;

use App\Enum\SameSiteEnum;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie;

class AuthenticationSuccessListener
{
    private ?string $cookieDomain;
    private bool $cookieSecure;
    private ?SameSiteEnum $cookieSameSite;

    public function __construct(
        ?string $cookieDomain,
        bool $cookieSecure,
        ?string $cookieSameSite,
    ) {
        $this->cookieDomain = $cookieDomain;
        $this->cookieSecure = $cookieSecure;
        $this->cookieSameSite = SameSiteEnum::fromString($cookieSameSite);
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
            '/', // path
            $this->cookieDomain,
            $this->cookieSecure,
            true,   // httpOnly
            false,  // raw
            $this->cookieSameSite?->value
        );

        $response->headers->setCookie($cookie);
        $event->setData(['message' => 'Connexion reussie']);
    }
}
