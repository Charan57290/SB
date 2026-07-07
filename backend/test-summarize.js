// Use native fetch

async function testSummarize() {
  try {
    const response = await fetch('http://localhost:5000/api/brainkit/research/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: "This is a test document about AI summarization. AI is useful." })
    });
    
    const text = await response.text();
    console.log("Status:", response.status);
    console.log("Response:", text);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testSummarize();
