export default function loggerShow(message) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message);
  }
}
