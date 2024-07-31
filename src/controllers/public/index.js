export default {
  async hello(req, res) {
    var a = 2 + 2;
    return res.status(200).json({ hello: 'hello', result: a });
  },
  async bye(req, res) {
    var b = 1 + 1;
    return res.status(200).json({ bye: 'bye', result: b });
  },
};
