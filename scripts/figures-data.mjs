// Each label is English|French. A single spelling is shared by both languages.
// A flow reads left to right. An array in a column places nodes one above another.
export const options = [
  ['API gateway|Passerelle API', 'Backend for Frontend', 'Load balancer|Répartiteur de charge', 'GraphQL Federation|Fédération GraphQL'],
  ['Eager loading|Chargement anticipé', 'DataLoader', 'Cache in Redis|Cache Redis', 'Denormalize the orders table|Dénormaliser la table des commandes'],
  ['Fixed window|Fenêtre fixe', 'Sliding window log|Journal à fenêtre glissante', 'Token bucket|Seau à jetons', 'Leaky bucket|Seau percé'],
  ['Unique constraint|Contrainte d’unicité', 'Idempotency-Key header|En-tête Idempotency-Key', 'Distributed lock|Verrou distribué', 'Serializable isolation|Isolation sérialisable'],
  ['Hash by order_id|Hachage de order_id', 'Ranges of created_at|Plages de created_at', 'Directory-based sharding|Sharding par répertoire', 'Consistent hashing|Hachage cohérent'],
  ['SETNX + TTL + fencing token|SETNX, TTL et jeton de fencing', 'Redlock', 'Pessimistic database lock|Verrou pessimiste en base', 'Optimistic concurrency|Concurrence optimiste'],
  ['SQS FIFO by order|SQS FIFO par commande', 'Reorder buffer|Tampon de réordonnancement', 'Saga', 'Event versioning|Versionnement des événements'],
  ['Write-through', 'Write-behind', 'Cache-aside', 'Read-through'],
  ['Full CQRS|CQRS complet', 'Read replicas|Répliques de lecture', 'Denormalize the write model|Dénormaliser le modèle d’écriture', 'GraphQL + DataLoader'],
  ['Choreographed saga|Saga par chorégraphie', 'Orchestrated saga|Saga orchestrée', 'Two-phase commit|Validation en deux phases', 'Outbox + eventual consistency|Outbox et cohérence à terme'],
  ['Idempotency key and deduplication|Clé d’idempotence et déduplication', 'Retries and dead-letter queue|Nouvelles tentatives et file de rejets', 'Verify, enqueue and acknowledge|Vérifier, mettre en file et confirmer', 'Sequence numbers and reorder buffer|Séquences et tampon de réordonnancement'],
  ['Composite B-tree|B-tree composite', 'Covering index|Index couvrant', 'Read replica|Réplique de lecture', 'Partial index|Index partiel'],
  ['Transaction pooling for all|Mode transaction pour tous', 'Pools by workload|Pools selon la charge', 'RDS Proxy + PgBouncer', 'Analytics read replica|Réplique de lecture pour l’analytique'],
  ['Blue-green deployment|Déploiement blue-green', 'Canary deployment|Déploiement canary', 'Rolling deployment|Déploiement progressif', 'Feature flag'],
  ['One Bloom filter per user|Un filtre de Bloom par utilisateur', 'Redis SET per user|SET Redis par utilisateur', 'Cassandra', 'Replica and connection pool|Réplique et pool de connexions'],
  ['Write sharding|Sharding des écritures', 'Jitter the writes|Décaler les écritures', 'Split the partition|Diviser la partition', 'Time buckets|Fenêtres temporelles'],
  ['Drop events|Abandonner des événements', 'Block the producer|Bloquer le producteur', 'Increase buffering|Augmenter le tampon', 'Rate-limit and shed load|Limiter le débit et délester'],
  ['Mutex lock|Verrou mutex', 'Probabilistic early expiry|Expiration anticipée probabiliste', 'Request coalescing|Regrouper les requêtes', 'Cache pre-warming|Préchauffer le cache'],
  ['Read-your-writes|Relire ses propres écritures', 'Synchronous replication|Réplication synchrone', 'Watch replica lag and retry|Surveiller le retard et réessayer', 'Critical reads on primary|Lectures critiques sur le primaire'],
  ['Short timeout and retries|Délai court et nouvelles tentatives', 'Circuit breaker|Coupe-circuit', 'Bulkhead|Cloisonnement', 'Circuit breaker and bulkhead|Coupe-circuit et cloisonnement'],
  ['WebSocket', 'Server-Sent Events (SSE)', 'gRPC streaming|Flux gRPC', 'Long polling'],
  ['Retry until acknowledged|Réessayer jusqu’à confirmation', 'Two-phase commit|Validation en deux phases', 'Transactional outbox|Outbox transactionnelle', 'SQS + idempotent consumer|SQS et consommateur idempotent'],
  ['Fanout on write|Diffusion à l’écriture', 'Fanout on read|Diffusion à la lecture', 'Hybrid fanout|Diffusion hybride', 'Materialized feed|Fil matérialisé'],
  ['Cursor pagination|Pagination par curseur', 'Keyset pagination|Pagination par clé', 'Deferred join|Jointure différée', 'Offset with covering index|Offset avec index couvrant'],
  ['Scale consumers|Ajouter des consommateurs', 'Visibility timeout and DLQ|Délai d’invisibilité et DLQ', 'Rate-limit the producer|Limiter le débit du producteur', 'SQS delay queue|File SQS à livraison différée'],
  ['Write-through', 'Write-behind', 'Write-around', 'Dual write with an outbox|Double écriture avec une outbox'],
  ['RAG', 'Fine-tune the model|Affiner le modèle', 'Fine-tuning and RAG|Affinage et RAG', 'Prompt engineering|Ingénierie des prompts'],
  ['pgvector', 'Pinecone', 'Weaviate', 'Qdrant'],
  ['Centralized orchestrator|Orchestrateur central', 'Event choreography|Chorégraphie événementielle', 'DAG-based execution|Exécution par DAG', 'Supervisor pattern|Superviseur'],
  ['Amazon S3', 'Amazon EBS', 'Amazon EFS', 'MinIO on EC2|MinIO sur EC2'],
  ['Active-active|Actif-actif', 'Active-passive with replicas|Actif-passif avec répliques', 'CDN and edge cache|CDN et cache à l’edge', 'Active-active with eventual consistency|Actif-actif à cohérence à terme'],
  ['AWS Secrets Manager', 'HashiCorp Vault', 'Environment variables via CI/CD|Variables d’environnement via CI/CD', 'KMS + own database|KMS et base interne'],
  ['Event sourcing', 'Change data capture (CDC)|Capture des changements (CDC)', 'Audit log|Journal d’audit', 'Dual write|Double écriture'],
  ['Improved zero-shot prompt|Prompt zero-shot amélioré', 'Few-shot examples|Exemples few-shot', 'Chain-of-thought|Chaîne de raisonnement', 'Self-consistency|Auto-cohérence'],
  ['Geohash', 'PostGIS', 'In-memory quadtree|Quadtree en mémoire', 'H3 hexagonal grid|Grille hexagonale H3'],
  ['HTTP/2 only|HTTP/2 uniquement', 'HTTP/3 only|HTTP/3 uniquement', 'HTTP/2 end to end|HTTP/2 de bout en bout', 'HTTP/3 to clients, HTTP/2 to origin|HTTP/3 côté client, HTTP/2 côté origine'],
  ['Last-write-wins|Dernière écriture gagnante', 'Vector clocks|Horloges vectorielles', 'CRDT', 'Operational transformation|Transformation opérationnelle'],
  ['Chunk and embed|Découper et vectoriser', 'Sliding window|Fenêtre glissante', 'Progressive summary|Résumé progressif', 'Truncate the document|Tronquer le document'],
  ['Pessimistic locking|Verrouillage pessimiste', 'Optimistic locking|Verrouillage optimiste', 'MVCC', 'Serializable isolation|Isolation sérialisable'],
  ['requestIdleCallback + time slicing|requestIdleCallback et découpage temporel', 'Web Worker', 'SharedArrayBuffer + Atomics', 'WebAssembly'],
  ['Kafka Streams', 'Apache Flink', 'Spark Structured Streaming', 'One-minute batches|Lots d’une minute'],
  ['Context window only|Fenêtre de contexte seule', 'Vector memory|Mémoire vectorielle', 'Episodic memory with summaries|Mémoire épisodique avec résumés', 'Redis session state|État de session dans Redis'],
  ['Anycast, SWR and purge on deploy|Anycast, SWR et purge au déploiement', 'Unicast and manual purge|Unicast et purge manuelle', 'Anycast and cache tags|Anycast et invalidation par tag', 'Anycast with a short TTL|Anycast avec un TTL court'],
  ['localStorage + JSON diff|localStorage et diff JSON', 'IndexedDB and vector clocks|IndexedDB et horloges vectorielles', 'Versioned IndexedDB migrations|Migrations versionnées d’IndexedDB', 'CRDT synchronization engine|Moteur de synchronisation CRDT'],
  ['Elasticsearch', 'PostgreSQL GIN indexes|Index GIN PostgreSQL', 'Redis query cache|Cache de requêtes Redis', 'Typesense or Meilisearch|Typesense ou Meilisearch'],
  ['More prompt engineering|Renforcer le prompt', 'Structured outputs|Sorties structurées', 'Validate after generation|Valider après la génération', 'LLM as judge|LLM comme juge'],
  ['Strangler Fig', 'Branch by Abstraction|Branchement par abstraction', 'Big-bang rewrite|Réécriture en bloc', 'Start with the database|Commencer par la base'],
  ['ReAct loop|Boucle ReAct', 'Parallel tool calls|Appels d’outils en parallèle', 'Force a function schema|Imposer un schéma de fonction', 'Planner and executor|Planificateur et exécuteur'],
  ['Partition by ingestion date|Partitionner par date d’ingestion', 'Partition by customer range|Partitionner par plage de clients', 'No partitioning|Aucun partitionnement', 'Partition by date, cluster by customer|Partitionner par date, regrouper par client'],
  ['Dynamic batching|Regroupement dynamique', 'INT8 quantization|Quantification INT8', 'Tensor parallelism|Parallélisme tensoriel', 'Queue and async workers|File et workers asynchrones'],
  ['Shared database|Base partagée', 'Schema per tenant|Schéma par client', 'Database per tenant|Base par client', 'Routing middleware|Middleware de routage'],
  ['Version in URL path|Version dans le chemin URL', 'Version in header|Version dans un en-tête', 'Version in query parameter|Version en paramètre de requête', 'Content negotiation|Négociation de contenu'],
  ['One-step ALTER TABLE|ALTER TABLE en une étape', 'Expand and contract|Étendre puis retirer', 'New table and dual write|Nouvelle table et double écriture', 'Compatibility view|Vue de compatibilité'],
  ['Scheduled full rebuild|Reconstruction complète planifiée', 'Incremental upsert and soft delete|Upsert incrémental et suppression logique', 'Version registry and hot swap|Registre de versions et bascule à chaud', 'Sample for stale embeddings|Échantillonner les embeddings obsolètes'],
  ['Centralized orchestrator|Orchestrateur central', 'Peer-to-peer handoff|Passage de relais entre pairs', 'Message queue and blackboard|File de messages et tableau partagé', 'Hierarchical nesting|Orchestration hiérarchique'],
  ['Polling endpoint|Interrogation périodique', 'Webhook', 'SSE or WebSocket|SSE ou WebSocket', 'Synchronous wait|Attente synchrone'],
  ['Synchronous replication|Réplication synchrone', 'Semi-sync replication|Réplication semi-synchrone', 'Confirmation reads on primary|Confirmations lues sur le primaire', 'Wait 500 ms after every write|Attendre 500 ms après chaque écriture'],
  ['Distributed tracing by span|Traçage distribué par span', 'LLM-as-judge evaluations|Évaluations par un LLM juge', 'Cost dashboard and alerts|Tableau de coûts et alertes', 'Log every prompt in middleware|Tracer chaque prompt dans le middleware'],
  ['Client-generated keys|Clés générées par le client', 'Server-generated keys|Clés générées par le serveur', 'Deterministic business key|Clé métier déterministe', 'Outbox and idempotent consumer|Outbox et consommateur idempotent'],
  ['Distributed microservices|Microservices distribués', 'Modular monolith|Monolithe modulaire', 'Serverless', 'Event-driven architecture|Architecture événementielle'],
];

export const diagrams = {
  '004-02': {
    flow: ['phone:Mobile app|Application mobile', ['service:UserService', 'service:OrderService', 'service:PaymentService', 'warn:NotificationService · next sprint|NotificationService · prochain sprint'], ['database:Users DB|Base utilisateurs', 'database:Orders DB|Base commandes', 'database:Payments DB|Base paiements', 'database:Notifications DB|Base notifications']],
    context: 'The app connects directly to each backend.|L’application se connecte directement à chaque backend.',
  },
  '006-03': {
    flow: ['phone:Mobile app|Application mobile', 'gateway:API gateway|Passerelle API', ['service:UserService', 'service:OrderService', 'service:PaymentService', 'service:NotificationService']],
    notes: ['One public domain; each path maps to its service.|Un seul domaine public, avec une route par service.', 'Centralize authentication, rate limiting and TLS termination.|Centraliser l’authentification, la limitation de débit et la terminaison TLS.'],
  },
  '008-02': {
    flow: ['client:Orders page|Page des commandes', 'gateway:API gateway|Passerelle API', 'service:Orders service|Service de commandes', ['database:Orders · 1 query|Commandes · 1 requête', 'database:Customers · 50 queries|Clients · 50 requêtes']],
    context: '50 orders, 51 queries per request, 2.4 s at p95.|50 commandes, 51 requêtes par appel, 2,4 s au p95.',
  },
  '010-03': {
    flow: ['client:Orders page|Page des commandes', 'gateway:API gateway|Passerelle API', 'service:Orders service|Service de commandes', 'database:Orders + customers|Commandes et clients'],
    notes: ['Load the customer relation in the order query.|Charger la relation client dans la requête des commandes.', 'One LEFT JOIN returns the full page in a single round trip.|Un LEFT JOIN renvoie la page complète en un aller-retour.'],
  },
  '012-02': {
    flow: ['client:API clients|Clients API', 'gateway:API gateway|Passerelle API', ['queue:Rate limiter|Limiteur de débit', 'database:Redis counter|Compteur Redis'], 'service:Message service|Service de messages', 'database:Database|Base de données'],
    context: '100 requests/minute per key. Two bursts cross the minute boundary.|100 requêtes par minute et par clé. Deux rafales franchissent la limite de minute.',
  },
  '014-03': {
    flow: ['client:Incoming request|Requête entrante', 'bucket:Bucket · 100 tokens|Seau · 100 jetons', ['service:Token available · allow|Jeton disponible · accepter', 'warn:Bucket empty · HTTP 429|Seau vide · HTTP 429']],
    notes: ['Refill at about 1.66 tokens/s without a minute reset.|Recréditer environ 1,66 jeton/s, sans remise à zéro à la minute.', 'A burst consumes the available tokens and shares their refill rate with the next burst.|Une rafale consomme les jetons disponibles. La suivante dépend du rythme de recharge.'],
  },
  '016-02': {
    flow: ['phone:Client retries POST /payments|Le client renvoie POST /payments', 'gateway:API gateway|Passerelle API', 'service:Payments service|Service de paiement', ['cloud:Stripe', 'database:Payments DB|Base des paiements']],
    context: 'Identical requests can trigger repeated charges.|Des requêtes identiques peuvent déclencher plusieurs prélèvements.',
  },
  '018-03': {
    flow: ['phone:Client + Idempotency-Key|Client et Idempotency-Key', 'gateway:API gateway|Passerelle API', 'service:Payments service|Service de paiement', ['cloud:Stripe', 'database:Durable key and response|Clé et réponse durables']],
    notes: ['Generate the UUID once and reuse it on every retry.|Générer l’UUID une seule fois et le réutiliser à chaque tentative.', 'Return the saved response for a known key and avoid charging again.|Pour une clé connue, renvoyer la réponse enregistrée sans refaire le prélèvement.'],
  },
  '021-02': {
    flow: ['client:Web and mobile|Web et mobile', 'service:Orders API|API de commandes', 'database:PostgreSQL · 500M rows|PostgreSQL · 500 M de lignes', 'gateway:Shard routing|Routage vers les shards', ['database:Shard 1', 'database:Shard 2', 'database:Shard 3']],
    context: 'Most reads ask for one customer’s last 30 days of orders.|La plupart des lectures concernent les commandes d’un client sur les 30 derniers jours.',
  },
  '024-02': {
    flow: ['event:Scheduled cron|Déclenchement cron', 'gateway:Application load balancer|Répartiteur de charge applicatif', ['service:Instance A', 'service:Instance B', 'service:Instance C'], 'database:Redis lock|Verrou Redis', 'database:Report output|Sortie du rapport'],
    context: 'All three instances compete for the same job every 5 minutes.|Les trois instances tentent de prendre la même tâche toutes les cinq minutes.',
  },
  '026-03': {
    flow: [['service:Paused instance · token 42|Instance suspendue · jeton 42', 'service:Current instance · token 43|Instance active · jeton 43'], 'database:Redis SETNX + short TTL|Redis SETNX et TTL court', 'gateway:Validate fencing token|Vérifier le jeton de fencing', 'database:Downstream resource|Ressource en aval'],
    notes: ['Every successful lock acquisition receives an increasing token.|Chaque acquisition réussie reçoit un jeton de valeur croissante.', 'After token 43, the destination rejects writes carrying token 42.|Après le jeton 43, la destination refuse les écritures portant le jeton 42.'],
  },
  '028-02': {
    flow: ['client:Client', 'service:Order service|Service de commandes', 'queue:Standard SQS|SQS standard', ['service:Consumer 1|Consommateur 1', 'service:Consumer 2|Consommateur 2', 'service:Consumer 3–5|Consommateurs 3 à 5'], 'database:PostgreSQL'],
    context: 'created, paid and cancelled can reach different consumers out of order.|created, paid et cancelled peuvent être traités par différents consommateurs dans le désordre.',
  },
  '030-03': {
    flow: ['service:Order service|Service de commandes', ['queue:Order 123 · created, paid, cancelled|Commande 123 · created, paid, cancelled', 'queue:Order 456 · created, paid|Commande 456 · created, paid'], ['service:Worker 1', 'service:Worker 2'], 'database:PostgreSQL'],
    notes: ['MessageGroupId = order_id. SQS FIFO preserves order within a group.|MessageGroupId = order_id. SQS FIFO préserve l’ordre dans un groupe.', 'Different groups can still be processed in parallel.|Des groupes distincts peuvent toujours être traités en parallèle.'],
  },
  '032-02': {
    flow: ['client:Shop clients|Clients de la boutique', 'service:Application', 'database:Redis cache|Cache Redis', 'database:PostgreSQL'],
    context: 'Three write paths can make the cached price or stock stale.|Trois chemins d’écriture peuvent rendre obsolètes les prix ou les stocks en cache.',
  },
  '034-03': {
    lanes: [
      ['Write|Écriture', ['service:Writer|Service d’écriture', 'database:Update PostgreSQL|Mettre à jour PostgreSQL', 'bucket:Delete Redis key|Supprimer la clé Redis']],
      ['Read after invalidation|Lecture après invalidation', ['service:Reader|Service de lecture', 'database:Fetch PostgreSQL row|Lire la ligne PostgreSQL', 'bucket:Repopulate Redis|Remplir Redis']],
    ],
    notes: ['PostgreSQL is the source of truth. Redis accelerates later reads.|PostgreSQL fait foi. Redis accélère les lectures suivantes.'],
  },
  '036-02': {
    flow: [['service:Order writes|Écritures de commandes', 'client:Dashboard and reports|Tableau de bord et rapports'], 'database:PostgreSQL monolith|Monolithe PostgreSQL', 'bucket:Cache aside|Cache-aside', 'service:External analytics|Analyse externe', 'database:Object storage|Stockage objet'],
    context: '8,000 writes and 40,000 reads per minute share one model.|8 000 écritures et 40 000 lectures par minute partagent le même modèle.',
  },
  '038-03': {
    flow: ['client:Client', 'gateway:API', ['database:Normalized write model|Modèle d’écriture normalisé', 'service:Query API|API de lecture'], ['queue:Outbox or CDC|Outbox ou CDC', 'database:Denormalized read store|Stockage de lecture dénormalisé']],
    links: [[0,0,1,0],[1,0,2,0],[1,0,2,1],[2,0,3,0],[3,0,3,1],[2,1,3,1]],
    notes: ['The projection gives dashboards a read model without repeated joins.|La projection fournit aux tableaux de bord un modèle de lecture sans jointures répétées.', 'Use the write model for confirmations that need strong consistency.|Lire le modèle d’écriture pour les confirmations qui exigent une cohérence forte.'],
  },
  '040-02': {
    flow: ['client:Checkout|Paiement', 'service:Create order|Créer la commande', 'service:Charge payment|Effectuer le prélèvement', 'warn:Stock reservation fails|La réservation du stock échoue', 'service:Shipping not called|Expédition non appelée'],
    context: 'The customer has paid, but the order is stuck in PENDING.|Le client a payé, mais la commande reste bloquée en PENDING.',
  },
  '042-03': {
    lanes: [
      ['Checkout sequence|Séquence de paiement', ['gateway:CheckoutSaga', 'service:Create order|Créer la commande', 'service:Charge payment|Effectuer le prélèvement', 'warn:Inventory fails|Échec de l’inventaire']],
      ['Compensation after failure|Compensation après échec', ['event:Failure detected|Échec détecté', 'service:Refund payment|Rembourser le paiement', 'service:Cancel order|Annuler la commande']],
    ],
    notes: ['The orchestrator persists each step and triggers its registered compensation.|L’orchestrateur enregistre chaque étape et déclenche la compensation prévue.'],
  },
  '044-02': {
    flow: ['cloud:Stripe', 'gateway:ALB', ['service:ECS task 1|Tâche ECS 1', 'warn:ECS task restarting|Tâche ECS en redémarrage'], 'database:Orders DB|Base des commandes', 'event:Confirmation email|E-mail de confirmation'],
    context: 'The sender retries after a timeout. A second task may handle the same event.|L’émetteur réessaie après expiration du délai. Une seconde tâche peut traiter le même événement.',
  },
  '046-03': {
    flow: ['cloud:Stripe', 'gateway:Verify HMAC|Vérifier le HMAC', 'queue:Durable internal queue|File interne durable', 'service:Idempotent worker|Worker idempotent', ['database:Orders DB|Base des commandes', 'event:Notifications']],
    notes: ['Acknowledge with HTTP 200 as soon as the event is safely queued.|Renvoyer HTTP 200 dès que l’événement est enregistré dans la file.', 'Deduplicate by event ID and check the current order state before updating it.|Dédupliquer par identifiant et vérifier l’état de la commande avant sa mise à jour.'],
  },
  '048-02': {
    flow: ['event:Producers|Producteurs', 'queue:Kafka', 'service:Ingestion worker|Worker d’ingestion', 'database:PostgreSQL · events', 'client:Dashboard queries|Requêtes du tableau de bord'],
    context: '8,000 writes/s; p99 is up from 12 ms to 140 ms.|8 000 écritures/s. Le p99 est passé de 12 à 140 ms.',
  },
  '050-03': {
    flow: ['queue:Event stream|Flux d’événements', 'service:Ingestion', 'database:PostgreSQL · events', 'gateway:Partial index · signup|Index partiel · signup', 'client:Dashboard|Tableau de bord'],
    notes: ['Index the small subset the dashboard actually reads.|Indexer le petit sous-ensemble que le tableau de bord lit réellement.', 'Writes outside the predicate skip this index.|Les écritures qui ne satisfont pas le prédicat n’alimentent pas cet index.'],
  },
  '052-02': {
    flow: [['service:REST API · 800 RPS|API REST · 800 RPS', 'service:Analytics workers|Workers analytiques', 'cloud:Lambda bursts|Rafales Lambda'], 'gateway:Shared connection pool|Pool de connexions partagé', 'database:PostgreSQL RDS · 300 connections|PostgreSQL RDS · 300 connexions'],
    context: 'Three workloads need very different connection lifetimes.|Les trois charges gardent leurs connexions pendant des durées très différentes.',
  },
  '054-03': {
    flow: [['service:REST API and Lambda|API REST et Lambda', 'service:Analytics workers|Workers analytiques'], ['gateway:Transaction pool|Pool en mode transaction', 'gateway:Session pool|Pool en mode session'], 'database:PostgreSQL RDS · 300 connections|PostgreSQL RDS · 300 connexions'],
    notes: ['Short transactions share connections between transactions.|Les transactions courtes libèrent la connexion entre deux transactions.', 'Analytics workers keep the same connection for their session.|Les workers analytiques conservent la même connexion pendant leur session.'],
  },
  '057-02': {
    flow: ['client:Checkout client|Client du parcours de paiement', 'gateway:Load balancer|Répartiteur de charge', 'service:ECS checkout', ['database:Orders DB|Base des commandes', 'cloud:Stripe']],
    context: 'A Friday rollout changes the code that charges real cards.|Le déploiement du vendredi modifie le code qui débite les cartes.',
  },
  '059-03': {
    flow: ['client:Checkout clients|Clients du parcours de paiement', 'gateway:Feature flag', ['service:Old payment path|Ancien chemin de paiement', 'service:New PaymentIntents path|Nouveau parcours PaymentIntents'], 'cloud:Stripe'],
    notes: ['Deploy the code with the flag off, then activate it for selected cohorts.|Déployer avec le flag désactivé, puis l’activer pour des groupes choisis.', 'Rollback switches future requests to the old code. It cannot undo a charge.|Le retour arrière réoriente les prochaines requêtes. Il n’annule pas un prélèvement.'],
  },
  '061-02': {
    flow: ['phone:Mobile feed|Fil mobile', 'service:Recommendation service|Service de recommandation', 'database:PostgreSQL · user_seen_posts', 'database:Read replica|Réplique de lecture'],
    context: '50 million users. One lookup per recommendation. p99 above 600 ms.|50 millions d’utilisateurs, une lecture par recommandation et un p99 supérieur à 600 ms.',
  },
  '065-02': {
    flow: ['event:Producers|Producteurs', 'service:Ingestion service|Service d’ingestion', 'warn:One hot tenant_id|Une clé tenant_id saturée', 'database:DynamoDB', 'client:Metrics and alerts|Métriques et alertes'],
    context: 'One tenant sends about 9,000 writes/s to a single partition key.|Un client envoie environ 9 000 écritures/s sur une seule clé de partition.',
  },
  '067-03': {
    flow: ['event:Incoming writes|Écritures entrantes', 'gateway:Append a shard suffix|Ajouter un suffixe de shard', ['database:tenant_id#0', 'database:tenant_id#1', 'database:tenant_id#…', 'database:tenant_id#9'], 'service:Merge matching reads|Fusionner les lectures'],
    notes: ['Suffixes distribute a hot tenant’s writes across multiple partition keys.|Les suffixes répartissent les écritures du client sur plusieurs clés de partition.', 'Reads for the entire tenant query and combine the relevant shards.|Une lecture sur tout le client interroge puis rassemble les shards concernés.'],
  },
  '069-02': {
    flow: ['event:Producer|Producteur', 'queue:Kafka topic|Topic Kafka', 'warn:Overloaded consumer|Consommateur saturé', ['database:PostgreSQL', 'cloud:External HTTP API|API HTTP externe']],
    context: 'The consumer falls behind and the producer keeps sending events.|Le consommateur accumule du retard et le producteur continue d’envoyer des événements.',
  },
  '071-03': {
    flow: ['event:Producer|Producteur', 'gateway:Admission limit|Limite d’admission', 'queue:Kafka', ['service:Consumer at safe rate|Consommation à débit soutenable', 'queue:Deferred work|Travail différé'], ['database:PostgreSQL', 'cloud:External API|API externe']],
    links: [[0,0,1,0],[1,0,2,0],[2,0,3,0],[2,0,3,1],[3,0,4,0],[3,0,4,1]],
    notes: ['Cap the work sent to the saturated consumer.|Limiter le travail envoyé au consommateur saturé.', 'Defer or shed suitable traffic while retaining required events.|Reporter ou délester le trafic qui s’y prête tout en conservant les événements requis.'],
  },
  '073-02': {
    flow: ['client:8,000 requests/s|8 000 requêtes/s', 'service:API', 'warn:Hot cache key expires|La clé populaire expire', 'database:PostgreSQL'],
    context: 'A synchronized cache miss sends the same recomputation to the database.|Un défaut de cache simultané déclenche le même recalcul en base.',
  },
  '075-03': {
    flow: [['event:Scheduled refresh|Actualisation planifiée', 'client:User traffic|Trafic utilisateur'], ['service:Refresh worker|Worker d’actualisation', 'service:API'], 'bucket:Redis cache|Cache Redis', 'database:PostgreSQL'],
    notes: ['Rebuild the value before its TTL expires.|Reconstruire la valeur avant l’expiration du TTL.', 'Requests keep using the cache while the refresh runs in the background.|Les requêtes continuent d’utiliser le cache pendant l’actualisation en arrière-plan.'],
  },
  '077-02': {
    flow: ['client:Checkout client|Client du parcours de paiement', 'service:Order service|Service de commandes', ['database:Primary database|Base primaire', 'database:Read replica|Réplique de lecture'], 'warn:Stale confirmation|Confirmation obsolète'],
    links: [[0,0,1,0],[1,0,2,0],[1,0,2,1],[2,0,2,1],[2,1,3,0]],
    context: 'A read can arrive at the replica before the latest write.|Une lecture peut atteindre la réplique avant la dernière écriture.',
  },
  '079-03': {
    flow: ['client:Client writes and reads|Lectures et écritures du client', 'gateway:Session routing|Routage par session', ['database:Primary · writes and recent reads|Primaire · écritures et lectures récentes', 'database:Replica · other reads|Réplique · autres lectures']],
    notes: ['After a write, route that user’s reads to the primary for a short window.|Après une écriture, orienter les lectures de cet utilisateur vers le primaire pendant une courte fenêtre.', 'Other traffic still reads from the replica.|Le reste du trafic continue de lire depuis la réplique.'],
  },
  '081-02': {
    flow: ['client:Checkout', 'service:Checkout service|Service de paiement', ['warn:Fraud API · 30 s timeout|API antifraude · délai de 30 s', 'service:Cart and health routes|Routes de panier et de santé']],
    context: 'Calls to the failing dependency exhaust a resource pool shared with checkout.|Les appels à la dépendance défaillante épuisent un pool de ressources partagé.',
  },
  '083-03': {
    flow: ['client:Requests|Requêtes', 'service:Checkout service|Service de paiement', ['gateway:Circuit breaker|Coupe-circuit', 'service:Unaffected routes|Routes préservées'], ['queue:Isolated fraud pool|Pool antifraude isolé', 'service:Cart and health|Panier et santé'], 'cloud:Fraud API|API antifraude'],
    links: [[0,0,1,0],[1,0,2,0],[1,0,2,1],[2,0,3,0],[2,1,3,1],[3,0,4,0]],
    notes: ['Open the circuit after repeated failures and probe for recovery.|Ouvrir le circuit après des échecs répétés et sonder le rétablissement.', 'A separate pool limits the impact of calls already in flight.|Un pool dédié limite l’impact des appels déjà en cours.'],
  },
  '086-02': {
    flow: ['client:Browser clients|Navigateurs', 'gateway:ALB', 'service:FastAPI', 'agent:LLM provider|Fournisseur de LLM'],
    context: '50,000 concurrent users. The server streams generated tokens to browsers.|50 000 utilisateurs simultanés. Le serveur diffuse les tokens générés aux navigateurs.',
  },
  '088-03': {
    flow: ['agent:LLM provider|Fournisseur de LLM', 'service:FastAPI', 'gateway:HTTP event stream|Flux d’événements HTTP', 'client:Browser EventSource|EventSource du navigateur'],
    notes: ['Tokens travel one way over text/event-stream.|Les tokens circulent dans un seul sens via text/event-stream.', 'EventSource provides native reconnect behavior.|EventSource gère la reconnexion côté navigateur.'],
  },
  '090-02': {
    flow: ['client:Checkout client|Client du parcours de paiement', 'service:PaymentService', ['database:Payment DB|Base des paiements', 'warn:NotificationService times out|NotificationService dépasse le délai'], 'event:Email provider|Fournisseur d’e-mails'],
    links: [[0,0,1,0],[1,0,2,0],[1,0,2,1],[2,1,3,0]],
    context: 'The charge has succeeded. An HTTP timeout leaves notification delivery uncertain.|Le paiement a réussi. Le délai HTTP laisse l’envoi de la notification incertain.',
  },
  '092-03': {
    flow: ['service:PaymentService', 'queue:Amazon SQS', 'service:NotificationService', ['database:Processed event IDs|Identifiants des événements traités', 'event:Email provider|Fournisseur d’e-mails']],
    notes: ['At-least-once delivery may send the same message twice.|Une remise au moins une fois peut livrer le même message deux fois.', 'Check the stable idempotency key before sending the notification.|Vérifier la clé d’idempotence stable avant l’envoi de la notification.'],
  },
  '094-02': {
    flow: ['phone:Mobile client|Client mobile', 'service:Feed service|Service de fil d’actualité', ['service:Post service|Service de publications', 'database:Read replicas|Répliques de lecture'], 'bucket:Followers’ Redis feeds|Fils Redis des abonnés'],
    context: 'One account has two million followers. Feed latency rises from 20 ms to 4 s.|Un compte a deux millions d’abonnés. La latence du fil passe de 20 ms à 4 s.',
  },
  '096-03': {
    lanes: [
      ['Typical accounts · write fanout|Comptes ordinaires · diffusion à l’écriture', ['service:New post|Nouvelle publication', 'queue:Fanout worker|Worker de diffusion', 'bucket:Followers’ cached feeds|Fils des abonnés en cache']],
      ['High-follower accounts · read fanout|Comptes très suivis · diffusion à la lecture', ['phone:Feed request|Requête de fil', 'service:Merge recent posts|Fusionner les publications récentes', 'client:Combined feed|Fil combiné']],
    ],
    notes: ['Avoid millions of cache writes per celebrity post while keeping ordinary feed reads fast.|Éviter des millions d’écritures par publication très suivie tout en gardant des lectures rapides.'],
  },
  '098-02': {
    flow: ['client:Dashboard', 'gateway:REST API', 'service:Orders service|Service de commandes', 'database:PostgreSQL · orders', 'warn:Offset scan|Parcours avec OFFSET'],
    context: 'Queries filter by status and sort by created_at DESC.|Les requêtes filtrent sur status et trient par created_at DESC.',
  },
  '100-03': {
    flow: ['client:Next page + cursor|Page suivante et curseur', 'service:Decode cursor|Décoder le curseur', 'database:Indexed range after anchor|Plage indexée après le point de reprise', 'client:Rows + next cursor|Lignes et curseur suivant'],
    notes: ['The opaque cursor carries the last sort key and the filter context.|Le curseur opaque contient la dernière clé de tri et le contexte des filtres.', 'Previous and next pages stay efficient. Arbitrary page jumps are a trade-off.|Les pages précédente et suivante restent efficaces. Le saut direct de page est sacrifié.'],
  },
  '103-02': {
    flow: ['event:Producers · 4,000/min|Producteurs · 4 000/min', 'queue:Growing SQS queue|File SQS en croissance', 'warn:Consumers · 200/min|Consommateurs · 200/min', 'database:DB · 95% CPU|Base · 95 % de CPU'],
    context: 'Black Friday traffic arrives much faster than the database can absorb it.|Le trafic du Black Friday arrive bien plus vite que la base ne peut l’absorber.',
  },
  '104-03': {
    lanes: [
      ['User-facing checkout|Paiement côté utilisateur', ['client:Submit order|Passer commande', 'service:Order service|Service de commandes', 'database:Commit and acknowledge|Valider et confirmer']],
      ['Throttled background path|Traitement de fond limité en débit', ['event:Read committed events|Lire les événements validés', 'gateway:Rate limiter|Limiteur de débit', 'queue:Amazon SQS', 'service:Consumers|Consommateurs', 'database:Downstream DB|Base en aval']],
    ],
    notes: ['Throttle the emitter after the user’s write has been confirmed.|Limiter l’émetteur après confirmation de l’écriture utilisateur.'],
  },
  '106-02': {
    flow: ['client:Client', 'service:NestJS API|API NestJS', ['bucket:Redis cache|Cache Redis', 'database:PostgreSQL']],
    context: 'A failure between the database write and cache update leaves stale data.|Une panne entre l’écriture en base et la mise à jour du cache laisse des données obsolètes.',
  },
  '108-03': {
    flow: ['service:Write request|Requête d’écriture', 'database:Update and outbox in one transaction|Mise à jour et outbox dans une transaction', 'queue:Durable outbox event|Événement durable dans l’outbox', 'service:Relay with retries|Relais avec nouvelles tentatives', 'bucket:Invalidate cache key|Invalider la clé en cache'],
    notes: ['Commit the database change and the outbox event together.|Valider ensemble le changement en base et son événement outbox.', 'The consumer can resume after failure without losing an invalidation.|Le consommateur peut reprendre après une panne sans perdre d’invalidation.'],
  },
  '110-02': {
    flow: ['client:User question|Question utilisateur', 'gateway:API', 'agent:LLM', 'warn:Answer from outdated knowledge|Réponse fondée sur des connaissances obsolètes'],
    context: 'The product changes faster than the model’s knowledge.|Le produit évolue plus vite que les connaissances du modèle.',
  },
  '112-03': {
    lanes: [
      ['Index the current knowledge|Indexer les connaissances à jour', ['document:Product docs|Documentation produit', 'service:Chunk and embed|Découper et vectoriser', 'database:Vector store|Base vectorielle']],
      ['Answer a question|Répondre à une question', ['client:Question', 'gateway:Retrieve relevant chunks|Récupérer les fragments pertinents', 'agent:LLM with retrieved context|LLM avec contexte récupéré', 'document:Grounded answer|Réponse fondée sur les sources']],
    ],
    notes: ['Update the knowledge base independently of the model.|Mettre à jour la base de connaissances indépendamment du modèle.'],
  },
  '114-02': {
    flow: ['client:Search query|Requête de recherche', 'service:Node.js backend|Backend Node.js', 'agent:Query embedding|Embedding de la requête', 'database:Vector search|Recherche vectorielle', 'database:Metadata and documents|Métadonnées et documents'],
    context: 'A B2B search must return similar results within the right tenant or workspace.|La recherche B2B doit renvoyer les résultats similaires du bon client ou espace de travail.',
  },
  '116-03': {
    flow: ['client:Search request|Requête de recherche', 'service:Backend and query embedding|Backend et embedding de requête', 'database:Qdrant · similarity + payload filter|Qdrant · similarité et filtre de métadonnées', 'client:Scoped results|Résultats dans le bon périmètre'],
    notes: ['Apply the workspace or tenant filter within vector search.|Appliquer le filtre d’espace de travail ou de client pendant la recherche vectorielle.', 'Payload indexes help keep filtering fast under load.|Les index de métadonnées accélèrent le filtrage sous charge.'],
  },
  '118-02': {
    flow: ['client:User request|Demande utilisateur', 'agent:Planner|Planificateur', 'agent:Researcher|Chercheur', 'agent:Coder|Développeur', 'agent:Reviewer|Relecteur', 'document:Result|Résultat'],
    context: 'Incomplete context, missing retry loops and one stalled agent can break the pipeline.|Un contexte incomplet, l’absence de reprise ou un agent bloqué peuvent casser le pipeline.',
  },
  '120-03': {
    flow: [['agent:Planner|Planificateur', 'agent:Researcher|Chercheur'], 'agent:Coder waits for both|Le développeur attend les deux résultats', 'agent:Reviewer|Relecteur', ['document:Approved result|Résultat approuvé', 'warn:Retry on review failure|Réessayer si la revue échoue']],
    returnLinks: [[3,1,1,0]],
    notes: ['Run planning and research in parallel. Start coding when both finish.|Paralléliser la planification et la recherche. Lancer le développement après les deux.', 'A reviewer failure can trigger a bounded retry of the coding step.|Un échec de la revue peut déclencher une nouvelle tentative bornée du développement.'],
  },
  '122-02': {
    flow: ['phone:Web and mobile clients|Clients Web et mobiles', 'service:Upload service|Service d’envoi', 'database:File storage|Stockage des fichiers', ['agent:ML processing|Traitement ML', 'event:Audit service|Service d’audit']],
    context: 'Large uploads need shared durable storage and asynchronous processing.|Les fichiers volumineux exigent un stockage partagé et durable et un traitement asynchrone.',
  },
  '124-03': {
    flow: ['client:Upload client|Client envoyant le fichier', 'service:Upload service|Service d’envoi', 'bucket:Amazon S3', ['agent:ML pipeline via S3 events|Pipeline ML via événements S3', 'event:Audit reads by object key|Audit par clé d’objet', 'database:Glacier lifecycle tier|Classe d’archivage Glacier']],
    notes: ['Persist the object key in the database and let every service read the same object.|Conserver la clé d’objet en base pour que chaque service lise le même objet.', 'Use lifecycle rules to move cold data to cheaper storage.|Transférer les données froides vers un stockage moins coûteux avec les règles de cycle de vie.'],
  },
  '126-02': {
    flow: [['client:EU users|Utilisateurs en Europe', 'client:US users|Utilisateurs aux États-Unis'], 'cloud:Internet', 'gateway:API gateway|Passerelle API', 'service:US services|Services aux États-Unis', 'database:US primary DB|Base primaire aux États-Unis'],
    context: 'A European user waits about 380 ms for the US-East origin.|Un utilisateur européen attend environ 380 ms pour atteindre l’origine US-East.',
  },
  '128-03': {
    flow: [['client:US clients|Clients américains', 'client:EU clients|Clients européens'], ['service:US stack|Services américains', 'service:EU read path|Lecture européenne'], ['database:US primary|Primaire américain', 'database:EU read replica|Réplique européenne']],
    links: [[0,0,1,0],[0,1,1,1],[1,0,2,0],[1,1,2,1],[2,0,2,1]],
    notes: ['Keep writes on the primary. Serve most European reads locally.|Garder les écritures sur le primaire et servir la plupart des lectures européennes localement.', 'Replicate across regions and promote the replica for regional failover.|Répliquer entre régions et promouvoir la réplique en cas de panne régionale.'],
  },
  '130-02': {
    flow: ['client:Application services|Services applicatifs', ['warn:Environment variables|Variables d’environnement', 'warn:Build or deploy config|Configuration de build ou de déploiement'], ['database:Database password|Mot de passe de base', 'cloud:Payment API keys|Clés de l’API de paiement', 'service:Service tokens|Tokens de service']],
    links: [[0,0,1,0],[0,0,1,1],[1,0,2,0],[1,0,2,1],[1,1,2,2]],
    context: 'Database credentials, API keys and service tokens need storage and rotation.|Les identifiants de base, clés API et tokens de service doivent être stockés et renouvelés.',
  },
  '132-03': {
    flow: [['service:Lambda', 'service:ECS services|Services ECS', 'service:Other workloads|Autres charges'], 'gateway:IAM authorization|Autorisation IAM', 'database:AWS Secrets Manager', ['database:KMS encryption|Chiffrement KMS', 'event:Credential rotation|Rotation des identifiants']],
    notes: ['Fetch secrets at runtime with permissions scoped per service.|Récupérer les secrets à l’exécution avec des permissions propres à chaque service.', 'Managed rotation and auditing replace manual secret copies.|La rotation et l’audit managés remplacent les copies manuelles.'],
  },
  '134-02': {
    flow: ['client:Client', 'service:OrderService', 'database:PostgreSQL · current state|PostgreSQL · état courant', 'warn:Overwritten history|Historique écrasé'],
    context: 'Two orders have the same identifier and different totals. The current rows do not explain why.|Deux commandes ont le même identifiant et des totaux différents. Les lignes actuelles n’expliquent pas pourquoi.',
  },
  '136-03': {
    flow: ['client:Command|Commande', 'service:OrderService', 'queue:Append-only event store|Journal d’événements en ajout seul', ['service:Replay or snapshot|Rejeu ou instantané', 'database:Read projection|Projection de lecture']],
    notes: ['Record the order’s changes as events. Rebuild current or historical state by replaying them.|Enregistrer les changements sous forme d’événements. Les rejouer pour reconstruire un état courant ou passé.', 'Use snapshots to avoid replaying the entire history on every load.|Utiliser des instantanés pour éviter de rejouer tout l’historique à chaque chargement.'],
  },
  '138-02': {
    flow: ['document:Support ticket|Ticket de support', 'queue:Ticket queue|File de tickets', 'agent:LLM classifier|Classification par LLM', 'warn:Inconsistent label|Catégorie incohérente', 'client:Internal team|Équipe interne'],
    context: 'A classification demo succeeds but real support tickets are more ambiguous.|La démo de classification fonctionne, mais les tickets réels sont plus ambigus.',
  },
  '142-02': {
    flow: ['phone:Driver app|Application chauffeur', 'service:Location ingestion|Ingestion de positions', 'database:Driver locations|Positions des chauffeurs', 'gateway:Nearby drivers query|Recherche de chauffeurs proches', 'phone:Rider app|Application passager'],
    context: '500,000 drivers send their GPS position every 5 seconds.|500 000 chauffeurs envoient leur position GPS toutes les cinq secondes.',
  },
  '144-07': {
    flow: ['event:Driver location update|Mise à jour GPS du chauffeur', 'hexgrid:H3 cell and neighbors|Cellule H3 et voisines', 'bucket:Redis set per cell|Ensemble Redis par cellule', 'service:Filter by distance|Filtrer par distance', 'phone:Nearby drivers|Chauffeurs à proximité'],
    notes: ['Read the target cell and its neighbors for a proximity search.|Lire la cellule cible et ses voisines pour une recherche de proximité.', 'Use geographic distance for the final result after candidate retrieval.|Filtrer ensuite les candidats selon la distance géographique.'],
  },
  '145-01': {
    answer: 'A',
    flow: ['event:GPS location|Position GPS', 'squaregrid:Geohash prefix|Préfixe geohash', ['database:Cell on one side|Cellule d’un côté', 'database:Adjacent cell|Cellule voisine'], 'warn:Boundary can hide a match|La frontière peut masquer un résultat'],
    notes: ['Nearby points can have very different prefixes across a cell boundary.|Deux points proches peuvent avoir des préfixes très différents de part et d’autre d’une frontière.', 'A coarse partition key needs a neighboring-cell strategy for proximity queries.|Une clé de partition grossière exige de rechercher aussi les cellules voisines.'],
  },
  '146-01': {
    answer: 'B',
    flow: ['event:Frequent GPS updates|Mises à jour GPS fréquentes', 'database:PostgreSQL + PostGIS', 'squaregrid:GiST spatial index|Index spatial GiST', 'client:Radius query|Recherche par rayon'],
    notes: ['PostGIS gives accurate spatial queries.|PostGIS exécute des requêtes spatiales précises.', 'About 100,000 updates/s make index maintenance the bottleneck in this scenario.|Environ 100 000 mises à jour/s font de la maintenance de l’index le goulet d’étranglement.'],
  },
  '147-01': {
    answer: 'C',
    flow: ['event:Driver moves|Le chauffeur se déplace', 'quadtree:In-memory quadtree|Quadtree en mémoire', 'service:Remove and reinsert on crossing|Supprimer et réinsérer au franchissement', 'client:Search neighboring cells|Chercher dans les cellules voisines'],
    notes: ['Dense regions create deep, uneven branches.|Les zones denses créent des branches profondes et inégales.', 'Frequent cell crossings add update and rebalancing work.|Les franchissements fréquents ajoutent du travail de mise à jour et de rééquilibrage.'],
  },
  '148-02': {
    flow: ['phone:Mobile clients|Clients mobiles', 'cloud:CDN edge|Edge du CDN', 'gateway:Load balancer|Répartiteur de charge', 'service:NestJS origin|Origine NestJS', 'database:Database|Base de données'],
    context: 'Packet loss on the client link pushes p99 latency above 800 ms.|La perte de paquets sur le lien client fait dépasser 800 ms au p99.',
  },
  '150-03': {
    flow: ['phone:Mobile app|Application mobile', 'cloud:HTTP/3 edge · QUIC|Edge HTTP/3 · QUIC', 'gateway:HTTP/2 upstream|Transport HTTP/2 en amont', 'service:NestJS origin|Origine NestJS', 'database:Database|Base de données'],
    notes: ['Expose HTTP/3 at the edge for lossy client networks, with a fallback for older clients.|Exposer HTTP/3 à l’edge pour les réseaux clients avec pertes, avec repli pour les clients plus anciens.', 'Reuse HTTP/2 connections on the more stable edge-to-origin leg.|Réutiliser les connexions HTTP/2 sur le tronçon plus stable entre l’edge et l’origine.'],
  },
  '152-02': {
    flow: [['client:Editor A|Éditeur A', 'client:Editor B|Éditeur B'], 'service:Application server|Serveur applicatif', 'database:Document record|Enregistrement du document', 'warn:One change overwritten|Une modification est écrasée'],
    context: 'Two clients write 300 ms apart. The server reports success to both.|Deux clients écrivent à 300 ms d’intervalle. Le serveur signale un succès aux deux.',
  },
  '153-03': {
    flow: [['client:Replica A · local operation|Réplique A · opération locale', 'client:Replica B · local operation|Réplique B · opération locale'], 'queue:Exchange operations|Échanger les opérations', 'service:CRDT merge|Fusion CRDT', 'database:Convergent document|Document convergent'],
    notes: ['Replicas can apply operations in different orders and still converge.|Les répliques peuvent appliquer les opérations dans des ordres différents et converger.', 'Pick a CRDT whose merge semantics match the data and editing intent.|Choisir un CRDT dont la fusion correspond aux données et à l’intention d’édition.'],
  },
  '156-02': {
    flow: ['document:Document · 150K words|Document · 150 000 mots', 'service:Extract and prepare text|Extraire et préparer le texte', 'warn:128K-token context window|Fenêtre de contexte · 128 000 tokens', 'agent:LLM'],
    context: 'The full text is larger than the model’s context window.|Le texte intégral dépasse la fenêtre de contexte du modèle.',
  },
  '157-03': {
    flow: ['document:Source document|Document source', 'service:Overlapping chunks|Fragments chevauchants', 'database:Embed and index chunks|Vectoriser et indexer les fragments', 'gateway:Retrieve top-k|Récupérer les k meilleurs résultats', 'agent:LLM with selected context|LLM avec le contexte sélectionné'],
    notes: ['Index text once. At inference, supply only the relevant chunks.|Indexer le texte une fois. À l’inférence, fournir les fragments pertinents.', 'Tune chunk size and overlap to avoid losing information at boundaries.|Ajuster la taille et le chevauchement pour éviter les pertes aux frontières.'],
  },
  '159-02': {
    flow: [['client:User A spends $150|L’utilisateur A dépense 150 $', 'client:User B spends $150|L’utilisateur B dépense 150 $'], 'service:Payment service|Service de paiement', 'database:Wallet · $200 balance|Portefeuille · solde de 200 $', 'warn:Final balance · −$100|Solde final · −100 $'],
    context: 'Both requests approve the spend using the same starting balance.|Les deux requêtes autorisent la dépense à partir du même solde initial.',
  },
  '160-03': {
    flow: ['service:Read balance and version|Lire le solde et sa version', 'database:UPDATE … WHERE version = :read_version', ['service:Row updated · commit|Ligne modifiée · valider', 'warn:No row updated · retry|Aucune ligne modifiée · réessayer']],
    notes: ['Increment the version in the same update that changes the balance.|Incrémenter la version dans l’écriture qui modifie le solde.', 'Re-read and validate the balance after a conflict. Watch for contention on hot wallets.|Relire et revérifier le solde après un conflit. Surveiller la contention des portefeuilles très actifs.'],
  },
  '162-02': {
    flow: ['client:React dashboard|Tableau de bord React', 'document:CSV upload|Import CSV', 'warn:Parse and validate on main thread|Analyse et validation sur le thread principal', 'database:Save rows|Enregistrer les lignes'],
    context: 'During parsing, the page stops responding for about four seconds.|Pendant l’analyse du fichier, la page se bloque pendant environ quatre secondes.',
  },
  '164-03': {
    lanes: [
      ['Before · UI and parsing share a thread|Avant · interface et analyse sur le même thread', ['client:React UI|Interface React', 'warn:Parse CSV on main thread|Analyser le CSV sur le thread principal', 'warn:Frozen dashboard|Tableau de bord bloqué']],
      ['After · move parsing to a worker|Après · analyse déportée vers un worker', ['client:React UI stays responsive|Interface React réactive', 'gateway:postMessage', 'service:Worker parses and validates|Le worker analyse et valide', 'document:Progress and result|Progression et résultat']],
    ],
    notes: ['Move both parsing and validation. Send progress and return only what the UI needs.|Déporter l’analyse et la validation. Transmettre la progression et le résultat utile à l’interface.'],
  },
  '166-02': {
    flow: ['event:Transaction source|Source des transactions', 'queue:Kafka topic|Topic Kafka', 'service:Processing|Traitement', 'database:State store|Stockage d’état', 'warn:Fraud alert may arrive late|L’alerte antifraude peut arriver tard'],
    context: 'The fraud signal must be available within 500 ms of a transaction.|Le signal antifraude doit être disponible dans les 500 ms suivant la transaction.',
  },
  '167-03': {
    flow: ['event:Transactions', 'queue:Kafka', 'service:Apache Flink', ['database:Keyed state|État par clé', 'event:Fraud alerts|Alertes antifraude']],
    notes: ['Process events as they arrive and keep window state keyed by the relevant entity.|Traiter les événements à leur arrivée et conserver l’état de fenêtre par entité.', 'Checkpoint state for recovery and watch event-time delay.|Enregistrer des checkpoints pour la reprise et surveiller le retard en temps événementiel.'],
  },
  '169-02': {
    flow: ['client:User message|Message utilisateur', 'agent:Agent orchestrator|Orchestrateur d’agent', ['agent:LLM', 'database:Memory layer|Couche de mémoire']],
    context: 'The agent remembers the user’s name, but loses the task, decisions and next steps.|L’agent retient le nom de l’utilisateur, mais oublie la tâche, les décisions et les prochaines étapes.',
  },
  '171-03': {
    flow: ['client:Conversation', 'agent:Agent', ['document:Recent turns in context|Derniers échanges en contexte', 'database:Structured episode summaries|Résumés épisodiques structurés', 'database:Long-term facts|Informations à long terme'], 'agent:LLM with relevant memory|LLM avec la mémoire utile'],
    notes: ['Keep recent turns verbatim and summarize older episodes into structured records.|Conserver les derniers échanges tels quels et résumer les épisodes plus anciens sous forme structurée.', 'Retrieve relevant episodes and tie them to the current task.|Récupérer les épisodes pertinents et les relier à la tâche en cours.'],
  },
  '173-02': {
    flow: ['client:Clients', 'cloud:DNS or edge routing|DNS ou routage à l’edge', 'bucket:CDN edge cache|Cache du CDN à l’edge', 'service:Origin server|Serveur d’origine', 'database:Object storage|Stockage objet'],
    context: 'A deployment can leave old assets cached at multiple points of presence.|Un déploiement peut laisser d’anciens fichiers en cache dans plusieurs points de présence.',
  },
  '174-03': {
    flow: ['client:Users in multiple regions|Utilisateurs dans plusieurs régions', 'cloud:Anycast', ['bucket:Nearest CDN point of presence|Point de présence CDN proche', 'bucket:Other CDN points of presence|Autres points de présence CDN'], 'service:Origin server|Serveur d’origine'],
    notes: ['Serve cached content while revalidating it in the background.|Servir le contenu en cache pendant sa revalidation en arrière-plan.', 'Send a targeted purge to the CDN API as part of deployment.|Déclencher une purge ciblée via l’API du CDN au déploiement.'],
  },
  '176-02': {
    flow: [['phone:Field device offline|Appareil terrain hors ligne', 'client:Colleague editing online|Collègue qui modifie en ligne'], ['database:Local IndexedDB', 'service:Online edit|Édition en ligne'], ['service:Bulk sync on reconnect|Synchronisation groupée à la reconnexion', 'database:Server database|Base serveur'], 'warn:Conflicts and schema mismatches|Conflits et écarts de schéma'],
    links: [[0,0,1,0],[0,1,1,1],[1,0,2,0],[1,1,2,1],[2,0,2,1],[2,1,3,0]],
    context: 'Concurrent edits can be overwritten and old local schemas can break synchronization.|Des modifications concurrentes peuvent être écrasées, et un ancien schéma local peut bloquer la synchronisation.',
  },
  '178-03': {
    flow: [['phone:Offline edits · device A|Modifications hors ligne · appareil A', 'phone:Offline edits · device B|Modifications hors ligne · appareil B'], 'queue:Exchange CRDT updates|Échanger les mises à jour CRDT', 'service:Deterministic merge|Fusion déterministe', 'database:Convergent record|Enregistrement convergent'],
    notes: ['Automerge or Yjs can merge operations even when they arrive in a different order.|Automerge ou Yjs peut fusionner des opérations reçues dans un ordre différent.', 'Keep explicit migrations for old local data and test reconnect behavior.|Prévoir des migrations explicites pour les anciennes données locales et tester la reconnexion.'],
  },
  '180-02': {
    flow: ['client:Search client|Client de recherche', 'service:Search API|API de recherche', 'database:PostgreSQL full-text index|Index plein texte PostgreSQL', 'warn:Latency under growing load|Latence sous charge croissante'],
    context: 'The search workload needs to scale independently of transactional reads and writes.|La charge de recherche doit évoluer indépendamment des lectures et écritures transactionnelles.',
  },
  '182-03': {
    flow: ['client:Search client|Client de recherche', 'service:Search API|API de recherche', 'database:Elasticsearch inverted index|Index inversé Elasticsearch', 'client:Ranked results|Résultats classés'],
    notes: ['Posting lists let the search engine find and rank matching documents efficiently.|Les listes de positions permettent de retrouver et de classer efficacement les documents correspondants.', 'Feed the index asynchronously and plan for a delay before updates become searchable.|Alimenter l’index de façon asynchrone et prévoir un délai avant que les mises à jour soient visibles.'],
  },
  '184-02': {
    flow: ['client:Refund request|Demande de remboursement', 'agent:LLM agent|Agent LLM', 'document:Untyped JSON|JSON non typé', 'warn:Order service crashes|Le service de commandes échoue', 'database:Refund not recorded|Remboursement non enregistré'],
    context: 'The model returns an amount in words and an order_id set to null.|Le modèle renvoie un montant en toutes lettres et un order_id à null.',
  },
  '186-03': {
    lanes: [
      ['Prompt only|Prompt seul', ['agent:LLM', 'document:Unconstrained JSON|JSON sans contrainte', 'warn:Wrong field types|Types de champs erronés']],
      ['Schema enforced during generation|Schéma imposé pendant la génération', ['document:JSON Schema', 'agent:Constrained decoding|Décodage contraint', 'document:Typed output|Sortie typée', 'service:Business validation|Validation métier']],
    ],
    notes: ['Define the schema with the API. Check business invariants before performing the action.|Définir le schéma via l’API. Vérifier les règles métier avant d’exécuter l’action.'],
  },
  '189-02': {
    flow: ['client:Clients', 'gateway:API gateway or proxy|Passerelle API ou proxy', 'service:OrderService monolith|Monolithe OrderService', 'database:Shared database|Base partagée'],
    context: 'Returns need their own service while the rest of the monolith keeps running.|Les retours doivent passer dans un service dédié pendant que le reste du monolithe continue de fonctionner.',
  },
  '191-03': {
    flow: ['client:Clients', 'gateway:Routing facade|Façade de routage', ['service:/returns → new service|/returns → nouveau service', 'service:Other routes → monolith|Autres routes → monolithe'], ['database:Returns data|Données de retour', 'database:Existing data|Données existantes']],
    notes: ['Route one capability at a time and leave the remaining paths on the monolith.|Rediriger une fonctionnalité à la fois et laisser les autres routes sur le monolithe.', 'Shift traffic back if needed, then retire the old returns code once stable.|Pouvoir réorienter le trafic et retirer l’ancien code des retours une fois le nouveau stable.'],
  },
  '193-02': {
    flow: ['client:User request|Demande utilisateur', 'agent:LLM agent|Agent LLM', 'gateway:Tool selection|Sélection d’outils', ['service:Calendar', 'service:Search flights|Rechercher des vols', 'service:Book flight|Réserver le vol'], 'document:Response|Réponse'],
    context: 'The agent must choose which tools to call, in what order, and when to stop.|L’agent doit choisir les outils à appeler, dans quel ordre et quand s’arrêter.',
  },
  '194-03': {
    flow: ['client:Request|Demande', 'agent:Reason about the next step|Raisonner sur la prochaine étape', 'service:Call one tool|Appeler un outil', 'document:Observe its result|Observer son résultat', 'agent:Continue or answer|Continuer ou répondre'],
    returnLinks: [[4,0,1,0]],
    notes: ['Each observation informs the next reasoning and action step.|Chaque observation guide l’étape suivante de raisonnement et d’action.', 'Use parallel calls where tools genuinely have no dependencies.|Paralléliser les appels quand les outils sont réellement indépendants.'],
  },
  '197-02': {
    flow: ['client:Analyst|Analyste', 'service:SQL query|Requête SQL', 'database:BigQuery · 3.2 TB events|BigQuery · 3,2 To d’événements', 'warn:Bytes scanned and billed|Octets parcourus et facturés'],
    context: 'Queries filter on a date range and customer_id.|Les requêtes filtrent sur une plage de dates et sur customer_id.',
  },
  '199-03': {
    lanes: [
      ['Before · scan broadly|Avant · parcours étendu', ['client:Date and customer filter|Filtre par date et par client', 'database:Read a broad table range|Parcourir une large partie de la table', 'warn:High scanned volume|Volume parcouru élevé']],
      ['After · partition and cluster|Après · partitionnement et clustering', ['client:Same query|Même requête', 'squaregrid:Prune date partitions|Écarter les partitions de dates', 'squaregrid:Skip unrelated customer blocks|Ignorer les blocs des autres clients', 'database:Read the matching slice|Lire la tranche correspondante']],
    ],
    notes: ['Partition pruning reduces the dates scanned; clustering reduces the blocks scanned within a date.|L’élagage réduit les dates parcourues. Le clustering réduit les blocs lus dans chaque date.'],
  },
  '202-02': {
    flow: ['client:Client requests|Requêtes clientes', 'cloud:HTTPS', 'service:FastAPI', 'agent:PyTorch model|Modèle PyTorch', 'warn:GPU · 23% utilization|GPU · 23 % d’utilisation'],
    context: '3,000 requests/s and 4.2 s at p99, despite low GPU utilization.|3 000 requêtes/s et 4,2 s au p99 malgré une faible utilisation du GPU.',
  },
  '204-03': {
    lanes: [
      ['Before · one request per pass|Avant · une requête par passage', ['client:Incoming requests|Requêtes entrantes', 'agent:Separate forward passes|Passages d’inférence séparés', 'warn:Low GPU utilization|Faible utilisation du GPU']],
      ['After · dynamic batching|Après · regroupement dynamique', ['client:Incoming requests|Requêtes entrantes', 'queue:Short batching window|Courte fenêtre de regroupement', 'agent:One batched GPU pass|Un passage groupé sur le GPU', 'service:Split the responses|Distribuer les réponses']],
    ],
    notes: ['Tune the maximum queue delay and batch size against tail latency and throughput.|Ajuster le délai maximal en file et la taille des lots en fonction du débit et de la latence de queue.'],
  },
  '206-02': {
    flow: [['client:Free-tier tenant|Client de l’offre gratuite', 'client:Paying tenants|Clients payants'], 'gateway:Load balancer|Répartiteur de charge', 'service:Shared application|Application partagée', 'database:Shared database|Base partagée', 'warn:Noisy neighbor|Voisin bruyant'],
    context: 'Heavy traffic from one tenant makes other tenants’ checkouts fail.|La charge d’un client fait échouer le paiement des autres clients.',
  },
  '208-03': {
    flow: ['client:Tenant requests|Requêtes des clients', 'gateway:Routing middleware|Middleware de routage', 'database:Tenant registry|Registre des clients', ['database:Free tier · shared pool|Offre gratuite · pool partagé', 'database:Mid tier · isolated tenant schema|Offre intermédiaire · schéma isolé', 'database:Enterprise · dedicated database|Offre entreprise · base dédiée']],
    notes: ['Choose an isolation level per tenant and resolve the destination through the registry.|Choisir un niveau d’isolement par client et résoudre sa destination via le registre.', 'Apply cross-tenant access controls and measure noisy workloads.|Appliquer les contrôles d’accès entre clients et mesurer les charges les plus bruyantes.'],
  },
  '210-02': {
    flow: ['client:Mobile apps and partners|Applications mobiles et partenaires', 'gateway:API gateway|Passerelle API', 'service:User service|Service utilisateurs', 'database:User DB|Base utilisateurs', 'warn:Breaking response change|Changement incompatible de la réponse'],
    context: '/users now returns fullName instead of first_name and last_name.|/users renvoie désormais fullName au lieu de first_name et last_name.',
  },
  '212-03': {
    flow: ['client:Client sends Accept header|Le client envoie l’en-tête Accept', 'gateway:Gateway and middleware|Passerelle et middleware', 'service:Select the API representation|Choisir la représentation de l’API', ['document:Matching representation|Représentation compatible', 'warn:406 Not Acceptable|406 Not Acceptable']],
    notes: ['Content negotiation selects a representation through Accept.|La négociation de contenu choisit une représentation via Accept.', 'Header handling and cache variation complicate deployment. URL versions are often easier to operate.|La gestion des en-têtes et des variantes en cache complique le déploiement. Les versions dans l’URL sont souvent plus simples à exploiter.'],
  },
  '214-02': {
    flow: ['client:Client applications|Applications clientes', ['service:Writer services|Services d’écriture', 'service:Reader services|Services de lecture'], 'database:PostgreSQL · users', 'warn:Existing field: full_name|Champ existant : full_name'],
    context: 'Split full_name into first_name and last_name on a live 40-million-row table.|Scinder full_name en first_name et last_name sur une table active de 40 millions de lignes.',
  },
  '216-03': {
    lanes: [
      ['Expand|Étendre', ['database:Add nullable columns|Ajouter les colonnes nullables', 'service:Write both formats|Écrire les deux formats', 'queue:Backfill existing rows|Renseigner les lignes existantes']],
      ['Contract|Retirer l’ancien format', ['service:Switch reads and verify|Basculer et vérifier les lectures', 'service:Stop old writes|Arrêter les anciennes écritures', 'database:Remove full_name|Supprimer full_name']],
    ],
    notes: ['Keep readers and writers compatible until the migration has completed.|Préserver la compatibilité des services de lecture et d’écriture jusqu’à la fin de la migration.'],
  },
  '218-02': {
    flow: ['client:User query|Requête utilisateur', 'service:Query backend|Backend de recherche', 'database:Old FAISS index|Ancien index FAISS', 'agent:LLM answer|Réponse du LLM', 'warn:Search relevance drops|La pertinence baisse'],
    context: 'A changing corpus drifts away from a 400 GB index last rebuilt months ago.|Un corpus qui évolue s’éloigne d’un index de 400 Go reconstruit plusieurs mois plus tôt.',
  },
  '220-03': {
    flow: ['document:Corpus and embedding model|Corpus et modèle d’embedding', 'gateway:Embedding version registry|Registre des versions d’embedding', ['database:Old index|Ancien index', 'database:New index|Nouvel index'], 'service:Validate and switch traffic|Valider puis basculer le trafic'],
    notes: ['Keep queries and indexed vectors on compatible embedding versions.|Utiliser des versions d’embedding compatibles pour les requêtes et les vecteurs indexés.', 'Build and test the replacement index before swapping it in. Keep the old one available for rollback.|Construire et tester l’index de remplacement avant la bascule. Garder l’ancien pour un retour arrière.'],
  },
  '222-02': {
    flow: ['client:Research request|Demande de recherche', 'agent:Research agent|Agent de recherche', ['agent:Specialist A|Spécialiste A', 'agent:Specialist B|Spécialiste B', 'agent:Specialist C|Spécialiste C'], 'database:Shared context|Contexte partagé', 'agent:Final synthesis|Synthèse finale'],
    context: 'Multiple agents can run in parallel, spawn subtasks and write to shared state.|Plusieurs agents peuvent travailler en parallèle, créer des sous-tâches et écrire dans un état partagé.',
  },
  '224-03': {
    flow: ['client:Request|Demande', 'gateway:Central orchestrator|Orchestrateur central', ['agent:Research subagent|Sous-agent de recherche', 'agent:Analysis subagent|Sous-agent d’analyse', 'agent:Validation subagent|Sous-agent de validation'], 'database:Collected results|Résultats collectés', 'document:Final synthesis|Synthèse finale'],
    notes: ['The orchestrator owns dependencies, retries and state transitions.|L’orchestrateur gère les dépendances, les nouvelles tentatives et les transitions d’état.', 'Subagents return scoped results, which the orchestrator combines before synthesis.|Les sous-agents rendent un résultat ciblé, que l’orchestrateur rassemble avant la synthèse.'],
  },
  '226-02': {
    flow: ['phone:Mobile or web client|Client mobile ou Web', 'service:Upload service|Service d’envoi', 'bucket:Object storage|Stockage objet', 'queue:Job queue|File de tâches', 'service:Video worker|Worker vidéo', 'database:Job state|État de la tâche'],
    context: 'Video processing takes two to eight minutes. Clients need durable progress updates.|Le traitement vidéo dure deux à huit minutes. Les clients doivent pouvoir suivre son état durablement.',
  },
  '228-03': {
    lanes: [
      ['Processing independent of the client|Traitement indépendant du client', ['client:Submit upload|Envoyer le fichier', 'service:Return a stable job ID|Renvoyer un identifiant stable', 'queue:Durable job queue|File de tâches durable', 'service:Video worker|Worker vidéo']],
      ['Progress queries|Consultation de la progression', ['phone:Client polls with job ID|Le client interroge avec l’identifiant', 'gateway:GET /jobs/:id/status', 'database:Job state with TTL|État de la tâche avec TTL']],
    ],
    notes: ['Use backoff, meaningful progress states and idempotent processing.|Prévoir un backoff, des états de progression utiles et un traitement idempotent.'],
  },
  '230-02': {
    flow: ['client:Payment client|Client de paiement', 'service:Payment service|Service de paiement', 'database:PostgreSQL primary|Primaire PostgreSQL', ['database:Replica 1|Réplique 1', 'database:Replica 2|Réplique 2'], 'warn:Confirmation is stale|Confirmation obsolète'],
    context: 'Asynchronous replication lags by 80–300 ms under load.|La réplication asynchrone accuse 80 à 300 ms de retard sous charge.',
  },
  '232-03': {
    flow: ['client:Payment clients|Clients de paiement', 'gateway:Route reads by purpose|Router les lectures selon leur usage', ['database:Primary · writes and confirmations|Primaire · écritures et confirmations', 'database:Replicas · other reads|Répliques · autres lectures'], ['service:Fresh payment confirmation|Confirmation de paiement à jour', 'service:Normal read traffic|Trafic de lecture normal']],
    notes: ['Use the primary immediately after a payment for confirmation reads.|Lire la confirmation sur le primaire juste après le paiement.', 'Keep ordinary reads balanced across replicas.|Maintenir la répartition des autres lectures entre les répliques.'],
  },
  '234-02': {
    flow: ['client:Support request|Demande de support', 'agent:NestJS agent|Agent NestJS', ['agent:LLM calls|Appels LLM', 'service:Tool calls|Appels d’outils', 'database:Retrieval store|Index de recherche'], 'warn:One HTTP 200 log per run|Un seul log HTTP 200 par exécution'],
    context: 'A high-level log does not show what made an agent run slow, costly or wrong.|Un log global n’indique pas quelle étape rend l’exécution lente, coûteuse ou erronée.',
  },
  '236-03': {
    flow: ['client:Agent run with trace ID|Exécution avec identifiant de trace', 'gateway:Root span', ['agent:LLM span · tokens and model|Span LLM · tokens et modèle', 'service:Tool span · latency and status|Span outil · latence et statut', 'database:Retrieval span · source|Span de recherche · source'], 'client:End-to-end trace|Trace de bout en bout'],
    notes: ['Keep one trace ID through the run and use child spans for the individual steps.|Conserver un identifiant par exécution et créer des spans enfants pour chaque étape.', 'Attribute token usage and latency to the hop that incurred them.|Attribuer les tokens et la latence à l’étape qui les a occasionnés.'],
  },
  '238-02': {
    flow: ['client:Client sends payment|Le client envoie le paiement', 'gateway:API gateway|Passerelle API', 'service:Payment service|Service de paiement', ['cloud:Stripe', 'database:Payments DB|Base des paiements'], 'warn:Retry charges again|La nouvelle tentative débite à nouveau'],
    context: 'The same payment intent is sent again after a network failure.|La même intention de paiement est renvoyée après une panne réseau.',
  },
  '240-03': {
    flow: ['client:Client creates UUID once|Le client crée un UUID une fois', 'gateway:Idempotency-Key', 'database:Reserve scoped key as pending|Réserver la clé par client avec l’état pending', 'service:Process payment once|Traiter une seule fois le paiement', 'database:Save the completed response|Enregistrer la réponse et l’état completed'],
    notes: ['Use the same key for retries of the same intent and replay its stored response.|Réutiliser la clé pour la même intention et renvoyer la réponse enregistrée.', 'Scope keys to the customer and define a documented expiry window.|Limiter la portée des clés au client et documenter leur durée de vie.'],
  },
  '243-02': {
    flow: ['cloud:Global clients|Clients dans le monde', 'gateway:Edge and load balancing|Edge et répartition de charge', ['service:Auth and core domain|Authentification et domaine métier', 'service:Billing and real-time data|Facturation et données temps réel', 'agent:AI inference|Inférence IA'], 'database:Platform data|Données de la plateforme'],
    context: 'Multi-tenant SaaS, 50,000 requests/s at launch, three months to ship.|SaaS multitenant, 50 000 requêtes/s au lancement et trois mois pour livrer.',
  },
  '244-03': {
    group: [2, 'Application modules|Modules de l’application'],
    flow: ['client:Clients', 'gateway:Load balancer|Répartiteur de charge', ['service:Auth module|Module d’authentification', 'service:Billing module|Module de facturation', 'service:Core domain module|Module métier', 'agent:Inference module|Module d’inférence'], 'database:Single deployment · owned tables|Déploiement unique · tables par module'],
    notes: ['Enforce module boundaries in one deployable application.|Faire respecter les frontières entre modules dans une application déployable en un bloc.', 'Extract a service only once an independently scaling or operational boundary is clear.|Extraire un service quand le besoin d’évoluer ou d’être exploité indépendamment est établi.'],
  },
};
