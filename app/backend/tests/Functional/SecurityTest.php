<?php

namespace App\Tests\Functional;

use App\Entity\Task;
use App\Tests\Traits\AuthClientTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SecurityTest extends WebTestCase
{
    use AuthClientTrait;

    public function testOneUserCannotAccessAnotherUsersTask(): void
    {
        // ----- User A -----
        $clientA = static::createClient();
        $this->login($clientA, 'test@example.com', 'password');

        $clientA->jsonRequest('POST', '/api/tasks', [
            'title' => 'Privée A',
            'description' => '...',
            'status' => 'todo',
            'tags' => [],
        ]);
        $this->assertResponseStatusCodeSame(201);
        $created = json_decode($clientA->getResponse()->getContent(), true);

        $taskId = $created['id'] ?? null;
        if (!$taskId) {
            $em = static::getContainer()->get(EntityManagerInterface::class);
            $repo = $em->getRepository(Task::class);
            $task = $repo->findOneBy(['title' => 'Privée A']);
            $this->assertNotNull($task, 'Tâche Privée A introuvable en base.');
            $taskId = $task->getId();
        }

        // Ferme le client pour éviter les conflits de session
        self::ensureKernelShutdown();

        // ----- User B -----
        $clientB = static::createClient();
        [$emailB, $usernameB, $passwordB] = $this->registerUser($clientB);
        $this->login($clientB, $emailB, $passwordB);

        $clientB->request('GET', '/api/tasks/' . $taskId);

        $this->assertTrue(
            in_array($clientB->getResponse()->getStatusCode(), [403, 404], true),
            'Un autre utilisateur ne doit pas pouvoir accéder à la ressource.'
        );
    }
}
