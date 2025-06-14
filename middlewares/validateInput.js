module.exports = (schema) => (req, res, next) => {
    const errors = [];
        for (const key in schema) {
        if (!req.body[key]) {
            errors.push(`${key} is required.`);
        } else if (!schema[key].regex.test(req.body[key])) {
            errors.push(schema[key].message);
        }
        }
    
        if (errors.length > 0) {
        return res.status(400).json({ errors });
        }
    
        next();
    };