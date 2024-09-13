const multer = require('multer');
const authorize = require('./authorize'); 


const upload = multer({ dest: 'uploads/' }); 

router.post('./upload', authorize, upload.single('image'), (req, res) => {
  try {
    const file = req.file; 
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
    
    res.status(200).json({ message: 'File uploaded successfully.', file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'File upload failed.' });
  }
});