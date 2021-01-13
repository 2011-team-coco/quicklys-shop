'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const Candy = require('../server/db/models/candy')

const candies = [
  {
    name: 'Twix',
    price: 1,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Twix-Wrapper-Small.jpg/240px-Twix-Wrapper-Small.jpg',
    description: 'Twix Creamy Peanuty Buttery',
    quantity: 4
  },
  {
    name: 'KitKat',
    price: 2,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/KitKat_logo.svg/1200px-KitKat_logo.svg.png',
    description: 'Kitkat Crispy Crunsh',
    quantity: 4
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const dummyCandies = await Promise.all(
    candies.map(candy => {
      return Candy.create(candy)
    })
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
