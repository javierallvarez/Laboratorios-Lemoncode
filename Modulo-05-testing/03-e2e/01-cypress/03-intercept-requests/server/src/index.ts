import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { hotels, cities } from './mock-data';

let db = {
  hotels,
  cities,
};

const delay = async (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const app = new Hono();
app.use(logger());
app.use('/*', serveStatic({ root: './public' }));

app.use('/api/*', cors());

app.get('/api/hotels', async (context) => {
  return context.json(db.hotels);
});

app.get('/api/cities', (context) => {
  return context.json(db.cities);
});

app.get('/api/hotels/:id', (context) => {
  return context.json(db.hotels.find((c) => c.id === context.req.param('id')));
});

app.put('/api/hotels/:id', async (context) => {
  const id = context.req.param('id');
  const hotel = await context.req.json();
  db.hotels = db.hotels.map((h) => (h.id === id ? { ...h, ...hotel } : h));
  return context.body(null, 204);
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`API running on ${info.port}`);
});
