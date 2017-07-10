import Library from './library';
import component from './component';
// import '../app/common.css';
import style1 from './style1.css';
import style2 from './style2.css';

// import 'react';

document.body.appendChild(component('thx webpack', style1.class1, style2.class1));

//HMR interface
if(module.hot) {
  //捕获 hot update
  module.hot.accept('./library', () => {
    console.log('Accepting the updated library module!');
    Library.log();
  });
}