import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Heartbeat to keep the process alive in background tasks
setInterval(() => {
    // console.log('Backend heartbeat... Active on port:', PORT);
}, 60000);
