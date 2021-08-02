const express = require("express");
const router = express.Router();
const multer = require("multer");

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "./uploads");
	},
	filename: function (req, file, callback) {
		console.log(file);
		callback(
			null,
			file.originalname.split(".").slice(0, -1).join(".") +
				"-" +
				Date.now() +
				path.extname(file.originalname),
		);
	},
});

var upload = multer({ storage: storage });

router.post("/api/v1/file/add", upload.single("file"), async (req, res) => {
	const { file } = req;
	try {
		if (!file) {
			res.send({ status: false, message: "No files" });
		} else {
			res.send({
				status: true,
				message: "File was successfully uploaded!",
				file,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
});

router.get("*", (req, res) => {
	response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = router;
