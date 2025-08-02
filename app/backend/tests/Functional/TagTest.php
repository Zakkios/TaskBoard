<?php

namespace App\Tests\Functional;

use App\Entity\Tag;
use App\Tests\Traits\AuthClientTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TagTest extends WebTestCase
{
    use AuthClientTrait;

    public function testCreateUpdateDeleteTag(): void
    {
        $client = static::createClient();
        $this->login($client, 'test@example.com', 'password');

        // CREATE
        $client->jsonRequest('POST', '/api/tags', [
            'name' => 'Urgent',
            'color' => 'ff0000',
        ]);
        $this->assertResponseStatusCodeSame(201);
        $payload = json_decode($client->getResponse()->getContent(), true);

        $tagId = $payload['id'] ?? null;
        if (!$tagId) {
            $em = static::getContainer()->get(EntityManagerInterface::class);
            $repo = $em->getRepository(Tag::class);
            $tag = $repo->findOneBy(['name' => 'Urgent']);
            $this->assertNotNull($tag, 'Le tag créé est introuvable en base.');
            $tagId = $tag->getId();
        }

        // UPDATE
        $client->jsonRequest('PUT', '/api/tags/' . $tagId, [
            'name' => 'Très urgent',
            'color' => 'ff3300',
        ]);
        $this->assertResponseIsSuccessful();

        // DELETE
        $client->request('DELETE', '/api/tags/' . $tagId);
        $this->assertResponseStatusCodeSame(200);
    }

    public function testValidationErrors(): void
    {
        $client = static::createClient();
        $this->login($client, 'test@example.com', 'password');


        $client->jsonRequest('POST', '/api/tags', [
            'color' => '00ff00',
        ]);
        $this->assertResponseStatusCodeSame(400);
        $err1 = json_decode($client->getResponse()->getContent(), true);
        $this->assertSame("Données JSON invalides ou incomplètes", $err1['message'] ?? null);

        $client->jsonRequest('POST', '/api/tags', [
            'name' => 'Vert',
            'color' => 'zzzzzz',
        ]);
        $this->assertResponseStatusCodeSame(400);
    }
}
