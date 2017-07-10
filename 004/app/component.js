export default (text = 'hello world!te12xt~~') => {
  const element = document.createElement('div');
  element.innerHTML = text;
  return element;
};