import shortid from 'shortid'

export default generateRandomId = () => {
    return shortid.generate();
  };