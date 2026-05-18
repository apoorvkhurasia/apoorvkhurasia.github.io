---
title: "The missing piece in the monolith vs. microservices debate"
date: 2025-08-10
tags: [system design]
---

I frequently come across posts or comments on how someone got it right on the monolith vs. microservices debate or how the entire industry is now shifting back to one of the two styles. I treat these views with high scepticism. The most common examples cited are those of Facebook and Stack Overflow which have scaled massively on a monolith or that of Amazon, Netflix, and Uber who have likewise scaled massively on a predominantly microservices architecture.

But such examples often ignore the fact that Meta, as a company, has a unique culture that itself addresses many disadvantages of this architectural choice. Similarly, many business requirements of Amazon necessitate a microservices architecture for their core infrastructure. After all, you wouldn't want to build a cloud service which does not have fault isolation between its components or where components can accidentally assume internal knowledge of other components and become fragile as a result.

Every architecture choice comes with trade-offs and there is no "best design" out there. While there are many great articles written on comparative advantages and disadvantages of microservices and monoliths to help you perform a good trade-off analysis, you need to address [Conway's law](https://en.wikipedia.org/wiki/Conway%27s_law) upfront.

For a monolith to be successful in your organisation, your teams need to be comfortable with loose ownership boundaries and with giving up autonomy on some things. The choice of technology is not going to be as flexible, the deployments will not necessarily be controlled by them, and they will need to have a strong bias towards fixing things not necessarily broken by them rather than finding people to blame. These cultural aspects are often underestimated when the benefits of this design are touted.

That does not mean that companies that choose microservices architecture have dysfunctional teams. Far from it. They need excellent collaboration between teams around shared interfaces. And while teams gain high levels of autonomy on the decisions local to their services, in return they need to respect and trust other service owners with making the decisions for their services. If your organisation has a culture where a senior lead from one team can influence the choices on another team without accountability then you are not likely to reap all the benefits of a microservices architecture.

The next time you see someone call a clear winner between these styles, ask about their organisational design and dynamics first. You may find overcoming technical hurdles easier than changing your organisation's culture. In practice, you will almost certainly blend both styles and that blend will evolve with your organisation's culture as much as with your technical requirements.
