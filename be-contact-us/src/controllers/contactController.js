const Contact = require("../models/Contact");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getContactList = async (req, res) => {
  try {
    let { page, itemsPerPage, searchQuery, sortBy, sortOrder } = req.body;

    page = parseInt(page) || 1;
    itemsPerPage = parseInt(itemsPerPage) || 5;
    sortOrder = sortOrder === "desc" ? -1 : 1;

    const query = searchQuery
      ? {
          $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
            { subject: { $regex: searchQuery, $options: "i" } },
            { message: { $regex: searchQuery, $options: "i" } },
          ],
        }
      : {};

    const totalContacts = await Contact.countDocuments(query);
    const totalPages = Math.ceil(totalContacts / itemsPerPage);

    const contacts = await Contact.find(query)
      .sort(sortBy ? { [sortBy]: sortOrder } : { createdAt: -1 })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.status(200).json({
      data: contacts,
      pagination: {
        totalContacts,
        totalPages,
        currentPage: page,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
