const express = require("express");
const router = express.Router();
const Record = require("../models/Record");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { name, phno, desc, location, dor } = req.body;

  const rec = new Record({
    name: name,
    phno: phno,
    desc: desc,
    location: location,
    dor: dor,
  });

  rec.save().then(() => {
    res.send({ message: "Success" });
  });
});

router.get("/:phno", async (req, res) => {
  const phno = req.params.phno;

  try {
    const rec = await Record.findOne({ phno: phno });

    if (rec) {
      return res.status(200).json({ data: rec });
    }

    return res.status(200).json({ data: null });
  } catch (err) {}
});

router.delete("/:id", async (req, res) => {
  const rec = Record.findById(req.params.id);

  try {
    await rec.remove();
    res.json({ message: "Report deleted !" });
  } catch (err) {}
});

router.get("/:phno/:loc", async (req, res) => {
  const phno = req.params.phno;
  const location = req.params.loc;

  try {
    const records = await Record.find({
      phno: { $ne: phno },
      location: location,
    });

    if (!records) {
      return res
        .status(400)
        .json({ message: "No covid patients found in the region" });
    }

    return res.status(200).json({ message: "Documents found", data: records });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
