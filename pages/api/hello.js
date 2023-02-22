
// req is an instance of http.IncomingMessage, plus pre-built middlewares
// res is an inctance of hhtp.ServerResponse, plus some helper functions

export default function handler(req, res) {
    res.status(200).json({ text: 'Hello' });
  }