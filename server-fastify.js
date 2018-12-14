// Require the fastify framework and instantiate it
const fastify = require('fastify')({
    logger: true
  })
  
  // Require external modules
  const mongoose = require('mongoose')
  
  // Import Routes
  fastify.register(require('./app/routes/user.route'));

  fastify.use('/users', require('./app/routes/user.route'));
  
  // Import Swagger Options
  const swagger = require('./config/swagger')
  
  // Register Swagger
  fastify.register(require('fastify-swagger'), swagger.options)
  
  // Connect to DB
  mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))
  
  
  // Run the server!
  const start = async () => {
    try {
      await fastify.listen(3000)
      fastify.swagger()
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()