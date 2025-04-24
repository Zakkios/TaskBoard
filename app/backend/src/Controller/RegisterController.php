<?php

namespace App\Controller;

use App\Entity\User;
use App\Dto\RegisterUserInput;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;

class RegisterController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $em
    ): JsonResponse {
        /** @var RegisterUserInput $data */
        $data = $serializer->deserialize($request->getContent(), RegisterUserInput::class, 'json');

        // Validation des données
        $errors = $validator->validate($data);
        if (count($errors) > 0) {
            $errorMessages = [];
            /** @var ConstraintViolationInterface $error */
            foreach ($errors as $error) {
                $field = $error->getPropertyPath();
                $message = $error->getMessage();
                $errorMessages[$field][] = $message;
            }

            return new JsonResponse(['errors' => $errorMessages], 400);
        }

        // Vérification unicité de l'email
        if ($em->getRepository(User::class)->findOneBy(['email' => $data->email])) {
            return new JsonResponse(['errors' => ['email' => ['Cet email est déjà utilisé.']]], 400);
        }

        // Vérification unicité du username
        if ($em->getRepository(User::class)->findOneBy(['username' => $data->username])) {
            return new JsonResponse(['errors' => ['username' => ['Ce nom d\'utilisateur est déjà utilisé.']]], 400);
        }

        // Création de l'utilisateur
        $user = new User();
        $user->setEmail($data->email);
        $user->setUsername($data->username);
        $user->setPassword(
            $passwordHasher->hashPassword($user, $data->password)
        );

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['message' => 'Utilisateur créé avec succès.'], 201);
    }
}
