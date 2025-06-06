let text = "";

// 불용어 목록
const stopwords = [
  "the", "and", "to", "in", "of", "a", "for", "with",
  "on", "this", "that", "it", "which", "an", "at", "is"
];

// 차트를 위한 canvas context 설정
const ctx = document.getElementById('myChart').getContext('2d');

// Chart.js 차트 생성
const chart = new Chart(ctx, {
  type: "bar", 
  data: {},
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45
        }
      }
    }
  }
});

// 버튼 클릭 시 호출되는 함수
function updateChart() {
  text = document.getElementById("textInput").value;
  chart.data = getChartData(text);
  chart.update();
}

// 텍스트 분석 및 차트 데이터 생성
function getChartData(text, topn = 30) {
  const words = text.toLowerCase().match(/[a-z가-힣]+/g) || [];

  // 단어 빈도 계산
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // 불용어 제거
  for (const stop of stopwords) {
    delete frequency[stop]; // 0으로 만들기보다 아예 삭제하는 게 더 정확함
  }

  // 빈도 정렬 후 상위 topn 단어만 추출
  const sorted = Object.entries(frequency).sort(([, a], [, b]) => b - a);
  const freq_sorted = Object.fromEntries(sorted.slice(0, topn));

  // Chart.js용 데이터 반환
  return {
    labels: Object.keys(freq_sorted),
    datasets: [
      {
        label: "Frequency",
        data: Object.values(freq_sorted),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };
}
