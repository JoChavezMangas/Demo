import _mock from '../_mock';
import { randomNumberRange, randomInArray } from '../utils';

// ----------------------------------------------------------------------

export const _userAbout = {
  id: _mock.id(1),
  cover: _mock.image.cover(1),
  role: 'UI Designer',
  follower: randomNumberRange(999, 99999),
  following: randomNumberRange(999, 99999),
  quote:
    'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  country: _mock.address.country(1),
  email: _mock.email(1),
  company: _mock.company(1),
  school: _mock.company(2),
  socialLinks: {
    facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
    instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
    linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitterLink: `https://www.twitter.com/caitlyn.kerluke`,
  },
};

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  country: _mock.address.country(index),
  isFollowed: _mock.boolean(index),
}));

export const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
}));

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.text.title(index),
  postAt: _mock.time(index),
  imageUrl: _mock.image.cover(index),
}));

export const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  author: {
    id: _mock.id(8),
    avatarUrl: _mock.image.avatar(1),
    name: 'Caitlyn Kerluke',
  },
  isLiked: true,
  createdAt: _mock.time(index),
  media: _mock.image.cover(index),
  message: _mock.text.sentence(index),
  personLikes: [...Array(36)].map((__, personIndex) => ({
    name: _mock.name.fullName(personIndex),
    avatarUrl: _mock.image.avatar(personIndex + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatarUrl: _mock.image.avatar(randomInArray([2, 3, 4, 5, 6]) || 2),
        name: _mock.name.fullName(index + 5),
      },
      createdAt: _mock.time(2),
      message: 'Praesent venenatis metus at',
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatarUrl: _mock.image.avatar(randomInArray([7, 8, 9, 10, 11]) || 7),
        name: _mock.name.fullName(index + 6),
      },
      createdAt: _mock.time(3),
      message:
        'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.',
    },
  ],
}));

export const _userCards = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  cover: _mock.image.cover(index),
  name: _mock.name.fullName(index),
  follower: randomNumberRange(999, 99999),
  following: randomNumberRange(999, 99999),
  totalPosts: randomNumberRange(999, 99999),
  role: _mock.role(index),
}));

export const _userPayment = [...Array(2)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['master_card', 'visa', 'master_card'][index],
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  phone: _mock.phoneNumber(index),
  country: _mock.address.country(index),
  state: 'New Hampshire',
  city: 'East Sambury',
  street: '41256 Kamille Turnpike',
  zipCode: '85807',
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  phoneNumber: _mock.phoneNumber(index),
  address: '908 Jack Locks',
  country: _mock.address.country(index),
  state: 'Virginia',
  city: 'Rancho Cordova',
  zipCode: '85807',
  company: _mock.company(index),
  isVerified: _mock.boolean(index),
  status: randomInArray(['active', 'banned']),
  role: _mock.role(index),
}));


export const _companyList = [...Array(24)].map((_, index) => ({
    id: _mock.id(index),
    name: randomInArray(['Grupoapa SA. de CV.', 'SACH SA. de CV.', 'SCOTIABANK','BANAMEX SA. de CV.','SOC','RHHR','Integra Soluciones']),
    email: _mock.email(index),
    phoneNumber: _mock.phoneNumber(index),
}));

export const _dataList = [...Array(12)].map((_, index) => ({
    id: _mock.id(index),
    name: randomInArray(['Rogafin', 'SOC', 'Banamex','Integra','TOI','AFIRME','Ve Por Mas','RHHR','Sometra', 'Persona Fisica','Broker Moral temporal','Broker Fisico Completo']),      // _mock.name.fullName(index),
    email: _mock.email(index),
    status: randomInArray(['Activo', 'Inactivo', 'Bloqueado']),
    phone: _mock.phoneNumber(index),
    RFC: "CAMJ889955H89",
    phoneNumber: _mock.phoneNumber(index),
    zipCode: '09450',
    city: 'Coyoacan',
    state: 'CDMX',
    businessName : "SA. de CV."
}));

export const _employeeList = [...Array(12)].map((_, index) => ({
    id: _mock.id(index),
    name: randomInArray(['Josue Chavez',
                        'Silvia Ramirez',
                        'Oscar Cantero',
                        'Martin Badillo',
                        'Victor Estrada',
                        'Brenda Chavez',
                        'Roberto Araujo',
                        'Ericka Bonilla',
                        'Fernando Nicolas',
                        'Marcela Peralta',
                        'Rey Alejandro',
                        'Jessica Flores',
                        'Ricardo Martinez']),
    email: _mock.email(index),
    status: randomInArray(['Activo', 'Inactivo', 'Bloqueado','Proceso']),
    empresa: randomInArray(['Rogafin', 'SOC', 'Banamex', 'Integra', 'TOI', 'AFIRME', 'Ve Por Mas', 'RHHR', 'Sometra', 'Persona Fisica', 'Broker Moral temporal', 'Broker Fisico Completo']),
    Departamento: randomInArray(['QA', 'Infraestrucutra', 'Desarrollo', 'SAP','Soporte plataformas','Cobranza','Contabilidad']),
    Puesto: randomInArray(['Gerente Desarrollo', 'Gerente Infraestrucutra', 'Encargado de departamento SAP', 'Encargado de departamento QA', 'Encargado de departamento Soporte','Operador Desarrollador','Operador Infraesrtucutra']),
    phone: _mock.phoneNumber(index),
    areaName: randomInArray(['Sistemas', 'Cobranza', 'Contabilidad', 'Herramientas Digitales', 'Direccion']),
    dpto: randomInArray(['Desarrollo', 'Infraestructura', 'QA', 'SAP', 'Soporte Plataformas', '', '']),
}));

export const _areaList = [...Array(12)].map((_, index) => ({
    id: _mock.id(index),
    name: randomInArray(['Sistemas', 'Cobranza', 'Implementacion de herrmientas', 'Herramientas Digitales', 'Direccion']),
    empresa: randomInArray(['APA','INTEGRA','SOC']),
    DierctorName: randomInArray(['Oscar Cantero','Eduardo Zamudio','Dierctor 1','Directora 2']),
    email: _mock.email(index),
    status: randomInArray(['Activo', 'Inactivo', 'Bloqueado'])
}));

export const _puestoList = [...Array(12)].map((_, index) => ({
    id: _mock.id(index),
    name: randomInArray(['Programador', 'Project Manager', 'Coordinador de soporte plataformas', 'Gerente de desarrollo', 'Quality asurance']),
    areaName: randomInArray(['Sistemas', 'Cobranza', 'Implementacion de herrmientas', 'Herramientas Digitales', 'Direccion']),
    empresa: randomInArray(['APA', 'INTEGRA', 'SOC']),
    dpto: randomInArray(['Desarrollo', 'Infraestructura', 'QA','SAP','Soporte Plataformas','','']),
    DierctorName: randomInArray(['Oscar Cantero', 'Eduardo Zamudio', 'Dierctor 1', 'Directora 2']),
    email: _mock.email(index),
    status: randomInArray(['Activo', 'Inactivo', 'Bloqueado'])
}));

export const _bancoList = [...Array(8)].map((_, index) => ({
    id: _mock.id(index),
    name: randomInArray(['Afirme','Banamex','HSBC','Santander','Banorte','City','Scotia bank','Banregio','Bangercito']),
    email: _mock.email(index),
    status: randomInArray(['Activo', 'Inactivo', 'Bloqueado']),
    someStatus : "status",
    contactPerson: randomInArray(['Oscar Cantero', 'Eduardo Zamudio', 'Dierctor 1', 'Directora 2']),
    phoneNumber: _mock.phoneNumber(index)
}));




