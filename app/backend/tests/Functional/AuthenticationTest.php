<?php

namespace App\Tests\Functional;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

final class AuthenticationTest extends WebTestCase
{
    public function testLoginSuccess(): void
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/login_check', [
            'username' => 'test@example.com',
            'password' => 'password',
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
        $cookies = $client->getResponse()->headers->getCookies();
        $this->assertNotEmpty($cookies, 'Expected auth cookie');
        $this->assertTrue(
            \in_array('jwt', array_map(fn($c) => $c->getName(), $cookies), true),
            'JWT cookie missing'
        );
    }

    public function testLoginFailure(): void
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/login_check', [
            'username' => 'test@example.com',
            'password' => 'WRONG',
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }

    public function testAccessDeniedWithoutAuth(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/tasks');
        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }
}
