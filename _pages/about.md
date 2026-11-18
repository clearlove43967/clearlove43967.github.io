---
layout: academic
permalink: /
title: About
description: "Jiantong Qin at CUHK. Research on trustworthy AI, agent safety, AI auditing, and UI-to-code generation."
redirect_from:
  - /about/
  - /about.html
---
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="eyebrow"><span class="small-line"></span> THE CHINESE UNIVERSITY OF HONG KONG</p>
    <h1 id="hero-title">Jiantong <span>Qin</span><span class="name-period">.</span></h1>
    <p class="hero-lead">Understanding AI.<br>Building <em>trust.</em></p>
    <p class="hero-description">I study how AI systems reason, make decisions, and interact with the world — and how we can make them safer and more reliable.</p>
    <div class="hero-actions"><a class="button button-primary" href="{{ '/publications/' | relative_url }}">Explore my research <span aria-hidden="true">↗</span></a><a class="text-link" href="{{ '/assets/CV.pdf' | relative_url }}">Curriculum vitae <span aria-hidden="true">↗</span></a></div>
    <div class="social-links" aria-label="Contact and academic profiles"><a href="mailto:{{ site.author.email }}">Email <span aria-hidden="true">↗</span></a><a href="{{ site.author.googlescholar }}">Google Scholar <span aria-hidden="true">↗</span></a><a href="https://github.com/clearlove43967">GitHub <span aria-hidden="true">↗</span></a></div>
  </div>
  <figure class="portrait"><div class="portrait-frame"><img src="{{ '/images/profile.png' | relative_url }}" alt="Jiantong Qin" width="970" height="1024" fetchpriority="high"></div><figcaption><span class="location-dot" aria-hidden="true"></span> Hong Kong <span class="portrait-index" aria-hidden="true">01 / INTRODUCTION</span></figcaption></figure>
</section>
<section class="about-section section-grid" aria-labelledby="about-title">
  <div class="section-label"><p class="eyebrow">A LITTLE CONTEXT</p><h2 id="about-title">About me<span>.</span></h2></div>
  <div class="prose">
    <p>I am a Ph.D. student in Systems Engineering and Engineering Management at <a href="https://www.cuhk.edu.hk/english/index.html">The Chinese University of Hong Kong</a>, supervised by Prof. <a href="https://www.se.cuhk.edu.hk/people/academic-staff/prof-meng-mei-ling-helen/">Helen Meng</a>. My research centers on <strong>trustworthy AI</strong>, with interests in agent safety and AI auditing.</p>
    <p>I studied Artificial Intelligence: Systems and Technologies at CUHK as a member of the Faculty of Engineering’s ELITE Stream, and spent a semester at the University of Bristol. I have worked with Prof. <a href="https://www.cse.cuhk.edu.hk/lyu/home">Michael R. Lyu</a> on UI-to-code generation and closely with Dr. <a href="https://penguinnnnn.github.io/">Jen-tse Huang</a> on evaluating AI from social science perspectives.</p>
    <div class="research-tags" aria-label="Research interests"><span>Trustworthy AI</span><span>Agent safety</span><span>AI auditing</span><span>UI-to-code</span></div>
  </div>
</section>
<section class="news-section section-grid" aria-labelledby="news-title">
  <div class="section-label"><p class="eyebrow">RECENT UPDATES</p><h2 id="news-title">News<span>.</span></h2></div>
  <div class="news-list">
    <div class="news-item"><time datetime="2026-05-16">MAY 2026</time><p><span class="news-tag">Paper</span> <strong>ComUICoder</strong> accepted at KDD 2026!</p></div>
    <div class="news-item"><time datetime="2026-01">JAN 2026</time><p><span class="news-tag">Preprint</span> <a href="https://arxiv.org/abs/2601.07972">Knowing But Not Doing</a> is on arXiv.</p></div>
    <div class="news-item"><time datetime="2025-08-21">AUG 2025</time><p><span class="news-tag">Paper</span> Our co-first-authored paper <strong>VisBias</strong> accepted at EMNLP 2025 (Main)!</p></div>
  </div>
</section>
<section class="research-section" aria-labelledby="research-title">
  <div class="section-heading"><div><p class="eyebrow">QUESTIONS I WORK ON</p><h2 id="research-title">Research & publications<span>.</span></h2></div><a class="text-link" href="{{ '/publications/' | relative_url }}">All publications <span aria-hidden="true">↗</span></a></div>
  <div class="publication-list">{% assign papers = site.publications | sort: 'date' | reverse %}{% for paper in papers %}{% include publication-card.html %}{% endfor %}</div>
  <p class="contribution-note">* Equal contribution · † Corresponding author</p>
</section>
<section class="beyond-strip" aria-labelledby="beyond-title"><div><p class="eyebrow">AWAY FROM THE DESK</p><h2 id="beyond-title">Life through a different lens<span>.</span></h2><p>A space for photographs, small discoveries, and moments outside research.</p></div><a class="button button-outline" href="{{ '/life/' | relative_url }}">Life / Photography <span aria-hidden="true">↗</span></a></section>
{% include visitor-map.html %}
