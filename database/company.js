const faker = require('faker');

faker.seed(3604035591);

const generateCompanyName = () => {
  const noun = [];
  const verb = [];
  const adjective = [];
  const nameCombos = [];

  const hackerNoun = faker.hacker.noun();
  const bsNoun = faker.company.bsNoun();
  const hackerVerb = faker.hacker.verb();
  const hackingVerb = faker.hacker.ingverb();
  const bsVerb = faker.company.bsBuzz();
  const hackerAdjective = faker.hacker.adjective();
  const companyAdjective = faker.company.catchPhraseAdjective();
  const commerceProductAdjective = faker.commerce.productAdjective();
  noun.push(hackerNoun);
  noun.push(bsNoun);
  verb.push(hackerVerb);
  verb.push(hackingVerb);
  verb.push(bsVerb);
  adjective.push(hackerAdjective);
  adjective.push(companyAdjective);
  adjective.push(commerceProductAdjective);

  const adjNoun = faker.random.arrayElement(adjective) + faker.random.arrayElement(noun);
  const nounNoun = faker.random.arrayElement(noun) + faker.random.arrayElement(noun);
  const verbNoun = faker.random.arrayElement(verb) + faker.random.arrayElement(noun);
  const verbAdjNoun = (faker.random.arrayElement(verb)
    + faker.random.arrayElement(adjective) + faker.random.arrayElement(noun));

  nameCombos.push(adjNoun);
  nameCombos.push(nounNoun);
  nameCombos.push(verbNoun);
  nameCombos.push(verbAdjNoun);

  const randomCompanyName = faker.random.arrayElement(nameCombos);
  return randomCompanyName;
};

module.export.generateCompanyName = generateCompanyName;
