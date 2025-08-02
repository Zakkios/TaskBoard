<?php

namespace App\Tests\Traits;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Component\BrowserKit\Cookie;

trait AuthClientTrait
{
    private function login(KernelBrowser $client, string $username, string $password): void
    {
        $client->jsonRequest('POST', '/api/login_check', [
            'username' => $username,
            'password' => $password,
        ]);

        $this->assertTrue(
            $client->getResponse()->isSuccessful(),
            'Échec de l’authentification sur /api/login_check'
        );

        $cookies = $client->getResponse()->headers->getCookies();
        $jwt = null;
        foreach ($cookies as $cookie) {
            if ($cookie->getName() === 'jwt') {
                $jwt = $cookie;
                break;
            }
        }
        $this->assertNotNull($jwt, 'Le cookie JWT n’a pas été renvoyé.');

        $client->getCookieJar()->set(new Cookie(
            $jwt->getName(),
            $jwt->getValue(),
            $jwt->getExpiresTime(),
            $jwt->getPath(),
            $jwt->getDomain() ?? '',
            $jwt->isSecure(),
            $jwt->isHttpOnly()
        ));
    }

    private function registerUser(KernelBrowser $client, string $email = null): array
    {
        $email = $email ?? 'user_'.uniqid().'@example.com';
        $payload = [
            'email' => $email,
            'username' => 'u_'.substr(md5($email), 0, 8),
            'password' => 'Password1!',
        ];

        $client->jsonRequest('POST', '/api/register', $payload);
        $this->assertTrue(
            $client->getResponse()->isSuccessful(),
            'Échec de la création utilisateur via /api/register'
        );

        return [$payload['email'], $payload['username'], $payload['password']];
    }
}
