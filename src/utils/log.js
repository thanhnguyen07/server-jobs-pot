const separation2 = () => {
  console.log('================================================');
};
const separation1 = () => {
  console.log('|-----------------------------------------------');
};

const path = ({method, url}) => {
  console.log(`| [${method}] ${url}`);
};

const text = data => {
  if (typeof data === 'object') {
    data.forEach(element => {
      console.log(`| [MSG] ${element}`);
    });
  }
  if (typeof data === 'string') {
    console.log(`| [MSG] ${data}`);
  }
};

const status = code => {
  if (code === 200) {
    console.log('| [STATUS] Successfully!');
  }
  if (code === 400) {
    console.log('| [STATUS] Failure!');
  }
};

const request = ({req, msg, code}) => {
  const numberOfFields = Object.keys(req.body).length;

  separation2();

  path({method: req.method, url: req.originalUrl});

  if (numberOfFields > 0) {
    separation1();
    params(req.body);
  }

  if (code) {
    separation1();
  }
  if (msg) {
    text(msg);
  }
  if (code) {
    status(code);
  }

  separation2();
};

const params = data => {
  if (typeof data === 'object') {
    const keysArray = Object.keys(data);
    const valuesArray = Object.values(data);
    keysArray?.forEach((_, i) => {
      console.log(`| ${keysArray[i]}: ${valuesArray[i]}`);
    });
  }
};

export {separation2, path, text, request, separation1, params};
