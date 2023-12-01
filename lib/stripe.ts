import Stripe from 'stripe';

const currentENV = process.env.NODE_ENV;

export const stripe = new Stripe(currentENV === "development" ? process.env.STRIPE_API_TEST_KEY! : process.env.STRIPE_API_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true
})
