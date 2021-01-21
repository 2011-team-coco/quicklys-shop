const {green, red} = require('chalk')
const {db, Candy} = require('./server/db')

const candies = [
  {
    name: 'Twix',
    price: 1,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Twix-Wrapper-Small.jpg/240px-Twix-Wrapper-Small.jpg',
    description: 'Twix Creamy Peanuty Buttery',
    quantity: 4,
  },
  {
    name: 'KitKat',
    price: 2,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/KitKat_logo.svg/1200px-KitKat_logo.svg.png',
    description: 'Kitkat Crispy Crunsh',
    quantity: 4,
  },
]

// const projects = [
//   {
//     title: 'Hunting Gold',
//     deadline: '2025-10-07',
//     priority: 10,
//     completed: false,
//     description: 'Find The Gold Mine',
//   },
//   {
//     title: 'Washing Cloth',
//     deadline: '2022-01-12',
//     priority: 5,
//     completed: true,
//     description: 'Washing all cloth both colored and white',
//   },
//   {
//     title: 'Dance Like A Butterfly Sting Like A Bee',
//     deadline: '2023-05-10',
//     priority: 9,
//     completed: false,
//     description: 'Winning The Heavy Weight Championship Of The World',
//   },
//   {
//     title: 'Spider robot',
//     deadline: '2025-07-15',
//     priority: 3,
//     completed: false,
//     description: 'vacum crumbs in tight angels and under furniture',
//   },
// ]

// const ProjectAndRobotRelations = [
//   {
//     projectId: 1,
//     robotId: 1,
//   },
//   {
//     projectId: 2,
//     robotId: 2,
//   },
//   {
//     projectId: 3,
//     robotId: 3,
//   },
//   {
//     projectId: 4,
//     robotId: 4,
//   },
// ]

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      candies.map((candy) => {
        return Candy.create(candy)
      })
    )

    // await Promise.all(
    //   projects.map((project) => {
    //     return Project.create(project)
    //   })
    // )

    // await Promise.all(
    //   ProjectAndRobotRelations.map(async (ProjectAndRobotRelation) => {
    //     const project = await Project.findByPk(
    //       ProjectAndRobotRelation.projectId
    //     )
    //     const robot = await Robot.findByPk(ProjectAndRobotRelation.robotId)
    //     await project.addRobot(robot)
    //     await robot.addProject(project)
    //   })
    // )
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
