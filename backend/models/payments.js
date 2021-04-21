const mongoose = require('mongoose');

const schema = mongoose.Schema;

const paymentSchema = schema(
    {
        userName: {
            type: String,
            required: true,
        },
        userEmail: {
            type: String,
            required: true,
        },
        payments: [
            {
                charge_id: {
                    type: String,
                    required: true,
                },
                amount: {
                    type: Number,
                    required: true,
                },
                balance_transaction: {
                    type: String,
                    required: true,
                },
                payment_email: {
                    type: String,
                    required: true,
                },
                created: {
                    type: String,
                    required: String,
                },
                currency: {
                    type: String,
                    required: true,
                },
                customer: {
                    type: String,
                    required: true,
                },
                payment_method: {
                    type: String,
                    required: true,
                },
                receipt_email: {
                    type: String,
                    required: true,
                },
                receipt_url: {
                    type: String,
                    required: true,
                },
                refund_url: {
                    type: String,
                    required: true,
                },
                source_id: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamp: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
