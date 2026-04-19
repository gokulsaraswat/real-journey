import { buildTopicCatalogSummary, flattenTopics, parseTopicCatalogSource } from "@/lib/topics/catalog";

export const sampleTopicCatalogSource = `
1. Computer science fundamentals
2. Operating systems basics
3. Linux for engineers
4. Networking fundamentals
5. HTTP deep dive

## Section A — Cybersecurity (301–325)
301. Cybersecurity fundamentals
302. Threat modeling
303. OWASP Top 10
304. Authentication security
305. Authorization models

## Section C — AI Foundations (351–375)
351. AI fundamentals
352. ML fundamentals
353. Supervised learning
354. Unsupervised learning
355. Reinforcement learning

## Section F — DevOps and Platform (426–450)
426. DevOps fundamentals
427. CI/CD design
428. Git workflows
429. Branching strategies
430. Build pipelines

## Section Z — Management, strategy, and operating model (926–950)
926. Engineering management fundamentals
927. The first 90 days as a new manager
928. One-on-ones and coaching
929. Feedback and difficult conversations
930. Delegation and empowerment
`;

export const topicCatalogSections = parseTopicCatalogSource(sampleTopicCatalogSource);
export const topicCatalogSummary = buildTopicCatalogSummary(topicCatalogSections);
export const topicCatalogTopics = flattenTopics(topicCatalogSections);
export const topicCatalogHighlights = topicCatalogTopics.slice(0, 8);
