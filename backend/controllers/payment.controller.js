const Stripe = require('stripe');
const uuid = require('uuid');

const Payments = require('../models/payments');

module.exports.paymentController = (req, res, next) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    // Fetch required details from request body
    const { userName, userEmail, coursePrice, courseName, token } = req.body;
    // Create unique idempotencyKey from every payment
    const idempotencyKey = uuid.v4();
    // for access the charges after successful payment
    var charges;

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
                { idempotencyKey },
                // Handle the payment requests
                (error, charge) => {
                    // If payment failed, handle the error
                    if (!error) {
                        next(error);
                    }

                    Payments.findOne({ userEmail }).then((user) => {
                        // Fetch required details
                        const charge_id = charge.id;
                        const payment_email = charge.billing_details.name;
                        const refund_url = charge.refunds.url;
                        const source_id = charge.source.id;
                        const date = new Date(charge.created).toString();
                        const created = date;
                        const {
                            amount,
                            balance_transaction,
                            currency,
                            customer,
                            payment_method,
                            receipt_email,
                            receipt_url,
                        } = charge;

                        // If user already purchase one or more that one item, then update the user details
                        if (user) {
                            const payments = user.payments;

                            payments.push({
                                charge_id,
                                amount,
                                balance_transaction,
                                payment_email,
                                created: date,
                                currency,
                                customer,
                                payment_method,
                                receipt_email,
                                receipt_url,
                                refund_url,
                                source_id,
                            });

                            console.log('date = ', date);

                            // Update into database
                            Payments.findOneAndUpdate(
                                { userEmail },
                                { payments },
                                null,
                                (error, docs) => {
                                    if (error) {
                                        error.statusCode = 501;
                                        next(error);
                                    }
                                    // res.status(200).json({message: 'Payment Successful'});
                                }
                            );
                        } else {
                            // Create new node for new user payment details
                            const newPayment = new Payments({
                                userName,
                                userEmail,
                                payments: [
                                    {
                                        charge_id,
                                        amount,
                                        balance_transaction,
                                        payment_email,
                                        created: date,
                                        currency,
                                        customer,
                                        payment_method,
                                        receipt_email,
                                        receipt_url,
                                        refund_url,
                                        source_id,
                                    },
                                ],
                            });

                            // Save into database
                            newPayment.save((error, result) => {
                                if (error) {
                                    error.statusCode = 501;
                                    next(error);
                                }
                                // Send response
                                // res.status(200).json({
                                //     message: 'Payment Successful',
                                //     result,
                                // });
                            });
                        }
                    });
                }
            );
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};
