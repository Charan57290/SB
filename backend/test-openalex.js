const topic = 'File management in RTOS';

async function testOpenAlex() {
  const url = `https://api.openalex.org/works?search=${encodeURIComponent(topic)}&per-page=5`;
  const response = await fetch(url);
  const data = await response.json();
  
  for (const work of data.results) {
    let abstract = 'No abstract available';
    if (work.abstract_inverted_index) {
      const wordIndex = [];
      for (const [word, positions] of Object.entries(work.abstract_inverted_index)) {
        for (const pos of positions) {
          wordIndex[pos] = word;
        }
      }
      abstract = wordIndex.join(' ');
    }
    
    console.log({
      title: work.title,
      authors: work.authorships?.map(a => a.author.display_name).join(', '),
      year: work.publication_year,
      url: work.doi || work.id,
      abstract: abstract.substring(0, 100) + '...'
    });
  }
}

testOpenAlex().catch(console.error);
