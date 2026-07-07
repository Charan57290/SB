const FormData = require('form-data');

async function testPdfUpload() {
  try {
    const formData = new FormData();
    // Create a dummy pdf buffer. pdf-parse requires a valid PDF structure to not throw an error.
    // Let's create a minimal valid PDF buffer.
    const minimalPdf = Buffer.from(
      "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length 44 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Hello World) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000219 00000 n \n0000000307 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n402\n%%EOF\n",
      "utf-8"
    );
    
    formData.append('file', minimalPdf, {
      filename: 'dummy.pdf',
      contentType: 'application/pdf',
    });

    const response = await fetch('http://localhost:5000/api/brainkit/research/summarize', {
      method: 'POST',
      body: formData,
    });
    
    const text = await response.text();
    console.log("Status:", response.status);
    console.log("Response:", text);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testPdfUpload();
