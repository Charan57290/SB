const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Main Router
const router = express.Router();

// Mock Data
let mockNotes = [
  { id: '1', title: 'Example Note', content: 'This is a mock note content.', userId: 'user-001', createdAt: new Date().toISOString() },
  { id: 'test-flux', title: 'Neural Flux Protocol', content: 'The protocol involves sub-millisecond neural retrieval and monochrome optimization for student workflows.', userId: 'user-001', createdAt: new Date().toISOString() }
];

// Health Check
router.get('/health', (req, res) => res.json({ status: 'live', mode: 'fast-start' }));

// Auth Routes
router.post('/auth/register', (req, res) => {
  console.log('Registering user:', req.body.email);
  res.status(201).json({ message: 'User registered successfully', userId: 'user-001', email: req.body.email });
});

router.post('/auth/login', (req, res) => {
  console.log('Logging in user:', req.body.email);
  res.status(200).json({ 
    token: 'mock-jwt-token-abcd-1234', 
    userId: 'user-001', 
    email: req.body.email 
  });
});

// Notes Routes
router.get('/notes', (req, res) => {
  res.json(mockNotes);
});

router.post('/notes', (req, res) => {
  const newNote = {
    id: Math.random().toString(36).substr(2, 9),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  mockNotes.push(newNote);
  res.status(201).json(newNote);
});

router.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const index = mockNotes.findIndex(n => n.id === id);
  if (index !== -1) {
    mockNotes[index] = { ...mockNotes[index], ...req.body, updatedAt: new Date().toISOString() };
    res.json(mockNotes[index]);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// Assistant Routes
router.post('/assistant/ask', (req, res) => {
  const { query } = req.body;
  const q = query.toLowerCase();
  
  // Deep search logic
  const matchingNotes = mockNotes.filter(n => 
    n.title.toLowerCase().includes(q) || 
    n.content.toLowerCase().includes(q) ||
    (q.includes('note') && !q.includes('not '))
  );

  if (matchingNotes.length > 0) {
    const note = matchingNotes[0]; // Take most relevant
    const summary = note.content.length > 100 ? note.content.substring(0, 150) + '...' : note.content;
    
    if (q.includes('what') || q.includes('tell') || q.includes('written')) {
        res.json({ result: `Regarding your query about "${query}", I found your note titled "${note.title}". You wrote: "${summary}". I am processing these details for your workspace.` });
    } else {
        const titles = matchingNotes.map(n => `"${n.title}"`).join(', ');
        res.json({ result: `I found ${matchingNotes.length} intelligence nodes related to your query: ${titles}. Would you like me to summarize any specific one?` });
    }
  } else {
    res.json({ result: `I have scanned your neural storage for "${query}", but no direct matches were found. I can help search for broader topics or create a new node based on this query.` });
  }
});

app.use('/api', router);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Second Brain Backend (Fast Start) live on port ${PORT}`);
});
