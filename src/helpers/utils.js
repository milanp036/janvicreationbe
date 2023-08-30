//  geneRateRandom4 digit number

const geneRateRandomNumber = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

module.exports = {
  geneRateRandomNumber,
};
