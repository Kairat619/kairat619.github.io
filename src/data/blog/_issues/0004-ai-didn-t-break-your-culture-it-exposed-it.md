---
title: "AI Didn't Break Your Culture. It Exposed It."
pubDatetime: 2026-03-26T08:16:12Z
modDatetime: 2026-03-26T17:48:26Z
slug: ai-didn-t-break-your-culture-it-exposed-it
featured: false
draft: false
tags: ["others"]
description: "An engineer pushes back on a decision. The response: \"ChatGPT recommended something else.\" The tell isn't the recommendation. It's that they reached for an..."
canonicalURL: "https://github.com/Kairat619/kairat619.github.io/issues/4"
hideEditPost: true
---

[#ai](https://dev.to/t/ai)[#webdev](https://dev.to/t/webdev)[#programming](https://dev.to/t/programming)[#leadership](https://dev.to/t/leadership)

An engineer pushes back on a decision. The response: "ChatGPT recommended something else." The tell isn't the recommendation. It's that they reached for an oracle instead of an argument. You're not watching an AI problem. You're watching a culture problem that predates the model by years.

I've been the oracle.

The Oracle Was Always There
---------------------------

Before ChatGPT, it was Stack Overflow. Before Stack Overflow, it was the one senior engineer who had been around longest. Teams find oracles when they don't have frameworks. They fill the decision vacuum with whatever authority is nearest.

ChatGPT is just the most accessible oracle ever built. It's confident, available at 2am, and it never makes you feel stupid for asking. Of course engineers reach for it.

The question is what they're replacing with it.

If your team has no shared framework for architectural decisions, no clear authority structure, no agreed-on method for weighing tradeoffs ... "ChatGPT recommended something else" is just the latest version of "Google says" or "I read a blog post" or the last tech talk someone attended. The source changes. The abdication of thinking stays the same.

That's the culture problem. And it was there long before the first API call.

One flavor of team gets hit hardest. The team that's technically accomplished but has never had to articulate its reasoning under pressure. The team where the senior engineers make the calls and everyone else executes. The team where architecture reviews are about performance, not inquiry. Those teams look fine until the oracle arrives and the emperor's new clothes problem becomes impossible to ignore.

A lot of engineering culture runs on borrowed credibility. Conference talks from FAANG engineers with entirely different constraints. Benchmarks run on workloads nothing like yours. Technical opinions absorbed as gospel without anyone stress-testing the assumptions. Teams learn to cite sources instead of building judgment. ChatGPT is the endpoint of that trajectory ... a perfectly confident authority on everything, available for anything, with zero friction and no accountability for being wrong.

When a culture already runs on borrowed credibility, an always-available oracle doesn't change behavior. It accelerates it.

What Culture Actually Does
--------------------------

I've been the oracle. Decisions on my team ran through me. The projects that worked were the ones I was close to. I read that as signal that I was adding value. It was a sign that I'd [built a dependency, not a team](https://www.jonoherrington.com/blog/stop-pretending-youre-technical). The engineers weren't deferring to me because my judgment was better. They were deferring because I had never built a culture where their judgment was tested.

When ChatGPT arrived, teams like the one I used to run had an obvious replacement oracle. Different interface. Same problem underneath.

Culture is not your team values on a Confluence page. It's not the engineering principles doc nobody reads after onboarding. It's not the Slack channel with memes and the occasional win.

Culture is what happens when nobody's watching. The shared understanding of how decisions get made, how tradeoffs get reasoned through, how an engineer pushes back on a bad idea without making it personal. The invisible scaffolding that holds the architecture together when you're not in the meeting.

Principals' dashboards looked great. Velocity up. Output up. Ask about unplanned work and the room went quiet. Nobody had a number. The dashboards measured what was easy to measure, not what was actually happening inside the [codebase](https://www.jonoherrington.com/blog/ai-productivity-mirage).

What was happening in teams where AI tooling ran without guardrails was exactly what you'd expect from a team without shared standards. Multiple HTTP client implementations pulling in different directions. Conflicting error-handling patterns across the same surface. Inconsistent approaches to the same category of problem, sometimes within the same file. Not because engineers were careless. Because there was no shared framework for what "right" looked like, and AI filled that vacuum at ten times the speed of any individual contributor.

The teams that thrived had done the work before AI arrived. Standards weren't a reaction to the new tools. Code patterns documented. Architecture decisions written down with the "why" included, not just the outcome. When you hand those teams an AI coding assistant, it becomes a force multiplier. The output fits the system.

> When you hand that same tool to a team with no shared framework, you get a junk drawer with a CI/CD pipeline.

What AI Actually Exposed
------------------------

AI didn't break your culture. It exposed teams that never built one.

Most leaders will tell you they have a culture. They'll point to the Notion doc. The architecture review calendar. The two-week sprint cadence. That's structure. Structure and culture are not the same thing.

Real culture is whether your engineers can defend a decision in their own words. Not quote what a tool recommended. Not point to a benchmark someone else ran. Construct the argument. Weigh the tradeoffs. Say "here's what I considered, here's what I chose, and here's what I'm watching to know if I was wrong."

If your engineers can do that, AI is a force multiplier.

If they can't, you have a problem that predates the model.

The culture that produces "ChatGPT said so" as a decision argument is the same culture that produces decisions by committee, approval chains that substitute for judgment, and teams that stopped asking "why" because it was never welcomed in the room. AI just gave that culture a name and a quotable moment.

> AI didn't create teams that can't think. It created a faster, more accessible oracle that made the problem visible.

Teach Them to Think
-------------------

Architecture Decision Records written for the engineer who wasn't in the room when the decision was made. Not bullet points justifying the choice after the fact ... actual reasoning. Here's what we considered. Here's what we ruled out and why. Here's what we're watching to know if we got it wrong. That's the document that builds judgment over time. ADRs written that way become the baseline for how engineers on your team actually make decisions, long before any AI model enters the picture. One ADR on session management saved us from a full migration that turned out to be unnecessary.

[Code standards documented as reasoning](https://www.jonoherrington.com/blog/ai-productivity-mirage), not rules. Here's the choice, here's what it costs, here's when you should challenge it. The same standards that let an engineer recognize a bad architectural recommendation from an AI are the ones that let them recognize a bad recommendation from a colleague, or from themselves at 11pm under deadline pressure. You don't build two separate frameworks for human decisions and AI decisions. You build one. You make it cheap to be wrong and expensive to hide it.

Review culture that interrogates "why" before it approves "what." The mid-level engineer who asks "why are we building this?" in a planning meeting is worth more to the team than the senior who [executes quietly and ships fast](https://www.jonoherrington.com/blog/engineering-culture-performance-art). That question is the signal you hire for. The engineer who asks why is the one building judgment instead of pattern matching. That is what you need when the pattern matcher in the room is an AI model that's confident about everything and accountable for nothing.

Give them room to be wrong. Give them problems worth reasoning through. Give them the feedback loops to know when their judgment is off. Those are the engineers who lead teams within 18 months.

> The same standards that let engineers recognize a bad AI recommendation are the ones that let them recognize a bad recommendation from a colleague, or from themselves at 11pm under pressure.

That's on Us
------------

If your engineers can't defend a decision in their own words, the problem isn't the tool they're reaching for. You never built a culture where their judgment was trusted, tested, or developed.

That's a leadership failure.

The fix starts with you. Not with the AI policy document. Not with the acceptable-use guidelines. With you.

With whether you ask "why" or just "when." With whether your reviews create space for engineers to be wrong and learn, or create pressure to be right fast. With whether you've removed yourself as a dependency on good decisions being made, or whether your team still needs you in the room to trust itself.

A team that defers to ChatGPT over its own judgment is a team that's been trained to defer to authority. Before the model arrived, that authority was you. I know it was me.

AI is going to keep getting better. The oracles will keep getting more confident, more accessible, more persuasive. The teams that win won't be the ones with the best AI policies.

They'll be the ones who built the culture where engineers can defend a decision in their own words before the oracle arrived. And the ones willing to reckon, right now, with what the oracle is exposing.

The next time an engineer says "ChatGPT recommended something else" in a review ... don't reach for the policy doc. Ask them to walk you through what they're weighing. What are the tradeoffs? What are they watching?

That's the conversation that builds culture. One exchange at a time, in the room where decisions actually happen.

Getting there isn't a tooling problem. It never was.

That's on us. All of us.
