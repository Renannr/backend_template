export async function hello(req, res) {
  var a = 2 + 2;
  return res.status(200).json({ hello: 'hello' });
}
