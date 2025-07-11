<?php

namespace App\Repository;

use App\Entity\Tag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Ramsey\Uuid\UuidInterface;

/**
 * @extends ServiceEntityRepository<Tag>
 */
class TagRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tag::class);
    }

    /**
     * @return array<Tag>|null
     */
    public function findByUserId(UuidInterface $userId): ?array
    {
        /** @var array<Tag>|null $result */
        $result = $this->createQueryBuilder('t')
            ->andWhere('t.user = :userId')
            ->setParameter('userId', $userId)
            ->orderBy('t.name', 'ASC')
            ->getQuery()
            ->getResult();

        return $result;
    }

    public function save(Tag $tag): void
    {
        $this->getEntityManager()->persist($tag);
        $this->getEntityManager()->flush();
    }

    public function remove(Tag $tag): void
    {
        $this->getEntityManager()->remove($tag);
        $this->getEntityManager()->flush();
    }
}
