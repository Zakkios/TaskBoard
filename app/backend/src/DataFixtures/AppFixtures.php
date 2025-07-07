<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Task;
use App\Entity\Tag;
use App\Entity\RefreshToken;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Création d’un utilisateur de test
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setUsername('Test');
        $user->setRoles(['ROLE_USER']);
        $user->setPassword(
            $this->passwordHasher->hashPassword($user, 'password')
        );
        $manager->persist($user);

        // Création de tags
        $tag1 = new Tag();
        $tag1->setName('Urgent');
        $tag1->setColor('FF0000');
        $tag1->setUser($user);
        $manager->persist($tag1);

        $tag2 = new Tag();
        $tag2->setName('Personnel');
        $tag2->setColor('00FF00');
        $tag2->setUser($user);
        $manager->persist($tag2);

        // Création de tâches liées à l'utilisateur
        $task1 = new Task();
        $task1->setTitle('Première tâche');
        $task1->setDescription('Description de la première tâche');
        $task1->setUser($user);
        $task1->addTag($tag1);
        $manager->persist($task1);

        $task2 = new Task();
        $task2->setTitle('Deuxième tâche');
        $task2->setDescription('Description de la deuxième tâche');
        $task2->setUser($user);
        $task2->addTag($tag2);
        $manager->persist($task2);

        // Token fictif pour test
        $refreshToken = new RefreshToken();
        $refreshToken->setRefreshToken('dummy_token');
        $refreshToken->setUsername($user->getUserIdentifier());
        $refreshToken->setValid((new \DateTimeImmutable())->modify('+1 month'));
        $manager->persist($refreshToken);

        $manager->flush();
    }
}
