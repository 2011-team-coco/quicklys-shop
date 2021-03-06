'use strict'

const db = require('../server/db')
const {User, Candy, Order, OrderCandy} = require('../server/db/models')
const candyList = require('./candyList')

const candies = [
  {
    name: 'Twix',
    price: 1,
    imageUrl: 'twix.jpg',
    description:
      'Crunchy cookie, smooth caramel, and delicious milk chocolate!',
    quantity: 25,
  },
  {
    name: 'KitKat',
    price: 1,
    imageUrl: 'kitkat.jpg',
    description: 'Smooth milk chocolate and light, crispy wafers!',
    quantity: 25,
  },
  {
    name: 'Snickers',
    price: 1,
    imageUrl: 'snickers.jpg',
    description:
      'Crammed with peanuts, caramel and nougat then coated with milk chocolate!',
    quantity: 25,
  },
  {
    name: 'Milky Way',
    price: 1,
    imageUrl: 'milkyway.jpg',
    description: 'Creamy nougat and caramel covered with milk chocolate!',
    quantity: 25,
  },
  {
    name: 'Butterfinger',
    price: 1,
    imageUrl: 'butterfinger.jpg',
    description: 'Crispety, crunchety, peanut-buttery!',
    quantity: 25,
  },
  {
    name: 'Nestle Crunch Bar',
    price: 1,
    imageUrl: 'crunchbar.jpg',
    description: 'Crispy, crunchy, milk chocolate!',
    quantity: 25,
  },
  {
    name: "Hershey's Milk Chocolate Bar",
    price: 1,
    imageUrl: 'hersheybar.jpg',
    description: 'Rich and creamy milk chocolate!',
    quantity: 25,
  },
  {
    name: 'Almond Joy',
    price: 1,
    imageUrl: 'almondjoy.jpg',
    description: 'Whole almonds and sweet coconut covered in milk chocolate!',
    quantity: 25,
  },
  {
    name: 'Toblerone',
    price: 1,
    imageUrl: 'toblerone.png',
    description: 'Swiss chocolate with honey and almond nougat!',
    quantity: 25,
  },
  {
    name: "Resse's Peanut Butter Cups",
    price: 1,
    imageUrl: 'reeses.jpg',
    description: 'Rich milk chocolate and creamy peanut butter!',
    quantity: 25,
  },
  {
    name: '100 Grand Bar',
    price: 1,
    imageUrl: '100grand.jpg',
    description: 'Rich milk chocolate, creamy caramel, and crispy rice!',
    quantity: 25,
  },
  {
    name: 'Heath Bar',
    price: 1,
    imageUrl: 'heath.jpg',
    description:
      'English toffee covered in a thick layer of smooth milk chocolate!',
    quantity: 25,
  },
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: true}),

    User.create({email: 'murphy@email.com', password: '123'}),
  ])

  const dummyCandies = await Promise.all(
    candies.map((candy) => {
      return Candy.create(candy)
    })
  )

  const candySeed = await Promise.all(
    candyList.map((candyName) => {
      let candy = {
        name: candyName,
        price: (Math.random() * (5 - 0.25) + 0.25).toFixed(2),
        quantity: Math.floor(Math.random() * (1000 - 1) + 1),
        description: 'A tasty treat',
        ////possible bug
        imageUrl: 'candyDefault.jpg',
      }
      return Candy.create(candy)
    })
  )

  const dummyOrder = await Order.create({
    isCart: true,
  })
  await users[0].addOrder(dummyOrder)
  const orderCandy = await OrderCandy.create({
    quantity: 2,
    candyId: dummyCandies[0].id,
    orderId: dummyOrder.id,
  })

  const checkEagerLoading = await Order.findByPk(dummyOrder.id, {
    include: [
      {
        model: OrderCandy,
        include: [Candy],
      },
      {
        model: User,
      },
    ],
  })

  console.log(
    'CHECK EAGER LOADING',
    JSON.stringify(checkEagerLoading.dataValues)
  )

  console.log(`seeded ${dummyCandies.length} candies`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
