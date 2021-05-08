const Stripe = require('stripe');
const uuid = require('uuid');

const Payments = require('../models/payments');

module.exports.paymentController = (req, res, next) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    // Fetch required details from request body
    const { userEmail, coursePrice, courseName, token, courseId } = req.body;
    // Create unique idempotencyKey from every payment
    const idempotencyKey = uuid.v4();
    // for access the charges after successful payment

    // Create new Customer
    stripe.customers
        .create({
            email: token.email,
            source: token.id,
        })
        .then((customer) => {
            // Create the charges of the customer
            return stripe.charges.create(
                {
                    amount: coursePrice * 100,
                    currency: 'inr',
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `Purchase of ${courseName}`,
                },
                // Unique idempotencyKey key to verify that customer is not charged for more than once
                { idempotencyKey }
            );
        })
        .then((result) => {
            return Payments.findOne({ userEmail: userEmail });
            // res.status(200).json(result);
        })
        .then((result) => {
            if (result) {
                const payments = result.payments;
                payments.push({
                    courseId: courseId,
                });

                Payments.findOneAndUpdate(
                    { userEmail: userEmail },
                    { payments },
                    { new: true },
                    (error, doc) => {
                        if (error) {
                            res.status(500).json({ error });
                            return;
                        }
                        res.status(200).json({
                            message: 'Payment Successful',
                            doc,
                        });
                    }
                );
            } else {
                const newUserPayment = new Payments({
                    userEmail,
                    payments: [
                        {
                            courseId,
                        },
                    ],
                });

                newUserPayment.save((error) => {
                    if (error) {
                        res.status(500).json({message: 'Save to database failed', error});
                    } else {
                        res.status(200).json({message: 'Payment Successful', newUserPayment});
                    }
                });
            }
        })
        .catch((error) => {
            console.log('Payment Error: ', error);
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};
