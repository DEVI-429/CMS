const Contact = require('../models/Contact');

exports.addContact = async (req, res) => {
    try {
        const contact = await Contact.create({ ...req.body, userId: req.user.id });
        res.status(201).json(contact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getContacts = async (req, res) => {
    const contacts = await Contact.find({ userId: req.user.id });
    res.json(contacts);
};

exports.updateContact = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
        );
        if (!contact) return res.status(404).json({ message: `Contact not found for the given ID: ${id}` });
        res.json(contact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!contact) return res.status(404).json({ message: `Contact not found for the given ID: ${id}` });
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};