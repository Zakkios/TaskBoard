<?php

namespace App\Tests;

use Symfony\Component\BrowserKit\Cookie;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TaskTest extends WebTestCase
{
    protected function createAuthenticatedClient()
    {
        $client = static::createClient();
        $client->jsonRequest(
            'POST',
            '/api/login_check',
            [
                'username' => "test@example.com",
                'password' => "password",
            ]
        );

        $cookies = $client->getResponse()->headers->getCookies();
        foreach ($cookies as $cookie) {
            if ($cookie->getName() === 'jwt') {
                $client->getCookieJar()->set(
                    new Cookie(
                        $cookie->getName(),
                        $cookie->getValue(),
                        $cookie->getExpiresTime(),
                        $cookie->getPath(),
                        $cookie->getDomain() ?? '',
                        $cookie->isSecure(),
                        $cookie->isHttpOnly()
                    )
                );
            }
        }


        return $client;
    }

    public function testGetTasks(): void
    {
        $client = $this->createAuthenticatedClient();
        $client->request('GET', '/api/tasks', [], [], []);

        $this->assertResponseIsSuccessful();
        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertResponseStatusCodeSame(200);
        $this->assertIsArray($data);
        $this->assertNotEmpty($data);
        foreach ($data as $task) {
            $this->assertArrayHasKey('id', $task);
            $this->assertArrayHasKey('title', $task);
            $this->assertArrayHasKey('description', $task);
            $this->assertArrayHasKey('status', $task);
            $this->assertArrayHasKey('tags', $task);
        }
    }

    public function testCreateTask(): void
    {
        $client = $this->createAuthenticatedClient();
        $payload = [
            'title' => 'Nouvelle tâche',
            'description' => 'Ceci est une tâche de test',
            'status' => 'todo',
            'tags' => []
        ];

        $client->request('POST', '/api/tasks', [], [], [], json_encode($payload));

        $this->assertResponseStatusCodeSame(201);
        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals("La tâche a bien été ajouté.", $data['message']);
    }

    public function testUpdateTask(): void
    {
        $client = $this->createAuthenticatedClient();

        // Créer une tâche
        $client->request('POST', '/api/tasks', [], [], [], json_encode([
            'title' => 'Tâche à modifier',
            'description' => 'Ancienne description',
            'status' => 'todo',
            'tags' => []
        ]));

        $created = json_decode($client->getResponse()->getContent(), true);
        $taskId = $created['id'];

        // Mettre à jour la tâche
        $client->request('PUT', '/api/tasks/' . $taskId, [], [], [], json_encode([
            'title' => 'Tâche modifiée',
            'description' => 'Nouvelle description',
            'status' => 'done',
            'tags' => []
        ]));

        $this->assertResponseIsSuccessful();
        $updated = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals('La tâche a bien été modifié.', $updated['message']);
    }

    public function testDeleteTask(): void
    {
        $client = $this->createAuthenticatedClient();

        // Créer une tâche
        $client->request('POST', '/api/tasks', [], [], [], json_encode([
            'title' => 'Tâche à supprimer',
            'description' => 'Temporaire',
            'status' => 'todo',
            'tags' => []
        ]));

        $created = json_decode($client->getResponse()->getContent(), true);
        $taskId = $created['id'];

        // Supprimer la tâche
        $client->request('DELETE', '/api/tasks/' . $taskId, [], [], []);

        $this->assertResponseStatusCodeSame(200);
        $delete = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals('La tâche a bien été supprimé.', $delete['message']);
    }

    public function testUnauthenticated(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/tasks');
        $this->assertResponseStatusCodeSame(401);
    }
}
