const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.static('uploads'));
const storage = multer.diskStorage({
	destination: path.join(__dirname, '../public_html/', 'uploads'),
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	}
})

app.get('/', (req, res) => {
	res.json({ "status": true })
})

app.post('/imageupload', async (req, res) => {
	try {
		let upload = multer({ storage: storage }).single('avatar');

		upload(req, res, function (err) {


			if (!req.file) {
				return res.send('Please select an image to upload');
			}
			else if (err instanceof multer.MulterError) {
				return res.send(err);
			}
			else if (err) {
				return res.send(err);
			}

			const classifiedsadd = {
				image: req.file.filename
			};

			console.log(classifiedsadd)

		});
	} catch (err) { console.log(err) }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
