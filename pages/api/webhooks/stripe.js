import verifyStripe from '@webdeveducation/next-verify-stripe';
import Cors from 'micro-cors';
import stripeInit from 'stripe';
import clientPromise from '../../../lib/mongodb';

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

export const config = {
  api: { bodyParser: false },
};

const stripe = stripeInit(process.env.STRIP_SECRET_KEY);
const endpointSecret = process.env.STRIP_WEBHOOK_SECRET;

const handler = async (req, res) => {
  if (req.method === 'POST') {
    let event;
    try {
      const event = await verifyStripe({ req, stripe, endpointSecret });
    } catch (e) {
      console.log('Error with Strip webhook:', e);
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const client = await clientPromise;
        const db = client.db('BlogStandard');

        const paymentIntent = event.data.object;
        const authOId = paymentIntent.metadata.sub;

        const userProfile = await db.collection('users').updateOne(
          {
            authOId,
          },
          {
            $inc: {
              availableTokens: 10,
            },
            $setOnInsert: {
              authOId,
            },
          },
          {
            upsert: true,
          }
        );
      }
      default:
        console.log('UNHANDLED EVENT: ', event.type);
    }
    res.status(200).json({ received: true });
  }
};

export default cors(handler);
