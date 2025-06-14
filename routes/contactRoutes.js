const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const validateInput = require('../middlewares/validateInput');
const {
    addContact,
    getContacts,
    updateContact,
    deleteContact
} = require('../controllers/contactController');

const contactSchema = {
    name: {
        regex: /^.{3,}$/,
        message: 'Name should be at least 3 characters long.'
    },
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid Email Format'
    },
    phone: {
        regex: /^[6-9]{10}$/,
        message: 'Phone number should be 10 digits'
    }
};

router.use(authMiddleware);
router.post('/', validateInput(contactSchema), addContact);
router.get('/', getContacts);
router.put('/:id', validateInput(contactSchema), updateContact);
router.delete('/:id', deleteContact);

module.exports = router;