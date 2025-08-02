<?php

namespace App\Tests\Functional;

use App\Entity\Task;
use App\Enum\StatusEnum;
use App\Tests\Traits\AuthClientTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TaskTest extends WebTestCase
{
    use AuthClientTrait;

    public function testListTasks(): void
    {
        $client = static::createClient();
        $this->login($client, 'test@example.com', 'password');

        $client->request('GET', '/api/tasks');
        $this->assertResponseIsSuccessful();
        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertIsArray($data);
    }

    public function testCreateTaskSuccess(): void
    {
        $client = static::createClient();
        $this->login($client, 'test@example.com', 'password');

        $client->jsonRequest('POST', '/api/tasks', [
            'title' => 'Nouvelle tâche',
            'description' => 'Ceci est une tâche de test',
            'status' => 'todo',
            'tags' => [],
        ]);
        $this->assertResponseStatusCodeSame(201);

        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertSame("La tâche a bien été ajouté.", $data['message'] ?? null);

        $em = static::getContainer()->get(EntityManagerInterface::class);
        $repo = $em->getRepository(Task::class);
        $task = $repo->findOneBy(['title' => 'Nouvelle tâche']);
        $this->assertNotNull($task);
        $this->assertSame('Ceci est une tâche de test', $task->getDescription());

        $this->assertInstanceOf(StatusEnum::class, $task->getStatus());
        $this->assertSame(StatusEnum::TODO->value, $task->getStatus()->value);
    }

    public function testCreateTaskValidationErrors(): void
    {
        $client = static::createClient();
        $this->login($client, 'test@example.com', 'password');

        $client->jsonRequest('POST', '/api/tasks', [
            'description' => '…',
            'status' => 'todo',
            'tags' => [],
        ]);
        $status = $client->getResponse()->getStatusCode();
        $this->assertTrue(
            in_array($status, [400, 422], true),
            "Code attendu 400 ou 422 pour erreur de validation, reçu {$status}"
        );
        $err = json_decode($client->getResponse()->getContent(), true);
        $this->assertSame("Le titre de la tâche est requis.", $err['message'] ?? null);
    }

    public function testUpdateTask(): void
    {
        $client = static::createClient();
        $this->login($client, 'test@example.com', 'password');

        // CREATE
        $client->jsonRequest('POST', '/api/tasks', [
            'title' => 'Tâche à modifier',
            'description' => 'Ancienne description',
            'status' => 'todo',
            'tags' => [],
        ]);
        $this->assertResponseStatusCodeSame(201);
        $created = json_decode($client->getResponse()->getContent(), true);
        $taskId = $created['id'] ?? null;

        if (!$taskId) {
            $em = static::getContainer()->get(EntityManagerInterface::class);
            $repo = $em->getRepository(Task::class);
            $task = $repo->findOneBy(['title' => 'Tâche à modifier']);
            $this->assertNotNull($task);
            $taskId = $task->getId();
        }

        // UPDATE
        $client->jsonRequest('PUT', '/api/tasks/' . $taskId, [
            'title' => 'Tâche modifiée',
            'description' => 'Nouvelle description',
            'status' => 'done',
            'tags' => [],
        ]);
        $this->assertResponseIsSuccessful();
        $updated = json_decode($client->getResponse()->getContent(), true);
        $this->assertSame('La tâche a bien été modifié.', $updated['message'] ?? null);
    }

    public function testDeleteTask(): void
    {
        $client = static::createClient();
        $this->login($client, 'test@example.com', 'password');

        // CREATE
        $client->jsonRequest('POST', '/api/tasks', [
            'title' => 'Tâche à supprimer',
            'description' => 'Temporaire',
            'status' => 'todo',
            'tags' => [],
        ]);
        $this->assertResponseStatusCodeSame(201);
        $created = json_decode($client->getResponse()->getContent(), true);
        $taskId = $created['id'] ?? null;

        if (!$taskId) {
            $em = static::getContainer()->get(EntityManagerInterface::class);
            $repo = $em->getRepository(Task::class);
            $task = $repo->findOneBy(['title' => 'Tâche à supprimer']);
            $this->assertNotNull($task);
            $taskId = $task->getId();
        }

        // DELETE
        $client->request('DELETE', '/api/tasks/' . $taskId);
        $this->assertResponseStatusCodeSame(200);
        $deleted = json_decode($client->getResponse()->getContent(), true);
        $this->assertSame('La tâche a bien été supprimé.', $deleted['message'] ?? null);
    }
}
