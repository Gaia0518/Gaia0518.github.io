---
layout: page
title: word-freq
permalink: /word-freq/
nav: true
nav_order: 4
---

## 텍스트 입력

<textarea id="textInput" type="text" placeholder="분석할 텍스트를 입력하세요."></textarea>
<button onclick="updateChart()">제출</button>

## 단어 빈도 시각화
<div>
    <canvas id="myChart"></canvas>
</div>
<script src="/assets/js/word-freq.js"></script>