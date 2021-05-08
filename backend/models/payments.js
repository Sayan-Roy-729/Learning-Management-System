const mongoose = require('mongoose');

const schema = mongoose.Schema;

const paymentSchema = schema(
    {
        userEmail: {
            type: String,
            required: true,
            unique: true,
        },
        payments: [
            {
                courseId: {
                    type: String,
                    required: true,
                }
            },
        ],
    },
    { timestamp: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
