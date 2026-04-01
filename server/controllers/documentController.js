import Document from '../models/Document.js';

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadDocument = async (req, res) => {
  const { title, fileUrl } = req.body;
  if (!title || !fileUrl) {
    return res.status(400).json({ message: 'Please provide title and fileUrl' });
  }
  try {
    const document = new Document({
      title,
      fileUrl,
      userId: req.user._id
    });
    const createdDocument = await document.save();
    res.status(201).json(createdDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    if (document.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await document.deleteOne();
    res.json({ message: 'Document removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
